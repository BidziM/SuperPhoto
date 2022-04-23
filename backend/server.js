import express from 'express';
import cors from'cors';
import apiRouter from './src/api/v1.js';

const app = express()
, port = process.env.PORT || 80

app.use(cors());
app.use(express.json());

//Handel Api V1
apiRouter(app)

app.listen(port, console.log(`Server is ready and using the port ${port}`));