// API.js

// Function to get logged-in user's info (requires a token)
export const getMe = (token) => {
  return fetch("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => {
    console.error("Error fetching user data:", error);
  });
};

// Function to create a new user
export const createUser = (userData) => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).catch((error) => {
    console.error("Error creating user:", error);
  });
};

// Function to log in a user
export const loginUser = (userData) => {
  return fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).catch((error) => {
    console.error("Error logging in:", error);
  });
};

// Function to save book data for a logged-in user
export const saveBook = (bookData, token) => {
  return fetch("/api/users/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  }).catch((error) => {
    console.error("Error saving book:", error);
  });
};

// Function to remove saved book data for a logged-in user
export const deleteBook = (bookId, token) => {
  return fetch(`/api/users/books/${bookId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => {
    console.error("Error deleting book:", error);
  });
};

// Function to make a search request to the Google Books API
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`).catch(
    (error) => {
      console.error("Error searching Google Books:", error);
    }
  );
};
