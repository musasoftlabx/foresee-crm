// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const NodeMailer = require("nodemailer");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let transporter = NodeMailer.createTransport({
    host: "mail.nairochem.com", //mail.privateemail.com for namecheap
    port: 465,
    secure: true,
    auth: {
      user: "repairs@nairochem.com", // admin@imsysafrica.com
      pass: "@Nairo2022#", // Jireh@2022
    },
  });

  let info = await transporter.sendMail({
    from: '"Test Nairochem 🥰" <repairs@nairochem.com>',
    //to: "musasoftlabx@gmail.com, brian@nairochem.com, hellena@nairochem.com, jane@nairochem.com", // list of receivers //,
    to: "musasoftlabx@gmail.com", // list of receivers //,
    subject: "Hello there from Next JS",
    text: "Testing the automated system mail",
    html: "<b>Testing the automated system mail</b>",
  });

  console.log("Message sent: %s", info.messageId);

  res.status(200).json({
    message: info.messageId,
  });
}
