import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isTokenValid from "../utilities/jwt_auth_check"; // Import the utility function
import { notification } from "antd";

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve the token from storage

    if (!token || !isTokenValid(token)) {
      // If no token or token is invalid, redirect to login
      localStorage.removeItem("token"); // Clear the invalid token
      navigate("/login");
      notification.error({
        message: 'Session Expired',
        description: "Please LogIn again",
        placement: 'topRight',
    });
    }
  }, [navigate]);
};

export default useAuth;