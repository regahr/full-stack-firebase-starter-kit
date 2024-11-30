import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1]; // Extract token from Authorization header
    if (token) {
      // admin.auth().verifyIdToken(token) // Verify the token
      //   .then((decodedToken) => {
      //     (req as any).user = decodedToken; // Attach the decoded token to the request object
          next(); // Proceed to the next middleware
        // })
        // .catch((error) => {
        //   console.error('Error verifying token:', error);
        //   res.status(401).send('Unauthorized'); // Send unauthorized response if token is invalid
        // });
    } else {
      res.status(401).send('Unauthorized'); // Send unauthorized response if no token is provided
    }
  } catch (error) {
    console.error('Error in authMiddleware:', error);
    res.status(500).send('Internal Server Error'); // Send internal server error response if any other error occurs
  }
};
