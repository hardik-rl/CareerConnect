export type JobType = "Full-time" | "Contract" | "Part-time";

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: JobType;
  category: string;
  salary: string;
  experience: string;
  posted: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  companyDescription: string;
  companySize: string;
  founded: string;
}

export const JOBS: Job[] = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechForge",
    location: "Remote • India",
    type: "Full-time",
    category: "Engineering",
    salary: "₹18–28 LPA",
    experience: "4–7 years",
    posted: "2 days ago",
    description:
      "We are looking for a thoughtful frontend engineer who enjoys building fast, accessible and polished experiences. You will collaborate closely with product, design and backend teams to create tools that help teams do their best work.",
    responsibilities: [
      "Build reusable React interfaces with a strong focus on quality",
      "Improve application performance, accessibility and reliability",
      "Partner with designers to bring thoughtful experiences to life",
      "Review code and contribute to engineering standards",
    ],
    requirements: [
      "4+ years of experience building modern web applications",
      "Strong knowledge of React, TypeScript and browser fundamentals",
      "Experience collaborating with design and product teams",
      "Clear communication and a thoughtful approach to problem-solving",
    ],
    skills: ["React", "TypeScript", "JavaScript", "CSS", "REST APIs"],
    companyDescription:
      "TechForge builds reliable software that helps ambitious teams work smarter. Our distributed team is united by a love of solving meaningful problems.",
    companySize: "120–250 employees",
    founded: "Founded in 2018",
  },
  {
    id: 2,
    title: "UX Designer",
    company: "PixelCraft",
    location: "Ahmedabad • Hybrid",
    type: "Full-time",
    category: "Design",
    salary: "₹10–16 LPA",
    experience: "3–5 years",
    posted: "1 day ago",
    description:
      "PixelCraft is looking for a curious UX Designer to make complex workflows feel clear and effortless. You will work alongside product managers and engineers from early research through final delivery.",
    responsibilities: [
      "Plan and conduct user research to uncover customer needs",
      "Create journey maps, wireframes and interactive prototypes",
      "Turn product requirements into clear, accessible experiences",
      "Share design decisions and iterate with cross-functional teams",
    ],
    requirements: [
      "3+ years of experience designing digital products",
      "A strong portfolio showing your process and design thinking",
      "Fluency with Figma and prototyping workflows",
      "Experience working closely with product and engineering",
    ],
    skills: ["Figma", "User Research", "Prototyping", "Accessibility"],
    companyDescription:
      "PixelCraft is a product design studio partnering with teams to create more useful, human digital products.",
    companySize: "50–120 employees",
    founded: "Founded in 2019",
  },
  {
    id: 3,
    title: "Frontend Engineer",
    company: "CloudScale",
    location: "Pune • Hybrid",
    type: "Full-time",
    category: "Engineering",
    salary: "₹12–20 LPA",
    experience: "3–5 years",
    posted: "3 days ago",
    description:
      "Join CloudScale's frontend team and help make cloud infrastructure approachable. You will build dependable interfaces that give customers a clear view of their systems.",
    responsibilities: [
      "Develop and maintain customer-facing web applications",
      "Translate product designs into responsive, reusable components",
      "Work with API teams to deliver dependable product experiences",
      "Help the team improve testing and frontend practices",
    ],
    requirements: [
      "3+ years of professional frontend development experience",
      "Proficiency in JavaScript or TypeScript and a modern UI framework",
      "Understanding of responsive design and web accessibility",
      "Comfort working with APIs and version control",
    ],
    skills: ["React", "JavaScript", "TypeScript", "HTML", "CSS"],
    companyDescription:
      "CloudScale helps businesses build, ship and operate cloud services with confidence.",
    companySize: "250–500 employees",
    founded: "Founded in 2016",
  },
  {
    id: 4,
    title: "Product Manager",
    company: "Northstar",
    location: "Remote • India",
    type: "Full-time",
    category: "Product",
    salary: "₹20–32 LPA",
    experience: "5–8 years",
    posted: "5 days ago",
    description:
      "Northstar is searching for a Product Manager to guide a product area from discovery to delivery. You will bring customer insight, business context and a clear product direction to a collaborative team.",
    responsibilities: [
      "Set a clear product vision and prioritize the roadmap",
      "Use customer research and data to guide product decisions",
      "Align design, engineering and business stakeholders",
      "Define success measures and learn from product outcomes",
    ],
    requirements: [
      "5+ years of experience in product management",
      "A track record of shipping customer-focused digital products",
      "Strong analytical, communication and prioritization skills",
      "Experience working with agile product teams",
    ],
    skills: ["Product Strategy", "Roadmapping", "Analytics", "Research"],
    companyDescription:
      "Northstar creates practical tools that help growing businesses find clarity and move forward.",
    companySize: "120–250 employees",
    founded: "Founded in 2017",
  },
  {
    id: 5,
    title: "UI Developer",
    company: "KiteWorks",
    location: "Mumbai • Hybrid",
    type: "Contract",
    category: "Engineering",
    salary: "₹8–14 LPA",
    experience: "2–4 years",
    posted: "1 week ago",
    description:
      "KiteWorks is looking for a UI Developer to help deliver a polished and consistent web experience. You'll work with designers and engineers to turn high-fidelity concepts into production-ready interfaces.",
    responsibilities: [
      "Build responsive interfaces from design specifications",
      "Maintain reusable components and shared UI patterns",
      "Test layouts across browsers and screen sizes",
      "Collaborate with designers to refine implementation details",
    ],
    requirements: [
      "2+ years of experience developing web interfaces",
      "Strong HTML, CSS and JavaScript fundamentals",
      "Care for visual detail, accessibility and responsive behavior",
      "Experience working from Figma designs",
    ],
    skills: ["HTML", "CSS", "JavaScript", "Figma", "Responsive UI"],
    companyDescription:
      "KiteWorks partners with growing companies to design and build considered digital products.",
    companySize: "50–120 employees",
    founded: "Founded in 2020",
  },
  {
    id: 6,
    title: "Software Engineer",
    company: "Vertex",
    location: "Remote • India",
    type: "Full-time",
    category: "Engineering",
    salary: "₹14–24 LPA",
    experience: "3–6 years",
    posted: "4 days ago",
    description:
      "Vertex is building the next generation of tools for distributed teams. As a Software Engineer, you'll solve meaningful technical challenges and help ship dependable products used every day.",
    responsibilities: [
      "Design, build and maintain reliable product features",
      "Write clear, tested code and participate in thoughtful reviews",
      "Work across the stack with product and design partners",
      "Help improve the performance and maintainability of our platform",
    ],
    requirements: [
      "3+ years of professional software engineering experience",
      "Strong programming fundamentals and a quality mindset",
      "Experience building and supporting production applications",
      "Comfort collaborating across a distributed team",
    ],
    skills: ["Software Development", "APIs", "Testing", "Cloud"],
    companyDescription:
      "Vertex makes collaborative software for teams working across locations and time zones.",
    companySize: "250–500 employees",
    founded: "Founded in 2015",
  },
];
