export const getAuthToken = () => {
  return localStorage.getItem("auth_token");
};

export const login = (token, role, name, surname) => {
  localStorage.setItem("auth_token", token);
  localStorage.setItem("role", JSON.stringify(role));
  localStorage.setItem("name", name);
  localStorage.setItem("surname", surname);
};

export const logout = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("role");
  localStorage.removeItem("name");
  localStorage.removeItem("surname");
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("auth_token");
  return !!token;
};

export const isAdmin = () => {
  const roles = localStorage.getItem("role");
  return roles && roles.includes("ADMIN");
};

export const isUser = () => {
  const roles = localStorage.getItem("role");
  return roles && roles.includes("USER");
};
