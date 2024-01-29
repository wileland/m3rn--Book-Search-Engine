// Imports

// Create a class for user authentication
class AuthService {
  // Method to get user data from token
  getProfile() {
    return decode(this.getToken());
  }

  // Method to check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Method to check if a token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }

  // Method to get the user token from local storage
  getToken() {
    return localStorage.getItem("id_token");
  }

  // Method to save the user token to local storage and redirect
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  // Method to log the user out by clearing local storage and redirecting
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();
