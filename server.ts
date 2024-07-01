import express, {response} from 'express';
import sequelize from './sequelize/database';
import dotenv from 'dotenv';
import routes from "./routes/routes";
import HttpCodes from "http-status-codes";
import logger from "./logger";

dotenv.config();

const _fileName = module.filename.split("/").pop();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api', routes);

app.listen(port, async () => {
   if (process.env.NODE_ENV !== 'production'){
       try {
           await sequelize.authenticate();
           // await sequelize.sync({force: true});
           logger.info(`Server is running on http://localhost:${port} - ${_fileName}`);

           response.status(HttpCodes.OK);
       } catch (error) {
           response.status(HttpCodes.BAD_GATEWAY);
           logger.error(`Unable to run server: ${error} - ${_fileName}`);
       }
   }
});
