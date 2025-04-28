
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Eco-Friendly Brand Launch",
    description: "Complete rebranding and market positioning for a sustainable product line.",
    image: "https://images.unsplash.com/photo-1548611635-b6e7827d7d28?ixlib=rb-4.0.3",
    category: "Branding",
    tags: ["Branding", "Strategy", "Digital"]
  },
  {
    id: 2,
    title: "Tech Startup Campaign",
    description: "Lead generation campaign that increased conversion rates by 45%.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    category: "Digital Marketing",
    tags: ["SEM", "Content", "Analytics"]
  },
  {
    id: 3,
    title: "Luxury Retail Social Strategy",
    description: "Social media strategy that boosted engagement by 78% across platforms.",
    image: "https://images.unsplash.com/photo-1493421419110-74f4e85ba126",
    category: "Social Media",
    tags: ["Social", "Influencer", "Content"]
  },
  {
    id: 4,
    title: "B2B SaaS Product Launch",
    description: "Comprehensive marketing strategy for enterprise software launch.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Product Marketing",
    tags: ["B2B", "Email", "Content"]
  },
  {
    id: 5,
    title: "Hospitality Brand Refresh",
    description: "Complete visual identity update and messaging strategy for hotel chain.",
    image: "https://images.unsplash.com/photo-1551645120-d70bfe84c826",
    category: "Branding",
    tags: ["Branding", "Design", "Strategy"]
  },
  {
    id: 6,
    title: "E-commerce Conversion Campaign",
    description: "Data-driven optimization that improved sales by 32% in 60 days.",
    image: "https://images.unsplash.com/photo-1661956602139-ec64991b8b16",
    category: "Digital Marketing",
    tags: ["E-commerce", "CRO", "Analytics"]
  }
];
