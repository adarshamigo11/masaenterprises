import {
  BarChart3,
  Code2,
  Users,
  GraduationCap,
  Scale,
  TrendingUp,
  Shield,
  Zap,
  LineChart,
  Settings,
  Briefcase,
  BookOpen,
  Bus,
  Globe,
  FileText,
  Gavel,
  Clock,
  DollarSign,
} from "lucide-react"

export interface ServiceData {
  slug: string
  title: string
  shortTitle: string
  description: string
  longDescription: string
  icon: React.ComponentType<{ className?: string }>
  features: { icon: React.ComponentType<{ className?: string }>; title: string; description: string }[]
  benefits: string[]
}

export const servicesData: ServiceData[] = [
  {
    slug: "software-development",
    title: "Custom Software Development",
    shortTitle: "Software Development",
    description: "We Don't Just Write Code. We Engineer Solutions. From idea to deployment, we build powerful, scalable, and secure software tailored to your exact business needs.",
    longDescription: "We design and develop bespoke software solutions that align perfectly with your business processes. Our team uses modern frameworks and agile methodologies to deliver scalable, maintainable applications. With expertise spanning MERN, MEAN, PHP/Salesforce, SQL/NoSQL databases, and cloud platforms (AWS/GCP), we architect systems that grow with your business while maintaining security and performance standards.",
    icon: Code2,
    features: [
      { icon: Globe, title: "Security-First Architecture", description: "SSL/TLS encryption, AES-256 for data at rest, RBAC, OWASP compliance, automated vulnerability scanning, and built-in 2FA." },
      { icon: Zap, title: "Performance & Scalability", description: "Auto-scaling on AWS/GCP, CDN via CloudFront, database optimization, Redis caching for sub-100ms API responses, load balancing." },
      { icon: Settings, title: "Seamless Integrations", description: "RESTful/GraphQL APIs, payment gateways (Razorpay/Stripe), Twilio/SendGrid, Salesforce/Zoho/Tally ERP, Google Maps API." },
      { icon: Shield, title: "Cloud Deployment & DevOps", description: "CI/CD pipelines (GitHub Actions/Jenkins), Docker/Kubernetes, automated backups, real-time monitoring, zero-downtime deployments." },
    ],
    benefits: [
      "Tailored solutions that fit your exact requirements",
      "Scalable architecture that grows with your business",
      "Modern tech stack ensuring long-term maintainability",
      "Post-launch support and maintenance with 3 months free bug fixes",
      "Agile development with bi-weekly sprints and demos",
      "Enterprise-grade security and compliance built-in",
    ],
  },
  {
    slug: "hrm-payroll",
    title: "HRM & Payroll Management",
    shortTitle: "HRM & Payroll",
    description: "Your Entire HR Department. One Smart Platform. From hiring to retiring — automate every aspect of human resource operations and payroll with zero errors and full statutory compliance.",
    longDescription: "Our comprehensive HRM and Payroll management system automates every aspect of human resource operations. From employee lifecycle management to one-click payroll processing, attendance tracking to statutory compliance — we handle it all. With features like biometric integration, employee self-service portal, automated PF/ESI/TDS calculations, and real-time HR analytics, you get a complete platform that reduces HR workload by 60% while ensuring 100% compliance. Whether you have 10 employees or 10,000, our platform scales seamlessly with your organization.",
    icon: Users,
    features: [
      { icon: Users, title: "Employee Lifecycle Management", description: "Complete digital onboarding to exit management with role-based access and org chart hierarchy." },
      { icon: Clock, title: "Attendance & Leave Automation", description: "Biometric + mobile app check-in, automatic overtime calculation, custom leave policies with approval workflows." },
      { icon: DollarSign, title: "One-Click Payroll Processing", description: "Auto-generate payslips, calculate PF/ESI/TDS, manage loans/advances, process bank transfers in minutes." },
      { icon: TrendingUp, title: "Live HR Analytics Dashboard", description: "Headcount tracking, attrition analysis, department-wise costs, attendance trends, custom report builder." },
    ],
    benefits: [
      "Process payroll 80% faster than manual methods with zero errors",
      "Reduce HR team workload by 60% with employee self-service portal",
      "100% statutory compliance guaranteed — PF, ESI, TDS auto-calculated",
      "Reduce attendance disputes by 90% with real-time biometric tracking",
      "Digital onboarding completed in under 30 minutes",
      "Make data-driven HR decisions in seconds with live workforce analytics",
    ],
  },
  {
    slug: "school-management",
    title: "School Management System",
    shortTitle: "School Management",
    description: "Run Your Entire School From One Dashboard. A complete ERP solution that digitizes academics, administration, and parent communication for modern educational institutions.",
    longDescription: "Our comprehensive School Management System is a complete ERP solution designed for educational institutions of all sizes. From academic management to fee collection, transport tracking to parent communication — we handle every aspect of school operations. With dedicated portals for students, parents, teachers, and administrators, our platform reduces administrative workload by 40% while improving parent satisfaction to 98%. Whether you have 300 students or 1000+, our scalable platform grows with your institution while maintaining ease of use and security.",
    icon: GraduationCap,
    features: [
      { icon: BookOpen, title: "Academic Management", description: "Curriculum planning, timetable builder, exam scheduling, mark entry, result generation, homework tracking." },
      { icon: Users, title: "Student & Parent Portal", description: "Daily attendance tracking, instant notifications, progress reports, teacher-parent messaging, mobile app." },
      { icon: DollarSign, title: "Fee Management", description: "Online fee collection (UPI/cards/net banking), auto reminders, discount management, instant receipts." },
      { icon: Bus, title: "Transport Management", description: "GPS-based live bus tracking, route management, driver records, transport fee collection." },
    ],
    benefits: [
      "100+ schools successfully onboarded and managed",
      "50,000+ students actively using the platform",
      "98% parent satisfaction rate with portal transparency",
      "40% reduction in administrative workload for staff",
      "Complete visibility over every school department",
      "Mobile apps for parents and teachers (Android + iOS)",
    ],
  },
  {
    slug: "law-firm",
    title: "Law Firm Management",
    shortTitle: "Law Firm",
    description: "Digital case management and workflow solutions tailored for legal professionals.",
    longDescription: "Our Law Firm Management system digitizes legal practice operations.",
    icon: Scale,
    features: [
      { icon: Gavel, title: "Case Management", description: "Track cases, hearings, deadlines." },
      { icon: FileText, title: "Document Management", description: "Secure document storage." },
      { icon: Users, title: "Client Portal", description: "Track case progress." },
      { icon: Clock, title: "Time & Billing", description: "Track billable hours." },
    ],
    benefits: [
      "Never miss court dates",
      "Secure document access",
      "Transparent client communication",
      "Automated invoicing",
    ],
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find((s) => s.slug === slug)
}
