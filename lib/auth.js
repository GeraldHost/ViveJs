export default authService = request => {
  const login = (email, pass) => request("post", "auth/login", { email, pass });
  const register = (email, pass) =>
    request("post", "auth/register", { email, pass });
  return Object.assign(
    {},
    {
      login,
      register,
    }
  );
};
