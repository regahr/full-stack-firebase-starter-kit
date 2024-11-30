import express from 'express';
import userRoutes from '../routes/userRoutes';
import cors from 'cors';
import * as functions from 'firebase-functions' 

const app = express();
app.use(express.json());
// Enable CORS for all routes
app.use(cors()); 

app.use('/api', userRoutes);

exports.app = functions.https.onRequest(app);