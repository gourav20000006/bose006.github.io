export interface Project {
  id: string;
  title: string;
  description: string;
  tag: string;
  tools: string[];
  metrics: string;
  highlights: string[];
  mockupType:
    | 'ecommerce'
    | 'cleaning'
    | 'merging'
    | 'flipkart'
    | 'excel'
    | 'database'
    | 'fashion_pivot'
    | 'hr_attendance';
  software: 'excel' | 'sheets';
  sheetName: string;
  image: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  delivery: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Certificate {
  id: string;
  title: string;
  certificateType: string;
  issuer: string;
  partner?: string;
  recipient: string;
  issueDate: string;
  credentialId: string;
  signatory?: string;
  signatoryTitle?: string;
  note: string;
  skillsAcquired: string[];
  type: 'simplilearn-microsoft' | 'flipkart-scoa';
  badgeColor: string;
  verified: boolean;
}

export interface Qualification {
  id: string;
  degree: string;
  institution: string;
  status: string;
  focusAreas: string;
  period: string;
}

