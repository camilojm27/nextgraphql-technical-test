// pages/api/auth/[...nextauth].ts
import { auth, signIn, signOut, handlers } from "@/auth"; // Make sure these are correctly implemented
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await auth(req, res); // Authenticate the user
    if (session) {
      return res.status(200).json({ message: "Success" }); // Return success message
    } else {
      return res.status(401).json({ error: "You must be logged in." }); // Unauthorized
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(500).json({ error: "Internal server error" }); // Handle other errors
  }
}
