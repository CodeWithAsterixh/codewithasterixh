export interface ProjectSchema {
  name: string;
  p_id: string;
  startDate: string;
  finishDate: string;
  technologies: string[];
  currentVersion: string;
  status: string;
  overview: {
    description: string;
    keyFeatures: string[];
  };
  updates: {
    id: number;
    date: string;
    version: string;
    updateFeatures: string[];
  }[];
  futureGoals: string[];
  thumbnail: string[];
  url: string;
  source: string;
  id: number;
}

export const projectsData = [
  {
    name: "Anikii",
    p_id: "anikii",
    startDate: "2024-10-01",
    finishDate: "Ongoing development with future features",
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "GraphQL",
      "Prisma",
      "JWT",
      "PWA",
    ],
    currentVersion: "1.0",
    status: "Ongoing development with upcoming features planned.",
    overview: {
      description:
        "Anikii is a streaming platform tailored for anime lovers, offering a wide variety of anime content. The platform aims to enhance the viewing experience by providing easy access to anime episodes with minimal ads, smooth streaming, and a user-friendly interface. Anikii ensures that users can easily organize their watch time, making it a go-to platform for anime enthusiasts.",
      keyFeatures: [
        "Minimal Ads: Focus on providing a smooth and uninterrupted viewing experience with fewer ads.",
        "Anime Library: A vast library of anime shows and movies available for streaming.",
        "User Profile: Personalized watch history and recommendations based on user preferences.",
        "PWA Support: Offers a Progressive Web App experience for seamless mobile and desktop access.",
        "Watch Time Management: Track and organize your anime watch history easily.",
      ],
    },
    updates: [
      {
        id: 1,
        date: "2024-10-01",
        version: "1.0",
        updateFeatures: [
          "Initial launch of Anikii with basic streaming functionality.",
          "Set up user profiles with watch history tracking.",
          "Integrated streaming with anime providers (GogoAnime and AniList).",
          "Basic search functionality for anime titles.",
        ],
      },
      {
        id: 2,
        date: "2024-10-10",
        version: "1.1",
        updateFeatures: [
          "Enhanced UI for smoother user experience.",
          "Added custom watch lists and recommendations.",
          "Improved video streaming quality.",
          "Bug fixes and performance improvements.",
        ],
      },
      {
        id: 3,
        date: "2024-10-15",
        version: "1.2",
        updateFeatures: [
          "Integrated support for anime episode tracking.",
          "Improved search functionality for better accuracy.",
          "Optimized mobile app performance.",
          "Minor design and UI adjustments.",
        ],
      },
    ],
    futureGoals: [
      "Add user-generated content features like ratings and reviews.",
      "Implement shareable links for anime episodes.",
      "Expand the anime database with more providers.",
      "Enhance the recommendation engine with machine learning.",
    ],
    thumbnail: [
      "/api/images/anikii/anikiiHome.jpg",
      "/api/images/anikii/anikiiSearch.jpg",
    ],
    url: "https://anikii.vercel.app/",
    source: "https://github.com/p34-pac/anikii",
    id: 1,
  },
  {
    name: "GeraldLaw",
    p_id: "geraldlaw",
    startDate: "2024-05-01",
    finishDate: "Ongoing development with future features",
    technologies: ["React ts", "Tailwind CSS", "Material ui"],
    currentVersion: "1.0",
    status: "Ongoing development with upcoming features planned.",
    overview: {
      description:
        "GeraldLaw is a platform designed for individuals and businesses seeking legal services. The platform connects clients with lawyers in various legal fields and offers resources for consultations, legal advice, and case management. By partnering with Movicx, the platform offers an intuitive, user-friendly interface that allows easy access to legal experts and services, empowering clients with knowledge and support throughout their legal journey.",
      keyFeatures: [
        "Lawyer Profiles: Search and view detailed lawyer profiles with areas of expertise.",
        "Consultation Booking: Easy scheduling of consultations with top-rated lawyers.",
        "Legal Resources: Access to informative articles and legal advice.",
        "Case Management: Tools for clients and lawyers to track and manage ongoing cases.",
        "PWA Support: Progressive Web App for seamless mobile and desktop access.",
        "Client Dashboard: Personalized dashboard to manage appointments, case updates, and legal documents.",
      ],
    },
    updates: [
      {
        id: 1,
        date: "2024-05-01",
        version: "1.0",
        updateFeatures: [
          "Initial launch of GeraldLaw with lawyer search and consultation booking.",
          "Integrated case management tools for clients and lawyers.",
          "First version of the lawyer profile system.",
          "Basic legal resource section for clients.",
        ],
      },
      {
        id: 2,
        date: "2024-06-10",
        version: "1.1",
        updateFeatures: [
          "Improved UI/UX for a more intuitive user experience.",
          "Added ability to schedule consultations directly from lawyer profiles.",
          "Expanded legal resource section with FAQs and how-to guides.",
          "Fixed bugs and optimized mobile performance.",
        ],
      },
      {
        id: 3,
        date: "2024-07-15",
        version: "1.2",
        updateFeatures: [
          "Added client document management tools for storing legal paperwork.",
          "Enhanced case tracking for clients and lawyers.",
          "Optimized search and filtering for lawyer profiles by location and expertise.",
          "Minor bug fixes and stability improvements.",
        ],
      },
    ],
    futureGoals: [
      "Implement live chat for real-time consultation support.",
      "Add a rating and review system for lawyers.",
      "Integrate additional legal fields like criminal and immigration law.",
      "Expand the database of legal resources and articles for clients.",
      "Improve AI-powered legal assistance for basic queries and document generation.",
    ],
    thumbnail: [
      "/api/images/gerald/geraldHome.jpg",
      "/api/images/gerald/geraldExpert.jpg",
      "/api/images/gerald/geraldContact.jpg",
      "/api/images/gerald/geraldAbout.jpg",
    ],
    url: "https://moritz-one.vercel.app/",
    source: "https://github.com/CodeCraftersX/GeraldMoritz",
    id: 1,
  },
];
