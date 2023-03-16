import { withApiAuthRequired } from "@auth0/nextjs-auth0";

const handler = (req, res) => {
  res.status(200).json({
    someProtectedInfo: "this is protected info",
  });
};

export default withApiAuthRequired(handler);
