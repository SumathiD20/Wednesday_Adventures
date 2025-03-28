// utilities/jwt_auth_check.js
import { jwtDecode } from 'jwt-decode';

const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    // Check if the token is expired
    if (decodedToken.exp < currentTime) {
      return false; // Token is expired
    }

    return true; // Token is valid
  } catch (error) {
    console.error('Error decoding token:', error);
    return false; // Token is invalid
  }
};

export default isTokenValid;