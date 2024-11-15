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
      "/images/anikii/anikiiHome.jpg",
      "/images/anikii/anikiiSearch.jpg",
    ],
    url: "https://anikii.vercel.app/",
    source: "https://github.com/p34-pac/anikii",
    id: 0,
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
      "/images/gerald/geraldHome.jpg",
      "/images/gerald/geraldExpert.jpg",
      "/images/gerald/geraldContact.jpg",
      "/images/gerald/geraldAbout.jpg",
    ],
    url: "https://moritz-one.vercel.app/",
    source: "https://github.com/CodeCraftersX/GeraldMoritz",
    id: 1,
  },
  {
    name: "GitFinder",
    p_id: "gitfinder",
    startDate: "2022-12-26",
    finishDate: "Completed",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    currentVersion: "1.0",
    status: "Complete",
    overview: {
      description:
        "GitFinder is a platform designed to search for GitHub profiles, providing detailed information about a user’s public repositories, followers, and other key profile data. The platform includes multiple UI styles for a customizable experience.",
      keyFeatures: [
        "Profile Search: Quickly search for GitHub users by username.",
        "Profile Overview: Displays profile picture, public repositories, gists, followers, and following count.",
        "Company and Website: Shows company and blog/website information if available.",
        "Location and Membership Info: Provides the location and membership start date of the user.",
        "Latest Repositories: Lists the user's five most recent repositories.",
        "UI Style Options: Choose between sketchy, morphy, and cyborg UI styles.",
      ],
    },
    updates: [
      {
        id: 1,
        date: "2022-12-26",
        version: "1.0",
        updateFeatures: [
          "Initial release with search functionality.",
          "Basic user profile details displayed.",
          "Integrated three UI styles: sketchy, morphy, and cyborg.",
          "Styled with Bootstrap for responsive design.",
        ],
      },
    ],
    futureGoals: [],
    thumbnail: ["/images/gitfinder/gitfinderMain.jpg"],
    url: "https://www.codewithasterixh.github.io/gitfinder.com",
    source: "https://github.com/codewithasterixh/gitfinder.com",
    id: 2,
  },
  {
    name: "Photog",
    p_id: "photog",
    startDate: "2022-10-29",
    finishDate: "Completed",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    currentVersion: "1.0",
    status: "Complete",
    overview: {
      description:
        "Photog is a portfolio platform designed for photographers to showcase their work, services, and contact information. It provides an elegant and responsive display for a photographer's portfolio, highlighting their style and approach.",
      keyFeatures: [
        "Portfolio Gallery: Showcases a collection of the photographer’s works.",
        "Services Overview: Details on the types of photography services offered.",
        "Contact Page: Provides options to get in touch with the photographer.",
        "About Section: Introduces the photographer, their background, and style.",
        "Responsive Design: Optimized for various devices using Bootstrap.",
      ],
    },
    updates: [
      {
        id: 1,
        date: "2022-10-29",
        version: "1.0",
        updateFeatures: [
          "Initial release with portfolio and contact sections.",
          "Integrated Bootstrap for responsive design.",
          "Included services overview and about section.",
        ],
      },
    ],
    futureGoals: [],
    thumbnail: ["/images/photog/photogMain.jpg"],
    url: "https://codewithasterixh.github.io/photog",
    source: "https://github.com/codewithasterixh/photog",
    id: 3,
  },
  {
    name: "Weather App",
    p_id: "weatherapp",
    startDate: "2024-04-24",
    finishDate: "Completed",
    technologies: ["React", "HTML", "CSS", "JavaScript"],
    currentVersion: "1.0",
    status: "Complete",
    overview: {
      description:
        "The Weather App provides real-time weather data for a specified location, featuring temperature, humidity, and wind direction. Users can personalize the interface with a choice of 10 color themes.",
      keyFeatures: [
        "Real-Time Weather: Displays current temperature in Celsius, humidity, and wind direction for the chosen location.",
        "Color Theme Customization: Users can select from 10 different color themes for a personalized interface.",
        "Responsive Design: Ensures a seamless experience across devices.",
      ],
    },
    updates: [
      {
        id: 1,
        date: "2024-04-24",
        version: "1.0",
        updateFeatures: [
          "Initial release with core weather display functionalities.",
          "Added 10 color theme options for UI customization.",
          "Responsive layout implemented with CSS and JavaScript.",
        ],
      },
    ],
    futureGoals: [],
    thumbnail: ["/images/weather/weatherMain.jpg"],
    url: "https://weather-nine-lime.vercel.app/",
    source: "https://github.com/codewithasterixh/weather-app",
    id: 4,
  },
  {
    name: "E-commerce Home",
    p_id: "ecommercehome",
    startDate: "2023-10-16",
    finishDate: "Completed",
    technologies: ["React"],
    currentVersion: "1.0",
    status: "Complete",
    overview: {
      description:
        "E-commerce Home is a mock homepage of Amazon, designed to replicate the layout and appearance of a typical e-commerce platform’s homepage. It includes essential homepage elements for product showcase and navigation.",
      keyFeatures: [
        "Homepage Design: Mimics Amazon’s homepage layout and design.",
        "Product Showcase: Displays products with images and brief descriptions.",
        "Navigation Links: Includes mock links to various product categories.",
        "Responsive Design: Optimized for different screen sizes.",
      ],
    },
    updates: [
      {
        id: 1,
        date: "2023-10-16",
        version: "1.0",
        updateFeatures: [
          "Initial release with mock homepage layout.",
          "Implemented basic product display and navigation links.",
          "Responsive design using React and CSS.",
        ],
      },
    ],
    futureGoals: [],
    thumbnail: ["/images/ecommerce/ecommerceHome.jpg"],
    url: "https://codewithasterixh.github.io/E-commerce-Home",
    source: "https://github.com/codewithasterixh/ecommerce-home",
    id: 5,
  },
  {
    name: "FileNest",
    p_id: "filenest",
    startDate: "2024-08-19",
    finishDate: "Future maintenance",
    technologies: [
      "React",
      "Redux",
      "IndexedDB",
      "CryptoJS",
      "Phosphor Icons",
      "Toastify",
    ],
    currentVersion: "2.2",
    status: "Ongoing development with future updates planned.",
    overview: {
      description:
        "FileNest is a web application designed for secure file storage, retrieval, and management directly in the browser. Leveraging technologies like IndexedDB for local storage and CryptoJS for encryption, FileNest provides a robust solution for handling sensitive files. The application ensures files are encrypted before storage, and only the correct password can decrypt them, adding an additional layer of security. It also offers features like file preview, renaming, and downloading, ensuring that users can manage their files seamlessly.",
      keyFeatures: [
        "Secure Encryption: Files are encrypted with user-provided passwords before storage, ensuring that only authorized users can access the data.",
        "File Upload & Preview: Users can upload files, and the application generates previews for supported file types (images, videos, etc.).",
        "File Management: Users can rename files, delete them, and manage their collection with ease.",
        "File Download: Files stored within FileNest can be downloaded and decrypted on the user's device.",
        "Robust Error Handling: The app gracefully handles errors related to encryption, decryption, and file operations, ensuring a smooth user experience.",
      ],
    },
    updates: [
      {
        id: 1,
        date: "2024-08-19",
        version: "1.0",
        updateFeatures: [
          "Implemented basic file upload functionality.",
          "Integrated encryption for file storage.",
          "Basic UI development.",
          "Initial encryption setup but lacked file reading capability.",
        ],
      },
      {
        id: 2,
        date: "2024-08-20",
        version: "2.0",
        updateFeatures: [
          "Fixed file reading issues.",
          "Improved encryption handling.",
          "Enabled users to download and decrypt files.",
          "Enhanced error handling for better user feedback.",
        ],
      },
      {
        id: 3,
        date: "2024-08-21",
        version: "2.2",
        updateFeatures: [
          "Refined file renaming process.",
          "Added additional validations for secure file operations.",
          "UI improvements and bug fixes for a smoother user experience.",
        ],
      },
    ],
    futureGoals: [
      "Continue improving file management capabilities.",
      "Implement shareable links for files.",
      "Expand support for various file types and enhance encryption algorithms.",
    ],
    thumbnail: [],
    url: "https://filenest.vercel.app/",
    source: "https://github.com/p34-pac/FileNest",
    id: 6,
  },
  {
    name: "Seek",
    p_id: "seek",
    startDate: "2024-08-03",
    finishDate: "Future maintenance",
    technologies: ["React", "Context API", "TMDB API"],
    currentVersion: "2.1",
    status: "Ongoing development with future updates planned.",
    overview: {
      description:
        "Seek is a movie discovery web application that leverages the TMDB API to provide users with a seamless experience for searching movies, TV shows, and people. Users can watch trailers, add content to their collection, and create profiles. The application uses React with Context API for state management, ensuring a responsive and dynamic user interface. Future updates will address bugs in the collection feature and complete the user profile functionalities.",
      keyFeatures: [
        "Search Functionality: Users can search for movies, TV shows, and people using the TMDB API.",
        "Watch Trailers: The application allows users to watch trailers for their favorite movies and shows.",
        "User Collections: Users can add movies and shows to their personal collection, although a bug fix is planned for future updates.",
        "Profile Management: Users can create profiles, though further updates are required to complete this feature.",
        "Dynamic UI: The application provides a responsive and user-friendly interface using React and Context API.",
      ],
    },
    updates: [
      {
        id: 1,
        date: "2024-08-03",
        version: "1.0",
        updateFeatures: [
          "Completed initial application creation.",
          "Implemented search feature for movies, TV shows, and people.",
          "Added watch trailer feature.",
        ],
      },
      {
        id: 2,
        date: "2024-08-04",
        version: "2.0",
        updateFeatures: ["Implemented user profile creation and saving."],
      },
      {
        id: 3,
        date: "2024-08-05",
        version: "2.1",
        updateFeatures: ["Added user collection feature."],
      },
    ],
    futureGoals: [
      "Fix bugs in the user collection feature.",
      "Complete user profile functionalities and information management.",
      "Enhance search capabilities with more filters and sorting options.",
    ],
    thumbnail: [],
    url: "https://seek-red.vercel.app/",
    source: "https://github.com/p34-pac/Seek",
    id: 7,
  },
];
