# HostedMatic (Static Version)

This version of the application has been optimized for hosting on static platforms like GitHub Pages. PHP backend functions have been replaced with pre-generated JSON data and client-side logic.

## How it Works

Instead of querying a PHP server (which requires a backend like Apache/XAMPP), the application now fetches data from the `data/` directory:
- `data/questions.json`: Contains all questions from the question bank.
- `data/lessons.json`: Lists all available markdown lesson files.
- `data/dashboard_data.json`: Contains pre-calculated statistics for the dashboard.

## Updating Data

If you add new questions or lesson files, you must regenerate the static JSON files for them to appear in the app.

1.  Ensure you have Node.js installed.
2.  Open a terminal in the project root.
3.  Run the generation script:
    ```bash
    node generate_static_data.js
    ```
4.  Commit and push the updated `data/*.json` files to GitHub.

## Limitations

-   **Read-Only**: Since there is no backend database, you cannot edit questions, add topics, or save allocations permanently on the server.
-   **Mock Saving**: The application simulates saving actions (like editing a question) to show UI feedback, but these changes are not persisted to files.
-   **Local Storage**: User preferences (like dark mode or local topic lists) may be saved in your browser's Local Storage.

## Hosting

Simply upload this entire folder to a GitHub repository and enable GitHub Pages (pointing to the `root` or `docs` folder if you move it there). Ensure `index.html` is the entry point.
