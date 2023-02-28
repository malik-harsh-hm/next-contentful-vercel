import { NextApiRequest, NextApiResponse } from "next";

export default function handler(request, response) {
  response.status(200).json({
    body: `
    ENVIRONMENT VARIABLES - 

    VERCEL - ${process.env.VERCEL}
    VERCEL_ENV - ${process.env.VERCEL_ENV}
    VERCEL_URL - ${process.env.VERCEL_URL}
    VERCEL_REGION - ${process.env.VERCEL_REGION}
    VERCEL_GIT_PROVIDER - ${process.env.VERCEL_GIT_PROVIDER}
    VERCEL_GIT_REPO_SLUG - ${process.env.VERCEL_GIT_REPO_SLUG}
    VERCEL_GIT_REPO_OWNER - ${process.env.VERCEL_GIT_REPO_OWNER}
    VERCEL_GIT_REPO_ID - ${process.env.VERCEL_GIT_REPO_ID}
    VERCEL_GIT_COMMIT_MESSAGE - ${process.env.VERCEL_GIT_COMMIT_MESSAGE}
    VERCEL_GIT_COMMIT_AUTHOR_NAME - ${process.env.VERCEL_GIT_COMMIT_AUTHOR_NAME}
    VERCEL_ENV - ${process.env.VERCEL_ENV}
    VERCEL_ENV - ${process.env.VERCEL_ENV}
    VERCEL_ENV - ${process.env.VERCEL_ENV}
    VERCEL_ENV - ${process.env.VERCEL_ENV}
    VERCEL_ENV - ${process.env.VERCEL_ENV}

    
    `,
  });
}
