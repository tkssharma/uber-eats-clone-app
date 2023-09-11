import type { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: NextApiRequest) {
  // req.method and take action

  const query = request;
  console.log(query);

  return new Response("Hello, Next.js....");
}

//   /api/restaurant -- HTTP GET
