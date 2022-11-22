import 'dotenv/config';
import express  from "express";
import router from './src/routes/user_route.js';
const app = express();

const port = process.env.PORT || 1000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(router);

app.listen(3000, () => {
    console.log(`Application running on port ${port}`)
});