"use client";

import { useEffect, useRef } from "react";

export default function HolographicScanner() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.play().catch(() => { });
    }, []);

    return (
        <section id="scanner" className="relative w-full h-screen bg-slate-950 overflow-hidden">
            <video
                ref={videoRef}
                src="/holographic_scanner_inspection.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
            />
        </section>
    );
}