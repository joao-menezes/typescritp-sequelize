import express, {response} from 'express';
import sequelize from './sequelize/database';
import dotenv from 'dotenv';
import routes from "./routes/routes";
import HttpCodes from "http-status-codes";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/api', routes);

app.listen(port, async () => {
   if (process.env.NODE_ENV !== 'production'){
       try {
           await sequelize.authenticate();
           // await sequelize.sync({force: true});
           console.log(`Server is running on http://localhost:${port}`);
           response.status(HttpCodes.OK);
       } catch (error) {
           response.status(HttpCodes.BAD_GATEWAY);
           console.error(`Unable to connect to the database: ${error}`);
       }
   }

});
