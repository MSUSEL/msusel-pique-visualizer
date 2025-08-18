
# Getting Started with PIQUE Visualizer

Welcome to the PIQUE Visualizer! This guide will walk you through the steps to get the visualizer up and running on your machine.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- **Node.js**: PIQUE Visualizer is a Node.js application. You need Node.js installed to run the server and the application itself. [Download Node.js](https://nodejs.org/)
- **npm (Node Package Manager)**: npm comes with Node.js, and it's used to manage the dependencies of the application. Ensure it's installed by running `npm -v` in your terminal.

## Installation

Follow these steps to install the PIQUE Visualizer:

1. **Clone the Repository**
   First, clone the PIQUE Visualizer repository to your local machine using Git:
   ```bash
   git clone https://github.com/MSUSEL/msusel-pique-visualizer.git
   ```

2. **Navigate to the Project Directory**
   After cloning, change into the project directory:
   ```bash
   cd msusel-pique-visualizer
   ```

3. **Install Dependencies**
   Inside the project directory, install the necessary dependencies using npm:
   ```bash
   npm install
   ```
   This command reads the `package.json` file and installs all the dependencies listed there.

## Running the Visualizer

To start the PIQUE Visualizer, use the following npm command:

```bash
npm run dev
```

This command starts the development server and usually opens the visualizer in your default web browser. If it doesn't open automatically, you can manually navigate to the following address in your browser:

```
http://localhost:5173
```

## Using npm run storybook

For a more detailed component view or for development purposes, you can use Storybook:

```bash
npm run storybook
```

Storybook provides a sandbox to build UI components in isolation, making it easier to develop and test components.

## Next Steps

Now that you've successfully set up and started the PIQUE Visualizer, you're ready to begin visualizing your software quality results. Explore the [Using the Visualizer](using-the-visualizer) section next for detailed instructions on how to use the tool's features.
