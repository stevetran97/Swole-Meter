// A Class container all Authentication IN THE BROWSER.
// Includes
  // 1. authenticateUser(token)
    // Stores a token in local storage
  // 2. isUserAuthenticated()
    // Gets token from storage
    // Passed as a prop helper through Main.js
    // Returns true or flase regarding whether the token exists
  // 3. authenticateUser(token)
    // Stores a token in local storage
  // 4. authenticateUser(token)
    // Stores a token in local storage


class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   * Implementations: Used once to set local storage token when /login request at LoginPage succeeds.
   * 
   * @param {string} token
   */
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  };

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   * Implementations: used in toggleAuthenticateStatus() in HomePage and LoginPage Views to check authenticated status
   * Implementations: used for conditionally rendering Private Routes and LoggedOut Routes in Main.js 
   * 
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  };

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   * Implementations: Only called upon first rendering Logout view
   */
  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  /**
   * Get a token value.
   * Implementations: Used once at the dashboard fetch call on first render. Sets the authorization header
   * @returns {string}
   */
  static getToken() {
    return localStorage.getItem('token');
  }

};

export default Auth;