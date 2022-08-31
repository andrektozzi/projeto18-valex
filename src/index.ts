import express, { json } from 'express';
import cors from 'cors';

import router from "./routes/indexRouter";


const app = express();
app.use(json());
app.use(cors());
app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});