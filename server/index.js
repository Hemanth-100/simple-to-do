   import express from 'express';
   import helmet from 'helmet';
   import cors from 'cors';
   //import routes from './routes';
   //import errorHandler from './middleware/errorHandler';
   import routes from "./routes.js"
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);


app.listen(5000, () => console.log("Server running on port 5000"));
