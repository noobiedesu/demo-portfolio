
export interface Project {
  id: string;
  title: string;
  metric: string;
  summary: string;
  category: string;
  tags: string[];
  image: string;
}

export const projects: Project[] = [
  {
    id: "p1",
    title: "Website & SEO (MOS Training Center)",
    metric: "2.55M users/year",
    summary: "Led content strategy and growth initiatives focused on user journeys, content discoverability, and measurable engagement improvements.",
    category: "Marketing",
    tags: ["SEO", "Content Strategy", "User Experience"],
    image: "/src/assets/project1.png"
  },
  {
    id: "p2",
    title: "Site Optimization (eIET / FTU 2024)",
    metric: "+12.7% traffic",
    summary: "Implemented UX and content updates to improve discoverability and retention across mobile users.",
    category: "Optimization",
    tags: ["UX Design", "Mobile Optimization", "Analytics"],
    image: "/src/assets/project2.png"
  },
  {
    id: "p3",
    title: "CRM & Campaigns",
    metric: "CTR +14.5%",
    summary: "Designed segmentation and automated nurture flows to improve lead quality and email engagement.",
    category: "CRM",
    tags: ["Email Marketing", "Automation", "Segmentation"],
    image: "/src/assets/project3.png"
  }
];
