"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Frame =
  | { kind: "bitmap"; img: ImageBitmap }
  | { kind: "element"; img: HTMLImageElement; url: string };

async function decodeBlob(blob: Blob): Promise<Frame> {
  try {
    const img = await createImageBitmap(blob);
    return { kind: "bitmap", img };
  } catch {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.decoding = "async";
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("img decode failed"));
      img.src = url;
    });
    return { kind: "element", img, url };
  }
}

function releaseFrame(f: Frame) {
  if (f.kind === "bitmap") {
    try {
      f.img.close();
    } catch {
      // Safe ignore
    }
  } else {
    try {
      URL.revokeObjectURL(f.url);
    } catch {
      // Safe ignore
    }
  }
}

export function useFrameSequence(folderName: string = "porsche") {
  const blobs = useRef<(Blob | null)[]>([]);
  const frames = useRef<Map<number, Frame>>(new Map());
  const decoding = useRef<Set<number>>(new Set());
  const countRef = useRef(300);
  const patternRef = useRef(`frames/${folderName}/frame_%03d.jpg`);
  const lastProgress = useRef(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    const totalFrames = 300;
    countRef.current = totalFrames;
    blobs.current = new Array(totalFrames).fill(null);

    const getUrl = (i: number) => {
      const idx = String(i + 1).padStart(3, "0");
      return `/frames/${folderName}/frame_${idx}.jpg`;
    };

    // Load first frame immediately for instant first paint
    (async () => {
      try {
        const firstBlob = await fetch(getUrl(0)).then((r) => r.blob());
        if (!alive) return;
        blobs.current[0] = firstBlob;
        const f = await decodeBlob(firstBlob);
        if (!alive) return releaseFrame(f);
        frames.current.set(0, f);
        setReady(true);
      } catch (err) {
        console.warn("First frame fast-decode:", err);
      }

      // Load initial batch (first 30 frames) for instant scrub response
      const initialBatch = Array.from({ length: Math.min(40, totalFrames) }, async (_, i) => {
        if (i === 0) return;
        try {
          const b = await fetch(getUrl(i)).then((r) => r.blob());
          if (alive) {
            blobs.current[i] = b;
            setLoadedCount((prev) => prev + 1);
          }
        } catch {
          // Retry on demand
        }
      });
      await Promise.all(initialBatch);

      // Stream the remaining frames in chunks
      const chunkSize = 25;
      for (let c = 40; c < totalFrames; c += chunkSize) {
        if (!alive) break;
        const chunk = Array.from({ length: Math.min(chunkSize, totalFrames - c) }, async (_, offset) => {
          const i = c + offset;
          try {
            const b = await fetch(getUrl(i)).then((r) => r.blob());
            if (alive) {
              blobs.current[i] = b;
              setLoadedCount((prev) => prev + 1);
            }
          } catch {
            // Refetched on demand
          }
        });
        await Promise.all(chunk);
      }
    })();

    return () => {
      alive = false;
      frames.current.forEach(releaseFrame);
      frames.current.clear();
    };
  }, [folderName]);

  const decode = useCallback((i: number) => {
    if (frames.current.has(i) || decoding.current.has(i)) return;
    if (!blobs.current[i]) {
      // Lazy fetch if not loaded yet
      const idx = String(i + 1).padStart(3, "0");
      const url = `/frames/${folderName}/frame_${idx}.jpg`;
      fetch(url)
        .then((r) => r.blob())
        .then((b) => {
          blobs.current[i] = b;
          decoding.current.add(i);
          return decodeBlob(b);
        })
        .then((f) => {
          frames.current.set(i, f);
        })
        .catch(() => {})
        .finally(() => {
          decoding.current.delete(i);
        });
      return;
    }

    decoding.current.add(i);
    decodeBlob(blobs.current[i]!)
      .then((f) => frames.current.set(i, f))
      .catch(() => {})
      .finally(() => decoding.current.delete(i));
  }, [folderName]);

  const manageWindow = useCallback((center: number) => {
    const AHEAD = 24;
    const KEEP = 64;
    for (let d = 0; d <= AHEAD; d++) {
      const a = center + d;
      const b = center - d;
      if (a < countRef.current) decode(a);
      if (b >= 0) decode(b);
    }
    if (frames.current.size > KEEP * 2) {
      for (const [idx, f] of frames.current) {
        if (Math.abs(idx - center) > KEEP) {
          releaseFrame(f);
          frames.current.delete(idx);
        }
      }
    }
  }, [decode]);

  const nearestDecoded = useCallback((i: number): Frame | null => {
    if (frames.current.has(i)) return frames.current.get(i)!;
    for (let d = 1; d < countRef.current; d++) {
      if (frames.current.has(i - d)) return frames.current.get(i - d)!;
      if (frames.current.has(i + d)) return frames.current.get(i + d)!;
    }
    return null;
  }, []);

  const draw = useCallback((canvas: HTMLCanvasElement | null, progress: number) => {
    if (!canvas || countRef.current === 0) return;
    lastProgress.current = progress;
    const clamped = Math.min(1, Math.max(0, progress));
    const i = Math.round(clamped * (countRef.current - 1));

    manageWindow(i);
    const frame = nearestDecoded(i);
    if (!frame) return;

    const src = frame.img;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = Math.round(canvas.clientWidth * dpr);
    const ch = Math.round(canvas.clientHeight * dpr);

    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, cw, ch);

    // Calculate aspect fill or contain
    const srcW = src.width;
    const srcH = src.height;
    const scale = Math.max(cw / srcW, ch / srcH);
    const w = srcW * scale;
    const h = srcH * scale;
    const x = (cw - w) / 2;
    const y = (ch - h) / 2;

    ctx.drawImage(src, x, y, w, h);
  }, [manageWindow, nearestDecoded]);

  return {
    ready,
    draw,
    loadedCount,
    totalCount: countRef.current,
    lastProgress,
  };
}
