
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
    title: "SEO Growth Engine",
    description: "Organic traffic boost +250% for B2B SaaS client through technical SEO and content strategy.",
    image: "/src/assets/project1.png",
    category: "Marketing",
    tags: ["SEO", "Technical Audit", "Content Strategy"]
  },
  {
    id: 2,
    title: "E-commerce CRO System",
    description: "Conversion rate optimization boosting checkout completions by 45% using A/B testing.",
    image: "/src/assets/project2.png",
    category: "Marketing",
    tags: ["CRO", "A/B Testing", "Analytics"]
  },
  {
    id: 3,
    title: "Email Automation Suite",
    description: "Drip campaign system achieving 70% open rate and 25% click-through rate.",
    image: "/src/assets/project3.png",
    category: "Development",
    tags: ["Email Marketing", "Automation", "Analytics"]
  }
];
