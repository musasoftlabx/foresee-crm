// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

/* export const cookies = () => {
  return "aaa";
}; */
//export let cookies = {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //cookies = req.cookies;
  //res.status(200).json(req.cookies);
  res.status(200).json({ a: 1 });
}
