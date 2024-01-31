import decode from "jwt-decode";

class AuthService {
  // Get user data from token
  getProfile() {
    return decode(this.getToken());
  }

  // Check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }

  // Get the user token from local storage
  getToken() {
    return localStorage.getItem("id_token");
  }

  // Save the user token to local storage and redirect
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  // Log the user out by clearing local storage and redirecting
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();
