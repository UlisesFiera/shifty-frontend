# Shifty Frontend

This is the frontend for the Shifty employee management system, built with Angular and integrated with a Spring Boot backend.

## Key Features & Techniques

- **Angular Standalone Components**: Uses Angular's standalone component architecture for modularity and simplicity.
- **Reactive State with Signals**: Employs Angular's `signal` and `computed` for reactive state management, making UI updates efficient and predictable.
- **RESTful API Integration**: Communicates with a Spring Boot backend using Angular's `HttpClient`, with all endpoints and base URLs managed via environment files for easy switching between dev and prod.
- **Dynamic Image Handling**: Implements a robust method for displaying user-uploaded images, handling both backend-served URLs and local file paths, ensuring compatibility regardless of backend response format.
- **File Uploads**: Supports profile picture uploads using `FormData` and multipart POST requests, with backend integration for file storage and retrieval.
- **Role-Based UI**: Includes editing panels and conditional UI elements based on user actions and roles, improving user experience and security.
- **Material Design**: Utilizes Angular Material for icons and UI consistency.
- **CORS & Security**: Backend and frontend are configured to communicate securely across different ports and origins, with CORS enabled and static resource mapping for uploaded files.

## Project Structure

- `shiftyapp/src/app/` — Main Angular app code (components, services, routes)
- `shiftyapp/src/environments/` — Environment-specific settings
- `shiftyapp/public/` — Public assets

## Running the Project

- Frontend: https://your-frontend.vercel.app  
- Backend: https://your-backend.onrender.com

## Notable Files

- `employee.service.ts`: Handles all employee-related API calls and image URL normalization.
- `employee.component.ts` & `employee.html`: Main UI for employee data, editing, and image display.
- `WebConfig.java` (backend): Maps `/files/**` URLs to the uploads directory for image serving.

---

For more details, see the code and comments in each file. Contributions and suggestions are welcome!
