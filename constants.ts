import type { ExperienceItem, Project, SkillCategory, ContactInfo, EducationItem } from './types';
import { EmailIcon, PhoneIcon, GitHubIcon, LinkedInIcon } from './components/icons';

export const PROFESSIONAL_EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Research Assistant : Full Stack Engineer',
    company: 'Human Computer Interaction Lab, SCU',
    period: 'Mar 2025 - Present',
    tasks: [
      'Built FocusMode Chrome extension empowering distraction-free YouTube use for 3,600+ users.',
      'Designed a scalable AWS Lambda backend (Python/JavaScript) with DynamoDB and fully automated APIs.',
      'Developed ML models predicting focus triggers (70% accuracy) and LLM agent recommendations (82% accuracy).',
      'Managed CI/CD workflows and authored detailed design docs.',
      'Delivered production-ready software through Agile collaboration.'
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Persistent Systems',
    period: 'Jun 2022 - Jul 2024',
    tasks: [
      'Scalable backend development with Java Spring Boot, Liquibase, PostgreSQL.',
      'Implemented audit history and time machine rollbacks in Quarkus microservices (+10% productivity).',
      'Automated metadata workflows via Spring Boot and Azure OpenAPI (–97% manual work).',
      'Built Redis-based locking for safe integrations and improved reliability.',
      'Maintained 90%+ code coverage with TDD and collaborative reviews.'
    ],
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'Master of Computer Science',
    institution: 'Santa Clara University',
    period: 'Sep 2023 - May 2025 (Expected)',
    gpa: 'GPA 3.75',
    courses: [
      'Design Patterns & Architecture',
      'Pattern recognition & Data Mining',
      'Object Oriented Design & Analysis',
      'Distributed Systems',
    ]
  },
  {
    degree: 'B.Tech in Computer Engineering',
    institution: 'College of Engineering Pune',
    period: 'Aug 2018 - Jun 2022',
    gpa: 'GPA 3.67',
    courses: [
      'Data Structures',
      'Operating Systems',
      'Computer Networks',
      'Database Management Systems',
      'Software Engineering',
      'Compiler Design',
      'Natural Language Processing',
    ]
  }
];


export const FEATURED_PROJECTS: Project[] = [
    {
        title: 'MilkMate – Milk Delivery App',
        description: [
            'Digitized end-to-end milk delivery workflows with 10+ integrated modules, replacing manual tracking.',
            'Implemented secure authentication using JWT and Spring Security, enabling role-based access control for milkmen and customers.',
            'Applied 18 design patterns (Factory, Observer, Strategy, etc.) to design an extensible, maintainable architecture.',
            'Developed the frontend in React Native, delivering a smooth cross-platform mobile experience.',
            'Enabled end-of-month PDF generation for automated settlements and reporting.'

        ],
        githubUrl: 'https://github.com/kandgesid/Milkman',
        techStack: ['System Design', 'Java', 'Spring Boot', 'React Native', 'PostgreSQL']
    },
    {
        title: 'Pocket Insights – Finance Tracker',
        description: [
            'Built a full-stack financial management app with React.js, Next.js, Node.js, and TypeScript, enabling users to track and visualize their transactions securely.',
            'Used Drizzle ORM + NeonDB to ensure scalable and reliable data storage.',
            'Implemented CSV import support for 1,000+ transactions in seconds, increasing user productivity by 90% compared to manual entry.',
            'Developed advanced filters and reusable React components to create real-time financial dashboards.',
            'Optimized server-side rendering (SSR) and API routes in Next.js to deliver fast, SEO-friendly pages.'
        ],
        githubUrl: 'https://github.com/kandgesid/finance-tracker',
        techStack: ['React.js', 'Next.js', 'Node.js', 'TypeScript', 'Drizzle ORM', 'NeonDB']
    },
    {
        title: 'Malware Detection System',
        description: [
          'Developed a CNN-based malware classifier achieving 80% accuracy distinguishing malicious and benign system files.',
          'Applied advanced data augmentation on a Kaggle dataset to improve model robustness.',
          'Used transfer learning with VGG16 and optimized hyperparameters for better performance.'
        ],
        githubUrl: 'https://github.com/kandgesid/Data-Science-and-ML-projects/tree/master',
        techStack: ['Python', 'TensorFlow', 'Keras', 'Computer Vision']
    },
    {
        title: 'Loan Repayment Prediction',
        description: [
          'Performed data mining on a 390,000+ record dataset to identify key repayment factors.',
          'Engineered features by removing highly correlated predictors and reducing dimensionality.',
          'Developed a neural network with Keras, achieving 88% prediction accuracy.',
          'Compared Regression, SVM, and Random Forest using cross-validation.'
        ],
        githubUrl: 'https://github.com/kandgesid/Data-Science-and-ML-projects/tree/master',
        techStack: ['Python', 'Keras', 'scikit-learn', 'Pandas', 'NumPy']
    },
];

export const SKILLS_DATA: SkillCategory[] = [
    {
        title: 'Languages',
        skills: ['Python', 'Java', 'Go', 'JavaScript', 'TypeScript', 'C++', 'C', 'SQL', 'HTML/CSS', 'Bash']
    },
    {
        title: 'Frameworks & Libraries',
        skills: ['Spring Boot', 'Spring Security', 'AWS Lambda', 'Quarkus', 'Next.js', 'Node.js', 'React.js', 'React Native', 'PyTorch', 'TensorFlow', 'Keras']
    },
    {
        title: 'Cloud & DevOps',
        skills: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'Git']
    },
    {
        title: 'Databases',
        skills: ['PostgreSQL', 'DynamoDB', 'MySQL', 'MongoDB', 'Redis']
    },
    {
        title: 'Architecture & Design',
        skills: ['OOP', 'System Design', 'Distributed system', 'Multi threading']
    }
]

export const CONTACT_DETAILS: ContactInfo[] = [
    {
        icon: EmailIcon,
        title: 'Email',
        value: 'kandge.siddhant30@gmail.com',
        href: 'mailto:kandge.siddhant30@gmail.com'
    },
    {
        icon: PhoneIcon,
        title: 'Phone',
        value: '+1 (925)-699-3528',
        href: 'tel:+19256993528'
    },
    {
        icon: GitHubIcon,
        title: 'GitHub',
        value: 'github.com/kandgesid',
        href: 'https://github.com/kandgesid'
    },
    {
        icon: LinkedInIcon,
        title: 'LinkedIn',
        value: 'Connect with me',
        href: 'https://www.linkedin.com' // Placeholder
    }
]
