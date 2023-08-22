import { NextApiRequest, NextApiResponse } from "next";

let visitorCount = 0;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      res.status(200).json({ visitorCount });
      break;
    case "POST":
      visitorCount++;
      res.status(200).json({ visitorCount });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
