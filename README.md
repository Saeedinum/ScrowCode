# ScrowCode - Collaborative Platform for Graduation Projects

**ScrowCode** is a platform that connects students for collaboration on graduation projects. It streamlines the process of finding team members, forming teams, and organizing skills and track information. This is the first release, offering essential features for efficient student networking and team management.

## Live Demo
Check out the live version of ScrowCode: [ScrowCode Live](https://scrowcode.vercel.app/)


## Features

- **User Registration**: A 3-step sign-up process that includes:
  - **Step 1**: Personal information (name, email, password).
  - **Step 2**: University details (university name, department, year).
  - **Step 3**: Track and skills (technical skills, fields of interest).
- **Login & Authentication**:
  - Secure login functionality with validation.
  - Forgot password feature for account recovery.
- **Find Teams**: Browse and search for existing teams, view their details, and send collaboration requests.
- **Find Partners**: Search for individual partners who match your skills and interests and send partnership requests.
- **User Profile**: Personalized user profiles displaying skills, track details, and team affiliations.
- **Team Profile**: Team pages with information on members, skills, and requests for new collaborators.
- **Create Team**: Create and manage your own team with the ability to add members and manage details.

## Tech Stack

ScrowCode leverages a modern and efficient tech stack to ensure a seamless experience for both developers and users.

### Frontend Tools

The critical frontend tools used in ScrowCode include:

- **React**: A powerful JavaScript library for building user interfaces, focusing on component-based development and efficient rendering.
- **TypeScript**: Enhances JavaScript with static typing, ensuring code quality and reducing runtime errors.
- **Vite**: A fast development environment and build tool that supports hot module replacement (HMR) for an efficient development workflow.
- **Tailwind CSS**: A utility-first CSS framework that helps rapidly build responsive and consistent UIs.
- **React Router**: Provides dynamic routing and navigation, allowing for a seamless single-page application experience.
- **Redux Toolkit**: Manages the global state of the application efficiently and integrates seamlessly with React components.
- **React Hook Form**: Simplifies form management and validation with minimal re-renders.
- **Radix UI**: A set of accessible React components for common UI patterns such as dialogs, dropdowns, toasts, and progress indicators.
- **Zod**: A powerful schema validation library used to validate forms and API data, ensuring data integrity.
- **Lottie React**: For rendering and managing animations, enhancing the visual appeal of the application.

### Backend Tools

The backend of ScrowCode is designed to be scalable and secure, using the following critical tools:

- **Node.js**: A JavaScript runtime that provides a fast and scalable server-side environment for the application.
- **Express.js**: A minimal and flexible Node.js framework used for building APIs and handling HTTP requests efficiently.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB, simplifying data modeling and schema validation.
- **bcryptjs**: For hashing passwords securely, ensuring user credentials are safely stored.
- **jsonwebtoken**: Implements JWT for secure user authentication and authorization across the application.
- **Cloudinary**: Manages image and file uploads, providing optimization and transformation capabilities for media content.
- **Multer**: Middleware for handling multipart/form-data, essential for processing file uploads.
- **Nodemailer**: Facilitates email sending for functionalities like account verification and password recovery.
- **Passport.js**: Provides authentication strategies, including Google OAuth2, enabling secure and scalable user login options.
- **express-validator**: Middleware for validating user inputs, ensuring data integrity and reducing potential vulnerabilities.
- **Stripe**: Integrates payment processing capabilities, allowing for future expansion into monetization features if needed.
- **Sharp**: Optimizes and processes images, improving load times and media management.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS) to manage API access policies.
- **dotenv**: Loads environment variables, keeping sensitive information like API keys and credentials secure.
