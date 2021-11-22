import express from 'express';
import mongoose from 'mongoose';
import authRoute from './routes/auth.route.js'
import todoRoute from './routes/todo.route.js'
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json({ extended: true })); // подключаем json распознование
app.use('/api/auth', authRoute);
app.use('/api/todos', todoRoute);

async function start() {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.kmkxm.mongodb.net/todo?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    } catch (error) {
        console.error(error)
    }
}

start();
