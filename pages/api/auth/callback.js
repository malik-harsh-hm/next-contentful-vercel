// api/auth/callback.ts
import { handleCallback } from "@auth0/nextjs-auth0";

const callbackHandler = async (req, res) => {
  try {
    await handleCallback(req, res);
  } catch (error) {
    res.status(error.status || 400).end(error.message);
  }
};

export default callbackHandler;
