export interface Tool {
  name: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export const tools: Tool[] = [
  { name: "Google Analytics", src: "/assets/tools/google-analytics.svg", alt: "Google Analytics" },
  { name: "Google Search Console", src: "/assets/tools/search-console.png", alt: "Google Search Console" },
  { name: "Screaming Frog", src: "/assets/tools/screaming-frog.svg", alt: "Screaming Frog" },
  { name: "Ahrefs", src: "/assets/tools/ahrefs.svg", alt: "Ahrefs" },
  { name: "WordPress", src: "/assets/tools/wordpress.svg", alt: "WordPress" },
  { name: "Looker Studio", src: "/assets/tools/looker-studio.svg", alt: "Looker Studio" },
  { name: "Zoho CRM", src: "/assets/tools/zoho-crm.svg", alt: "Zoho CRM" },
  { name: "Getfly", src: "/assets/tools/getfly.svg", alt: "Getfly CRM" },
  { name: "Google Ads", src: "/assets/tools/google-ads.svg", alt: "Google Ads" },
  { name: "Photoshop", src: "/assets/tools/photoshop.svg", alt: "Adobe Photoshop" },
  { name: "Ladipage", src: "/assets/tools/ladipage.svg", alt: "Ladipage" },
  { name: "AI Tools", src: "/assets/tools/ai-tools.svg", alt: "AI Tools" },
];