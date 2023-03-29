// api/auth/login.ts
import { handleLogin } from "@auth0/nextjs-auth0";

const loginHandler = async (req, res) => {
  try {
    await handleLogin(req, res, {
      authorizationParams: {
        screen_hint: "login",
      },
    });
  } catch (error) {
    res.status(error.status || 400).end(error.message);
  }
};

export default loginHandler;
