export interface Tradition {
  id: string
  name: string
  month: number
  season: 'fall' | 'winter' | 'spring' | 'summer'
  description: string
  longDescription: string
  heroImage: string
  galleryImages: string[]
  activities: string[]
  preparation?: string[]
  whatToBring?: string[]
}

export const traditions: Tradition[] = [
  {
    id: "pumpkin-patch",
    name: "Pumpkin Patch Visit",
    month: 10,
    season: "fall",
    description: "Annual visit to local pumpkin patch for harvest celebration",
    longDescription: "Each October, we venture to a local pumpkin patch where children can explore, choose pumpkins, and connect with the harvest season. This tradition celebrates the abundance of autumn and gives children hands-on experience with seasonal rhythms.",
    heroImage: "/images/traditions/pumpkin-patch/hero.jpg",
    galleryImages: [
      "/images/traditions/pumpkin-patch/picking.jpg",
      "/images/traditions/pumpkin-patch/group.jpg",
      "/images/traditions/pumpkin-patch/wagon-ride.jpg"
    ],
    activities: ["Pumpkin picking", "Hay rides", "Seasonal songs"],
    whatToBring: ["Weather-appropriate clothing", "Camera for memories"]
  },
  {
    id: "lantern-walk",
    name: "Lantern Walk",
    month: 11,
    season: "fall",
    description: "Evening walk with handmade lanterns bringing light to darkness",
    longDescription: "As the days grow shorter, we gather for our beloved Lantern Walk. Children carry beautiful handmade lanterns through the neighborhood, singing traditional songs and celebrating the light we carry within ourselves during the darker months.",
    heroImage: "/images/traditions/lantern-walk/hero.jpg",
    galleryImages: [
      "/images/traditions/lantern-walk/making-lanterns.jpg",
      "/images/traditions/lantern-walk/procession.jpg",
      "/images/traditions/lantern-walk/circle.jpg"
    ],
    activities: ["Lantern making", "Evening procession", "Community songs"],
    preparation: ["Craft lanterns in class", "Practice lantern songs"],
    whatToBring: ["Warm clothes", "Comfortable walking shoes"]
  },
  {
    id: "winter-spiral",
    name: "Winter Spiral",
    month: 12,
    season: "winter",
    description: "Contemplative ceremony welcoming the return of light",
    longDescription: "The Winter Spiral is a quiet, reverent celebration marking the winter solstice. Children walk a spiral path of evergreen boughs, lighting a candle at the center and carrying their light back out into the world, symbolizing hope and renewal.",
    heroImage: "/images/traditions/winter-spiral/hero.jpg",
    galleryImages: [
      "/images/traditions/winter-spiral/spiral-setup.jpg",
      "/images/traditions/winter-spiral/candle-lighting.jpg",
      "/images/traditions/winter-spiral/reflection.jpg"
    ],
    activities: ["Spiral walk", "Candle lighting", "Quiet reflection"],
    preparation: ["Create peaceful atmosphere", "Practice walking meditation"]
  },
  {
    id: "kite-day",
    name: "Kite Day",
    month: 4,
    season: "spring",
    description: "Celebrating spring winds with colorful kites at the park",
    longDescription: "When spring winds return, we head to the park with homemade and store-bought kites. Children experience the joy of flight, wind patterns, and the freedom that comes with warmer weather and longer days.",
    heroImage: "/images/traditions/kite-day/hero.jpg",
    galleryImages: [
      "/images/traditions/kite-day/flying.jpg",
      "/images/traditions/kite-day/making-kites.jpg",
      "/images/traditions/kite-day/windy-fun.jpg"
    ],
    activities: ["Kite flying", "Wind observation", "Outdoor games"],
    preparation: ["Make simple kites", "Check weather conditions"],
    whatToBring: ["Kites", "Picnic lunch", "Layers for changing weather"]
  },
  {
    id: "may-pole",
    name: "May Pole Dance",
    month: 5,
    season: "spring",
    description: "Traditional May Day celebration with ribbon dancing",
    longDescription: "Our May Pole celebration welcomes the full bloom of spring with traditional ribbon dancing, flower crowns, and community joy. Children weave colorful ribbons around the pole while singing, creating beautiful patterns and celebrating renewal.",
    heroImage: "/images/traditions/may-pole/hero.jpg",
    galleryImages: [
      "/images/traditions/may-pole/ribbon-weaving.jpg",
      "/images/traditions/may-pole/flower-crowns.jpg",
      "/images/traditions/may-pole/community-dance.jpg"
    ],
    activities: ["Ribbon dancing", "Flower crown making", "Spring songs"],
    preparation: ["Practice May Pole dance", "Gather flowers and ribbons"],
    whatToBring: ["Comfortable dancing clothes", "Flowers for crowns"]
  }
]
