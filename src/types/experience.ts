export interface ExperienceType {
  title: { pt: string; en: string; es: string };
  company: { pt: string; en: string; es: string };
  startDate: string;
  endDate?: string | null;
  isCurrent?: boolean;
  description: { pt: string; en: string; es: string };
  technologies: string[];
}
