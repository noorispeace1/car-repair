export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoBodyShop",
  "name": "Auto Body Repair Inc.",
  "image": "https://autobodyrepairinc.com/images/hero-porsche.jpg",
  "@id": "https://autobodyrepairinc.com",
  "url": "https://autobodyrepairinc.com",
  "telephone": "+1-425-750-5164",
  "priceRange": "$$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12902 Hwy 99 Ste 7",
    "addressLocality": "Everett",
    "addressRegion": "WA",
    "postalCode": "98204",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.9015,
    "longitude": -122.2536
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:30",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:30",
      "closes": "15:00"
    }
  ],
  "areaServed": [
    { "@type": "City", "name": "Everett" },
    { "@type": "City", "name": "Lynnwood" },
    { "@type": "City", "name": "Mukilteo" },
    { "@type": "City", "name": "Edmonds" },
    { "@type": "City", "name": "Mill Creek" },
    { "@type": "City", "name": "Snohomish County" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Precision Auto Body & Collision Repair Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Computerized Laser Frame Realignment",
          "description": "OEM millimeter-exact structural straightening utilizing Celette bench and computerized laser measurement."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Exotic & Luxury Collision Restoration",
          "description": "Manufacturer-certified repairs for Porsche, Ferrari, McLaren, BMW, Audi, and Mercedes-Benz vehicles."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Glasurit / PPG Waterborne Refinishing & Ceramic Coating",
          "description": "Climate-controlled downdraft spray booths with spectral color match guarantee and 9H ceramic paint protection."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "ADAS Sensor & Radar Calibration",
          "description": "Complete post-repair recalibration of lane assist, emergency braking radars, and 360 LiDAR sensors."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "03-Day Rapid Sprint Collision Service",
          "description": "Expedited repair turnaround for urgent structural and aesthetic restorations with lifetime transferable warranty."
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.98",
    "reviewCount": "342"
  }
};
