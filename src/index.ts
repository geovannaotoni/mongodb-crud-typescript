import express from 'express';
import connectToMongoDB from './db/connection';
import router from './routes';
import ErrorHandler from './middlewares/ErrorHandler';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(router);
app.use(ErrorHandler.handle);

const PORT = process.env.PORT || 3000;

connectToMongoDB();

const server = app.listen(PORT, () => console.log(
  `Server is running on PORT: ${PORT}`,
));

export default server;
