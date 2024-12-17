# Notes CRUD Application with Vite + React

This is a simple CRUD (Create, Read, Update, Delete) Notes web application built using **React** with note service and route protection. Users can log in, view, add, edit, and delete notes.

---

## Features

1. **Notes List Page**: View all the notes with `Title` and `Created Time`.
2. **Add New Note**:  
   - A modal allows users to add new notes.  
   - Form validation:  
      - Title cannot exceed 50 characters.  
      - Content cannot exceed 200 characters.  
3. **Note Details Page**: View detailed information about a note (Title, Content, Created Time).  
   - Edit and save notes.  
   - Delete a note.  
4. **Login Protection**:  
   - Users must log in with a username and password to access the Create/Edit pages.  
   - Mock authentication (username: `user`, password: `password`).
5. **Note Service**: Notes are stored in memory or `localStorage` for persistence.
6. **Error Handling**: Unauthorized users are redirected to the login page with proper error messages.

---

## Tech Stack

- **Framework**: [Vite](https://vite.dev/)
- **State Management**: React's `useState`, `useEffect`, `useNavigate`, and `localStorage`.
- **Routing**: React's `react-router-dom`
- **Mock Note Service**: Simulated using JavaScript objects.
- **UI**: Bootstrap

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/notes-crud-app.git
   cd notes-crud-app 
   ```

2. **Install dependencies**:
   ```bash
   npm install 
   ```

3. **Run the development server**:
   ```bash
   npm run dev 
   ```
4. Open your browser and visit [http://localhost:5173](http://localhost:5173).

---

## Usage Instructions
1.	Login:
Go to / and use the credentials:
-	Username: user
-	Password: password

2.	Navigate:
-	/notes - View the list of notes.
-	/notes/{id} - View and edit a note.
-	Add or delete notes using the provided buttons.

---

##Future Improvements
- 	Add tests
- 	Add 'back' button
-	Add user authentication via JWT or OAuth.
-	Add API integration for persistent storage
-	Add a real backend with a MongoDB database

---

## License

This project is licensed under the **MIT License**.

---

## Author

Manoj Shinde
