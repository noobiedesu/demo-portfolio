
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
    title: "Marketing Analytics Dashboard",
    description: "React-based dashboard for visualizing campaign performance metrics across channels.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    category: "Development",
    tags: ["React", "D3.js", "API Integration"]
  },
  {
    id: 2,
    title: "E-commerce Conversion Strategy",
    description: "Complete funnel optimization that increased checkout conversions by 35%.",
    image: "https://images.unsplash.com/photo-1661956602139-ec64991b8b16",
    category: "Marketing",
    tags: ["CRO", "UX Design", "A/B Testing"]
  },
  {
    id: 3,
    title: "Email Automation System",
    description: "Custom Node.js email workflow builder with campaign analytics and segmentation.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Development",
    tags: ["Node.js", "Express", "SendGrid"]
  },
  {
    id: 4,
    title: "Content Strategy for SaaS",
    description: "Content plan that drove 250% increase in organic traffic over 6 months.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8",
    category: "Marketing",
    tags: ["SEO", "Content Strategy", "Lead Generation"]
  },
  {
    id: 5,
    title: "Customer Journey Mapping Tool",
    description: "Interactive tool for mapping user journeys and identifying optimization opportunities.",
    image: "https://images.unsplash.com/photo-1551645120-d70bfe84c826",
    category: "Development",
    tags: ["React", "Firebase", "UX Research"]
  },
  {
    id: 6,
    title: "Integrated Campaign for Product Launch",
    description: "Cross-channel marketing campaign for a new tech product with 150% ROI.",
    image: "https://images.unsplash.com/photo-1493421419110-74f4e85ba126",
    category: "Marketing",
    tags: ["Campaign Strategy", "Digital Ads", "Social Media"]
  }
];
