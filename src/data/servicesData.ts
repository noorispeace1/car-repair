export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  image: string;
  badgeNumber: string;
  fullDescription: string;
  features: string[];
  turnaround: string;
  warranty: string;
  category: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "01",
    slug: "maintenance",
    badgeNumber: "01",
    title: "Maintenance",
    shortDesc: "Factory-scheduled inspections, fluid flushes, and safety tuning.",
    image: "/service_maintenance.jpg",
    category: "Scheduled & Preventive",
    fullDescription:
      "Our comprehensive vehicle maintenance program preserves peak performance, safety, and longevity. Using computerized diagnostics and OEM-approved service protocols, our ASE-certified master technicians inspect and tune all vital vehicle systems to factory specifications.",
    features: [
      "Factory-scheduled 180-point vehicle inspection",
      "Full synthetic engine oil flush & OEM filter replacement",
      "Transmission fluid and differential hydraulic check",
      "Cabin air & engine intake filtration renewal",
      "Brake caliper inspection & pad friction wear measurement",
      "Battery diagnostic, alternator charging & ground test"
    ],
    turnaround: "Same Day (2 - 4 Hours)",
    warranty: "12-Month / 12,000-Mile Guarantee"
  },
  {
    id: "02",
    slug: "care-services",
    badgeNumber: "02",
    title: "Care Services",
    shortDesc: "Advanced electronic diagnostics, HVAC recharge, and wellness care.",
    image: "/service_care.jpg",
    category: "Diagnostic & Restoration Care",
    fullDescription:
      "Specialized vehicle wellness and preventative care designed to detect and resolve microscopic wear before it turns into costly failure. From precision electronic engine tuning to climate control sterilization, we care for your vehicle with surgical precision.",
    features: [
      "Precision computerized OBD-II engine scan & tuning",
      "HVAC system antimicrobial clean & R1234yf freon recharge",
      "Radiator coolant flush, pressure testing & thermostat check",
      "Suspension ball joint & tie-rod dynamic load testing",
      "Exhaust emission system and catalytic converter validation",
      "Underbody inspection & anti-corrosion sealant coating"
    ],
    turnaround: "1 - 2 Business Days",
    warranty: "Lifetime Craftsmanship Guarantee"
  },
  {
    id: "03",
    slug: "spare-parts",
    badgeNumber: "03",
    title: "Spare Parts",
    shortDesc: "Direct OEM replacement components with manufacturer certification.",
    image: "/service_spare_parts.jpg",
    category: "Genuine OEM Replacement",
    fullDescription:
      "Direct OEM and certified high-performance spare parts installation. We source authentic manufacturer components to guarantee exact fitment, zero compromise on safety, and complete retention of your factory warranty.",
    features: [
      "100% Genuine OEM & factory-authorized replacement parts",
      "Brembo & ceramic performance brake rotor & pad assembly",
      "OEM calibrated suspension struts, coilovers & control arms",
      "Precision electronic sensors (Radar, ADAS, O2, Wheel Speed)",
      "Heavy-duty alternators, high-torque starters & ignition coils",
      "Full manufacturer warranty with certificate of authenticity"
    ],
    turnaround: "Same Day / 24-48 Hours",
    warranty: "Manufacturer Lifetime Parts Warranty"
  },
  {
    id: "04",
    slug: "collision-repair",
    badgeNumber: "04",
    title: "Collision Restoration",
    shortDesc: "Structural rebuild to factory crashworthiness and fitment.",
    image: "/service_collision.jpg",
    category: "Chassis & Structural Rebuild",
    fullDescription:
      "Dealership-grade structural reconstruction following minor or major collision impacts. Using OEM manufacturer repair procedures, we replace damaged panels, rebuild unibody crash structures, and restore original factory stiffness.",
    features: [
      "Celette frame bench structural measurement & pull",
      "Boron & high-strength aluminum bonding & riveting",
      "OEM sheet metal replacement & seam-sealed welds",
      "Sub-millimeter laser panel gap realignment",
      "Complete crumple zone integrity verification",
      "Insurance claim direct billing and coordination"
    ],
    turnaround: "3 - 7 Business Days",
    warranty: "Guaranteed Lifetime Transferable Warranty"
  },
  {
    id: "05",
    slug: "laser-frame-alignment",
    badgeNumber: "05",
    title: "Laser Frame Alignment",
    shortDesc: "Computerized chassis calibration down to 0.00° precision.",
    image: "/service_frame_alignment.jpg",
    category: "Geometric Chassis Calibration",
    fullDescription:
      "Computerized laser unibody and chassis alignment guaranteeing 0.00° deviation from original engineering blueprints. Re-establishes high-speed directional stability, proper tire contact patches, and crumple zone safety.",
    features: [
      "Computerized 32-point laser target chassis scanning",
      "Real-time digital unibody geometry diagram validation",
      "Independent multi-link suspension camber/caster zeroing",
      "Centerline and wheelbase diagonal cross-measurement",
      "High-speed steering torque and drift elimination",
      "Before & After printout of laser geometry specs"
    ],
    turnaround: "1 - 2 Business Days",
    warranty: "Lifetime Alignment Guarantee"
  },
  {
    id: "06",
    slug: "paint-refinishing",
    badgeNumber: "06",
    title: "Paint & Refinishing",
    shortDesc: "Glasurit factory-match waterborne color and clear coat.",
    image: "/service_paint.jpg",
    category: "Factory Down-Draft Refinishing",
    fullDescription:
      "State-of-the-art downdraft cleanroom booth refinishing using Glasurit 90-Line waterborne paints. Multi-stage prep, computerized spectrophotometer color matching, and infrared baking ensure a mirror showroom gloss.",
    features: [
      "Computerized spectrophotometer color formula matching",
      "Downdraft spray booth with HEPA micro-filtration",
      "Glasurit 90-Line eco-friendly waterborne chemistry",
      "Infrared ceramic curing oven for Rockwell-tested hardness",
      "Zero orange-peel wet sanding and multi-stage polishing",
      "Lifetime paint clearcoat peel and fade protection"
    ],
    turnaround: "2 - 4 Business Days",
    warranty: "Lifetime Paint & Clearcoat Warranty"
  }
];

export const WHATSAPP_PHONE_NUMBER = "14257505164";

export function getWhatsAppBookingUrl(serviceTitle?: string) {
  const text = serviceTitle
    ? `Hello Auto Body Repair! I would like to book an appointment for "${serviceTitle}". Please let me know your available slots.`
    : "Hello Auto Body Repair! I would like to book an appointment for my vehicle.";
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
}
