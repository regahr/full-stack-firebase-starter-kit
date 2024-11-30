import { Request, RequestHandler, Response } from "express";
import db from "../config/firebaseConfig";
import { User } from '../../shared/user';

export const createUserData: RequestHandler = async (req: Request, res: Response) => {
  const body = req.body as User;
  try{
    const docRef = db.collection("USERS").doc();
    await docRef.create(body);
    const newUser = await docRef.get();
    res.status(201).send({ message: "User data created", user: { id: docRef.id, ...newUser.data() } });  
  } catch(e) {
    res.status(500).send({ error: "Failed to create user" }); // Send error response
  }
};

export const fetchUserData: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { email } = req.params;
  
  try {
    if (email) {
      const snapshot = await db.collection("USERS").where('email', '==', email).get();

      if (snapshot.empty) {
        res.status(404).send({ message: `No user found with email ${email}.` });
        return;
      }

      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      res.status(200).send(users[0]);
    } else {
      const snapshot = await db.collection("USERS").get();
      if (snapshot.empty) {
        res.status(404).send({ message: "No users were found." });
        return;
      }
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      res.status(200).send(users);
    }
  } catch (error) {
    if (email) {
      console.log(error)
      res.status(500).send({ error: `Failed to fetch user with email ${email}.` });
    } else {
      console.log(error)
      res.status(500).send({ error: "Failed to fetch users." });
    }
  }
};

export const updateUserData = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const updatedData = req.body as User;

    const userRef = db.collection('USERS').where('email', '==', email);
    const snapshot = await userRef.get();

    if (snapshot.empty) {
      res.status(404).json({ message: 'User not found' });
    }

    const userDoc = snapshot.docs[0];
    await userDoc.ref.update(updatedData as any);

    res.status(200).json({
      message: 'User data updated successfully',
      user: { id: userDoc.id, ...userDoc.data(), ...updatedData }
    });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ message: 'Error updating user data' });
  }
}; 

export const deleteUserData = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  await db.collection("USERS").doc(userId).delete();
  res.send("User data deleted");
};
