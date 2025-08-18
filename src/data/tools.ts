export interface Tool {
  name: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export const tools: Tool[] = [
  { name: "Google Analytics", src: "/assets/tools/ga.svg", alt: "Google Analytics" },
  { name: "Google Search Console", src: "/assets/tools/gsc.svg", alt: "Google Search Console" },
  { name: "Ahrefs", src: "/assets/tools/ahrefs.svg", alt: "Ahrefs" },
  { name: "SEMrush", src: "/assets/tools/semrush.svg", alt: "SEMrush" },
  { name: "WordPress", src: "/assets/tools/wordpress.svg", alt: "WordPress" },
  { name: "Zoho CRM", src: "/assets/tools/zoho.svg", alt: "Zoho CRM" },
  { name: "Getfly", src: "/assets/tools/getfly.svg", alt: "Getfly CRM" },
  { name: "Google Ads", src: "/assets/tools/google-ads.svg", alt: "Google Ads" },
];