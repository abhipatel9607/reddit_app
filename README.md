# Reddit App

Welcome to the Reddit Clone project! This Angular application replicates some of the key features of Reddit, allowing users to create subreddits, add text/link/Image posts, upvote/downvote posts and comments, and more.

## Live Demo

- You can see project directly from here
  [Live Demo](https://reddit-app-abhishek.netlify.app/)

## Getting Started

### Prerequisites

Make sure you have the following tools installed:

- Node.js: [Download Node.js](https://nodejs.org/)
- Angular CLI: Install globally using `npm install -g @angular/cli`

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abhipatel9607/reddit_app.git
   ```

2. Change the repository:

   ```bash
   cd reddit_app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   ng serve
   ```
   - Open your browser and navigate to `http://localhost:4200/` to view the app.

## Features

- **Authentication:** Users can sign up and log in to the application.
- **Create a Subreddit:** Authenticated users can create a new subreddit.
- **Add a Text Post:** Users can create text posts within a subreddit.
- **Add a Link Post:** Users can create link posts within a subreddit.
- **View Post Detail Page:** Users can view detailed information about a post, including comments.
- **Upvote/Downvote:** Authenticated users can upvote or downvote both posts and comments.
- **Add a Comment:** Users can add comments to a post.
- **Edit a Comment:** Users can edit their own comments.
- **View All Posts in a Subreddit:**
  - Sorted by votes in descending order.
  - Sorted by latest posts.

## Project Structure

- `src/app`: Contains the main Angular application code.
- `src/app/firebase`: Firebase-related services (authentication, Firestore database, etc.).
- `src/app/services`: Angular services for managing data and functionality.
- `src/app/`: Angular components for different parts of the application.

## Technologies Used

- Angular 15
- Firebase (Authentication, Firestore, Storage)

## Contributing

- Feel free to contribute to this project by opening issues or creating pull requests.
