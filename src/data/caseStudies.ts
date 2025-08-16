export interface CaseStudy {
  id: string;
  title: string;
  period: string;
  problem: string;
  actions: string[];
  results: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "cs-seo-mos",
    title: "SEO & Site Growth – MOS Training Center",
    period: "2020–2024",
    problem: "Low discoverability and poor site performance limited growth.",
    actions: [
      "Biannual SEO audits (Ahrefs/SEMrush)",
      "Keyword mapping and on-page optimization",
      "Enhanced page speed, image compression, hosting/domain governance"
    ],
    results: [
      "Achieved 2.55M annual users",
      "Sustained Google Maps Top 1–3 ranking for 4 years"
    ]
  },
  {
    id: "cs-ux-eiet",
    title: "Website Optimization – iEIT",
    period: "2024",
    problem: "Outdated sitemap and heavy images hurt navigation and load times.",
    actions: [
      "Rewrote and reorganized web content for clarity",
      "Updated sitemap and improved navigation labels",
      "Optimized images and fixed technical blockers"
    ],
    results: [
      "+12.7% traffic growth",
      "Smoother user journeys"
    ]
  },
  {
    id: "cs-crm-email",
    title: "CRM & Email Automation – Lead Nurturing",
    period: "2024",
    problem: "Low-quality leads and weak engagement across funnels.",
    actions: [
      "Segmented cold vs. warm leads in Zoho/Getfly",
      "Automated nurture/promo workflows tailored by segment",
      "Aligned ad targeting and messaging with sales-qualified profiles"
    ],
    results: [
      "Email OR: 29–34% (cold), 50.5–70.4% (warm)",
      "CTR: 6–18%",
      "Ads CTR +14.5%, 30% fewer erroneous leads"
    ]
  }
];