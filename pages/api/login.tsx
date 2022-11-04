// Import from schemas
import { usersCollection } from "./model/schema";

export default function handler(req, res) {
  /* const emailAddress = "musasoftlabx@gmail.com";

  usersCollection.findOne({ emailAddress }).then(async (user) => {
    console.log(user);
  }); */
  console.log(req.body);
  res.status(200).json(req.body);
}
