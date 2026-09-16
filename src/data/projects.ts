export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
};

export const projects: Project[] = [
  { id: "etms-buddy", title: "eTMS Buddy", description: "A real-time transport management system with Node.js and Express services, React interfaces, and performance-focused API and database workflows.", category: "Transport management", image: "linear-gradient(135deg, #00f5a0, #0f4c5c 55%, #22232a)", technologies: ["Node.js", "Express", "React", "SQL"], liveUrl: "#", githubUrl: "https://github.com/pratheekhn816-creator", featured: true },
  { id: "fraud-detection", title: "Transaction Fraud Detection", description: "An engineering project using Random Forest, SVM, and Logistic Regression to detect fraud in processed transaction datasets.", category: "Machine learning", image: "linear-gradient(135deg, #27b7cf, #182d61 55%, #25252c)", technologies: ["Python", "Machine Learning", "SVM"], liveUrl: "#", githubUrl: "https://github.com/pratheekhn816-creator", featured: false },
  { id: "android-news", title: "Android News App", description: "A mobile news application delivering real-time updates across topics of interest through an XML frontend and Java backend.", category: "Android application", image: "linear-gradient(135deg, #f3a65a, #743e74 55%, #25252c)", technologies: ["Java", "Android", "XML"], liveUrl: "#", githubUrl: "https://github.com/pratheekhn816-creator", featured: false },
  { id: "life-insurance", title: "Life Insurance Management", description: "A PHP and MySQL application for managing client details, policy records, and nominee information in a structured database.", category: "Business application", image: "linear-gradient(135deg, #d7ef75, #537044 55%, #25252c)", technologies: ["PHP", "MySQL", "HTML", "CSS"], liveUrl: "#", githubUrl: "https://github.com/pratheekhn816-creator", featured: false },
];
