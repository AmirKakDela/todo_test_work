import {Router} from 'express';
import {authMiddleware} from '../middleware/authMiddleware.js';
import Todo from '../models/Todo.js';

const router = Router();

router.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos)
})


router.post('/add', async (req, res) => {
    try {
        const newTodo = await new Todo({
            title: req.body.title,
        })
        await newTodo.save()
        return res.json(newTodo)
    } catch (error) {
        return res.status(422).json({errorMessage: 'Ошибка post.', error})
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndRemove({_id: req.params.id})
        return res.status(200).json({message: 'Удалено успешно'});
    } catch (error) {
        return res.status(422).json({errorMessage: 'Ошибка delete.', error})
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate({_id: req.params.id}, req.body)
        console.log(req.body);
        return res.status(200).json({message: 'Обновлено успешно'});
    } catch (error) {
        return res.status(422).json({errorMessage: 'Ошибка update.', error})
    }
})

export default router;