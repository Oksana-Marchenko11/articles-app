# Article Explorer

This is a simple React application for browsing and filtering articles. It is built using **TypeScript**, **Material UI**, and **SCSS** for styling.

## Features

- **Home Page**

  - Displays article cards with the title, publication date, and a short summary (up to 100 characters).
  - Users can click on a card to navigate to the Article Page for full details.
  - Includes a search input to filter articles by keywords in the **title** or **summary**.
  - Articles are prioritized: matches in the **title** appear before matches in the **summary**.
  - Matched keywords are highlighted in yellow.

- **Article Page**

  - Displays the article title, full summary, and image (if available).
  - "Back to homepage" button for navigation.

- **Custom Hook**

  - `useArticles` demonstrates a simple **custom hook** for fetching articles with loading and error states.

- **Material UI**
  - Used for consistent styling of buttons, typography, cards, and input fields.
  - SCSS is used to handle layout and additional styles not covered by MUI.

## State Management

This application does not use global state (like Redux or Context API) because all state is local to components:

- The article list is fetched and filtered within the Home Page using the `useArticles` hook.
- Search input state (`query`) is local to the Home Page component.
- Individual article data is fetched and managed in the Article Page component.

> Global state would only be necessary if multiple components needed to **share and update the same data** simultaneously. In this project, local state is sufficient and keeps the implementation simple.  
> If the app were to grow, **Redux or Context** would be a good choice.

## Technologies Used

- React + TypeScript
- Material UI
- SCSS
- React Router
- Custom Hooks

## Notes

- Cards are responsive with a grid layout: 3 columns on desktop, 2 on tablet, and 1 on mobile.
- Buttons and typography use MUI components for consistent design.
- Highlighting of search terms is handled in `ArticleCard` by splitting text and wrapping matched words with a yellow background.
