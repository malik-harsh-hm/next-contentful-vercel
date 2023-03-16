import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { slug } = request.query;
  return response.end(`Hello ${slug}!, timestamp - ${Date.now()}`);
}
