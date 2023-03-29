// api/auth/logout.ts
import { handleLogout } from "@auth0/nextjs-auth0";

const logoutHandler = async (req, res) => {
  try {
    await handleLogout(req, res);
  } catch (error) {
    res.status(error.status || 400).end(error.message);
  }
};

export default logoutHandler;
