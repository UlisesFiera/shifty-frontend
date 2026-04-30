# Shifty

This is the frontend for the Shifty employee management system, built with Angular and integrated with a Spring Boot backend.
You can check out the backend part here: https://github.com/UlisesFiera/shifty-backend

This is just a bare bones prototype for a much bigger incoming app, just to let you see the core functionalities.

## Key Features & Techniques

The goal was to create a simple clock-in and out app that serves as a starting point for a more complex company resource-management tool.

Inspired by a horrible app at my former weekend job, I tried to make an intuitive and visual way for checking in and out just by typing your personalized login name, and provide a visual
dashboard alongside super-admin management tools, which right now are pretty basic.

Right now, you can only check-in and out, set your break, perform CRUD operations with the employee component and search them. Future components will be added via microservices.

In the backend part, many functionalities are already given as end-points for future development. For example: employee statistics across time.

I refused to use pre-built tools in order to create graphics or carrousels. Everything you see is made from scratch by using (human) logic.

![login](readme-pics/image.png)
Only the super-admin or managers can log in the app.

![dashboard](readme-pics/image-2.png)
The time shift utility. Tracks time on shift. Each employee checks in with their personalised name. One of these has had a long shift! The lines turn yellow when the emp is on break.

![clocker](readme-pics/image-3.png)

![block](readme-pics/image-4.png)
The 'prototype logic' of the product is: the manager logs in and blocks the page to hide admin tools. In the future, a way to log in this page for employees will be available requesting a company code.

![alt text](readme-pics/find)
A smooth carrousel to find them minions easy. You can move around it or just type the name.

![emp](readme-pics/image-6.png)
The employee data.

![edit](readme-pics/image-7.png)
You can modify each field and add photo files.

Technical specifications:

- **Angular Standalone Components**: Uses Angular's standalone component architecture for modularity and simplicity.
- **Reactive State with Signals**: Employs Angular's `signal` and `computed` for reactive state management, making UI updates efficient and predictable.
- **RESTful API Integration**: Communicates with a Spring Boot backend using Angular's `HttpClient`, with all endpoints and base URLs managed via environment files for easy switching between dev and prod.
- **Dynamic Image Handling**: Implements a robust method for displaying user-uploaded images, handling both backend-served URLs and local file paths, ensuring compatibility regardless of backend response format.
- **File Uploads**: Supports profile picture uploads using `FormData` and multipart POST requests, with backend integration for file storage and retrieval.
- **Role-Based UI**: Includes editing panels and conditional UI elements based on user actions and roles, improving user experience and security.
- **Material Design**: Utilizes Angular Material for icons and UI consistency.
- **CORS & Security**: Backend and frontend are configured to communicate securely across different ports and origins, with CORS enabled and static resource mapping for uploaded files.

