import { NextApiRequest, NextApiResponse } from "next";

let visitorCount = 0;

// if the user has a cookie, they've already visited the site
// if they don't have a cookie, increment the visitor count and set a cookie
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const uniqueVisitorCookie = req.cookies["unique_visitor"];

  if (!uniqueVisitorCookie) {
    visitorCount++;
    res.setHeader("Set-Cookie", "unique_visitor=true; Max-Age=86400"); // 24 hour expiry
  }

  res.status(200).json({ visitorCount });
}
