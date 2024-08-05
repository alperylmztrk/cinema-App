export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token");
  };
  
  export const setAuthToken = (token) => {
    if (token !== null) {
      localStorage.setItem("auth_token", token);
    } else {
      localStorage.removeItem("auth_token");
    }
  };
  export const setRole = (role) => {
    localStorage.setItem("role", JSON.stringify(role));
  };
  
  export const isAuthenticated = () => {
    const token = localStorage.getItem("auth_token");
    return !!token;
  };

  export const isAdmin = () => {
    const roles = localStorage.getItem("role");
    return roles.includes("ADMIN");
  };

  export const isUser = () => {
    const roles = localStorage.getItem("role");
    return roles.includes("USER");
  };