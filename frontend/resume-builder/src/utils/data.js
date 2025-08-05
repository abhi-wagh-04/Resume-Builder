import TEMPLATE_ONE_IMG from "../assets/template-1.png";
import TEMPLATE_TWO_IMG from "../assets/template-2.png";
import TEMPLATE_THREE_IMG from "../assets/template-3.png";
import TEMPLATE_FOUR_IMG from "../assets/template-4.png";
import TEMPLATE_FIVE_IMG from "../assets/template-5.png";
import TEMPLATE_SIX_IMG from "../assets/template-6.png";

export const resumeTemplates = [
  {
    id: "01",
    thumbnailImg: TEMPLATE_ONE_IMG,
    colorPaletteCode: "themeOne",
  },
  {
    id: "02",
    thumbnailImg: TEMPLATE_TWO_IMG,
    colorPaletteCode: "themeTwo",
  },
  {
    id: "03",
    thumbnailImg: TEMPLATE_THREE_IMG,
    colorPaletteCode: "themeThree",
  },
  {
    id: "04",
    thumbnailImg: TEMPLATE_FOUR_IMG,
    colorPaletteCode: "themeFour",
  },
  {
    id: "05",
    thumbnailImg: TEMPLATE_FIVE_IMG,
    colorPaletteCode: "themeFive",
  },
  {
    id: "06",
    thumbnailImg: TEMPLATE_SIX_IMG,
    colorPaletteCode: "themeFive",
  },
];

export const themeColorPalette = {
  themeOne: [
    ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"],

    ["#E9FBF8", "#B4EFE7", "#93E2DA", "#2AC9A0", "#3D4C5A"],
    ["#F5F4FF", "#E0DBFF", "#C9C2F8", "#8579D1", "#4B4B5C"],
    ["#F0FAFF", "#D6F0FF", "#AFDEFF", "#3399FF", "#445361"],
    ["#FFF5F7", "#FFE0EC", "#FAC6D4", "#F6729C", "#5A5A5A"],
    ["#F9FAFB", "#E4E7EB", "#CBD5E0", "#7F9CF5", "#2D3748"],

    ["#F4FFFD", "#D3FDF2", "#B0E9D4", "#34C79D", "#384C48"],
    ["#FFF7F0", "#FFE6D9", "#FFD1BA", "#FF9561", "#4C4743"],
    ["#F9FCFF", "#E3F0F9", "#C0DDEE", "#6CA6CF", "#46545E"],
    ["#FFFDF6", "#FFF4D7", "#FFE7A0", "#FFD000", "#57534E"],
    ["#EFFCFF", "#C8F0FF", "#99E0FF", "#007BA7", "#2B3A42"],

    ["#F7F7F7", "#E4E4E4", "#CFCFCF", "#4A4A4A", "#222222"],
    ["#E3F2FD", "#90CAF9", "#a8d2f4", "#1E88E5", "#0D47A1"],
  ],
};

export const DUMMY_RESUME_DATA = {
  profileInfo: {
    profileImg: null,
    fullName: "Aarav Mehta",
    profilePreviewUrl: "",
    designation: "Senior Data Analyst",
    summary:
      "Detail-oriented Data Analyst with 4+ years of experience in analyzing complex datasets, building interactive dashboards, and driving data-backed decisions. Skilled in Python, SQL, and data visualization tools.",
  },
  contactInfo: {
    email: "aarav.mehta@example.com",
    phone: "+91 9123456789",
    location: "Mumbai, India",
    linkedin: "https://linkedin.com/in/aaravmehta",
    github: "https://github.com/aaravmehta",
    website: "https://aaravmehta.dev",
  },
  title: "Senior Data Analyst Resume",
  workExperience: [
    {
      company: "Flipkart",
      startDate: "2022-03",
      endDate: "2024-06",
      description:
        "Led a team of analysts to build predictive models for customer retention and revenue growth. Developed interactive Tableau dashboards that reduced reporting time by 30%.",
    },
    {
      company: "Infosys",
      startDate: "2020-01",
      endDate: "2022-02",
      description:
        "Worked as a Data Analyst in the retail domain. Designed ETL pipelines and performed exploratory data analysis for client insights.",
    },
    {
      company: "TechNova",
      startDate: "2018-07",
      endDate: "2019-12",
      description:
        "Entry-level analyst role focusing on cleaning, transforming, and visualizing marketing campaign data using Power BI and Excel.",
    },
  ],
  skills: [
    { name: "SQL", progress: 95 },
    { name: "Python", progress: 90 },
    { name: "Power BI", progress: 85 },
    { name: "Tableau", progress: 80 },
    { name: "Excel", progress: 85 },
    { name: "Machine Learning", progress: 75 },
    { name: "Data Cleaning", progress: 90 },
  ],
  projects: [
    {
      title: "E-commerce Sales Dashboard",
      description:
        "Built a dynamic dashboard for Flipkart's sales team using Tableau to monitor KPIs and trends across different regions.",
      github: "https://github.com/aaravmehta/flipkart-sales-dashboard",
      liveDemo: "https://sales-dashboard-demo.vercel.app",
    },
    {
      title: "Customer Churn Prediction Model",
      description:
        "Implemented a machine learning pipeline using logistic regression and random forest to predict customer churn.",
      github: "https://github.com/aaravmehta/customer-churn-prediction",
      liveDemo: "",
    },
  ],
  certifications: [
    {
      title: "Microsoft Certified: Data Analyst Associate",
      issuer: "Microsoft",
      year: "2023",
    },
    {
      title: "Google Data Analytics Professional Certificate",
      issuer: "Google",
      year: "2022",
    },
  ],
  languages: [
    { name: "English", progress: 95 },
    { name: "Hindi", progress: 90 },
    { name: "Gujarati", progress: 85 },
  ],
  interests: ["Chess", "Blogging", "Photography"],
  educaton: [
    {
      degree: "M.Tech in Data Science and Artificial Intelligence",
      startDate: "2022-08",
      endDate: "2024-06",
    },
    {
      degree: "B.Tech in Computer Engineering",
      startDate: "2016-07",
      endDate: "2020-06",
    },
  ],
};
