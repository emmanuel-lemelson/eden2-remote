export const PRODUCTION_URL = "https://lemelsonestate.com";
const CANONICAL_HOME = `${PRODUCTION_URL}/`;

/**
 * Returns the VacationRental + LodgingBusiness JSON-LD structured data for
 * Eden: The Lemelson Estate, scoped to the homepage and /stays/ page.
 */
export function getVacationRentalSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["VacationRental", "LodgingBusiness"],
    "@id": `${PRODUCTION_URL}/#vacation-rental`,
    name: "Eden: The Lemelson Estate",
    identifier: "eden-the-lemelson-estate-stowe-vt",
    url: CANONICAL_HOME,
    image: [
      `${PRODUCTION_URL}/gallery/enhanced/2@1200w.webp`,
      `${PRODUCTION_URL}/gallery/Eden-Site%20Photos/98@1200w.webp`,
      `${PRODUCTION_URL}/gallery/Eden-Site%20Photos/113@1200w.webp`,
      `${PRODUCTION_URL}/gallery/enhanced/90@1200w.webp`,
    ],
    description:
      "11,400 sq ft, 8-bedroom, 8-bathroom pet-friendly luxury vacation rental estate on 28 private acres in the Edson Hill Road area of Stowe, Vermont, 5 minutes from Stowe Mountain Resort, sleeping up to 20 guests.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Stowe",
      addressRegion: "VT",
      postalCode: "05672",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 44.4926,
      longitude: -72.7126,
    },
    petsAllowed: true,
    numberOfRooms: 8,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: 20,
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: 11400,
      unitCode: "FTK",
    },
    containsPlace: {
      "@type": "Accommodation",
      additionalType: "EntirePlace",
      occupancy: {
        "@type": "QuantitativeValue",
        value: 20,
      },
      numberOfBedrooms: 8,
      numberOfBathroomsTotal: 8,
      floorSize: {
        "@type": "QuantitativeValue",
        value: 11400,
        unitCode: "FTK",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      worstRating: "1",
      reviewCount: 62,
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Kayli" },
        datePublished: "2026-02-01",
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
        },
        reviewBody:
          "We had our elopement at Eden this weekend with 14 of our closest family members and our two dogs. From the moment we drove up the driveway to check in we were in awe of how beautiful the property was. Everything was absolutely perfect! The house is just amazing inside and out!",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Scott" },
        datePublished: "2025-08-01",
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
        },
        reviewBody:
          "We had a wonderful experience staying at Eden for a family gathering. Our hosts were very responsive through all aspects of the booking process, preparations for our stay and during our stay. The estate is beautiful and has everything you could need. The kids had plenty to entertain themselves, including the pool, hot tub, tennis and game room.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Joshua" },
        datePublished: "2025-07-01",
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
        },
        reviewBody:
          "Absolutely loved this place, worth every single penny. Secluded, beautiful, fun, and spacious. The service was the best I’ve EVER experienced, nonstop communication, and instant responses. Staying here I truly felt like a guest.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Caitlin" },
        datePublished: "2025-07-01",
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
        },
        reviewBody:
          "My family and I had a wonderful stay here. The photos do not do this home justice! They had many great amenities and offered a great space to enjoy time with loved ones.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Margot M." },
        datePublished: "2025-02-01",
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
        },
        reviewBody:
          "We were fortunate enough to stay at this magnificent estate for a long weekend. The house is impeccably clean and well cared for. The great room is beautiful and a lovely spot to relax after skiing. The sauna, hot tub and game room are outstanding.",
      },
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Heated outdoor swimming pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Two large outdoor hot tubs", value: true },
      { "@type": "LocationFeatureSpecification", name: "Indoor spa", value: true },
      { "@type": "LocationFeatureSpecification", name: "Private cedar sauna", value: true },
      { "@type": "LocationFeatureSpecification", name: "Steam shower", value: true },
      { "@type": "LocationFeatureSpecification", name: "Clay tennis court", value: true },
      { "@type": "LocationFeatureSpecification", name: "Private fitness center and gym", value: true },
      { "@type": "LocationFeatureSpecification", name: "Game room and pool table", value: true },
      { "@type": "LocationFeatureSpecification", name: "Dedicated children's playroom and baby gear", value: true },
      { "@type": "LocationFeatureSpecification", name: "Chef's kitchen with Sub-Zero and Thermador appliances", value: true },
      { "@type": "LocationFeatureSpecification", name: "Grand piano and Sonos audio", value: true },
      { "@type": "LocationFeatureSpecification", name: "High-speed fiber-optic Wi-Fi and executive office", value: true },
      { "@type": "LocationFeatureSpecification", name: "Wood-burning fireplaces", value: true },
      { "@type": "LocationFeatureSpecification", name: "Twin spring-fed trout ponds", value: true },
      { "@type": "LocationFeatureSpecification", name: "Pet-friendly accommodations", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free on-site parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Concierge and private chef services", value: true },
    ],
    sameAs: [
      "https://www.airbnb.com/rooms/42793723",
      "https://www.vrbo.com/1958794",
      "https://www.expedia.com/Stowe-Hotels-Private-Luxury-Estate.h51018966.Hotel-Information",
    ],
    mainEntityOfPage: CANONICAL_HOME,
  };
}

/**
 * Returns the EventVenue JSON-LD structured data for Eden: The Lemelson Estate,
 * scoped to the /weddings/ and /retreats/ pages.
 */
export function getEventVenueSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    "@id": `${PRODUCTION_URL}/#event-venue`,
    name: "Eden: The Lemelson Estate — Stowe Wedding & Retreat Venue",
    url: `${PRODUCTION_URL}/weddings/`,
    image: [
      `${PRODUCTION_URL}/gallery/enhanced/2@1200w.webp`,
      `${PRODUCTION_URL}/gallery/Eden-Site%20Photos/98@1200w.webp`,
    ],
    description:
      "Stowe's luxury private mansion and manor estate wedding and executive retreat venue on 28 private acres in Vermont, featuring an 11,400 sq ft residence with on-site lodging for 20 overnight guests and tented meadow receptions up to 300 guests.",
    maximumAttendeeCapacity: 300,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Stowe",
      addressRegion: "VT",
      postalCode: "05672",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 44.4926,
      longitude: -72.7126,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      worstRating: "1",
      reviewCount: 62,
    },
    sameAs: [
      "https://www.theknot.com/marketplace/edenthe-lemelson-estate-stowe-vt-2087322",
      "https://www.zola.com/wedding-vendors/wedding-venues/eden-the-lemelson-estate",
      "https://www.weddingwire.com/biz/eden-the-lemelson-estate/393d590ddd940149.html",
    ],
  };
}
