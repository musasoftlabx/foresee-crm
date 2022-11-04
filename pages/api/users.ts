import _ from "lodash";
const randomstring = require("randomstring");

// Import from schemas
import { usersCollection } from "./model/schema";

export default async function handler(req, res) {
  if (req.method === "GET") {
    if (req.query === "domains") {
      res.status(200).json({ yea: 2 });
    } else {
      res.status(200).json({ yea: 2 });
    }
  }

  if (req.method === "POST") {
    const { firstName, lastName, emailAddress, domain } = req.body;

    let username = `${firstName.charAt(0)}${lastName}`;

    const password = randomstring.generate(8);

    let count = await usersCollection.countDocuments({ username });

    if (count === 0) {
      usersCollection.create(
        {
          firstName: _.capitalize(firstName.toLowerCase()),
          lastName: _.capitalize(lastName.toLowerCase()),
          emailAddress: emailAddress.toLowerCase(),
          username: username.toLowerCase(),
          password,
          domain,
        },
        (err, data) => {
          if (err) {
            res.status(400).json({ error: err });
          } else {
            res.status(201).json(data);
          }
        }
      );
    } else {
      res.status(400).json({
        message: "Username already exists",
      });
    }
  }
}
