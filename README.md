# Qimaash E-Commerce Website

This repository contains the source code for the Qimaash e-commerce website, built with Next.js.

## Project Structure

The entire Next.js project is located inside the `/qimaash-in` directory.

**IMPORTANT:** All commands, such as installing dependencies or running the development server, must be executed from *within* the `/qimaash-in` directory.

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Navigate to the Project Directory

First, change your directory to the project's root folder:

```bash
cd qimaash-in
```

### 2. Install Dependencies

Once you are inside the `qimaash-in` directory, install the necessary dependencies using npm:

```bash
npm install
```

### 3. Set Up Environment Variables

The project requires a MongoDB connection string. For development, this is currently hardcoded in `src/lib/db.ts`. For production, you will need to set up environment variables.

### 4. Run the Development Server

After installation is complete, you can start the development server:

```bash
npm run dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000).

### 5. Build for Production

To create a production-ready build of the application, run:

```bash
npm run build
```

This will check for type errors and build the optimized static files. After a successful build, you can start the production server with `npm start`.
