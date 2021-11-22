import { Router } from 'express';
import User from '../models/User.js';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from "../config.js";
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = Router();

router.post(
    '/signup',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароль')
            .isLength({ min: 6, max: 30 }),
        check('name', 'Введите имя').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array(), message: 'Некорректные данные при регистрации' })
            }
            const { email, password, name } = req.body;
            const isUsed = await User.findOne({ email })
            if (isUsed) {
                return res.status(400).json({ message: 'Данный email уже занят, попробуйте другой' })
            }

            const hashedPassword = await bcrypt.hash(password, 7)

            const user = new User({ email, password: hashedPassword, name });

            await user.save();

            res.status(201).json({ message: 'Пользователь создан' })
        } catch (error) {
            res.status(500).json({ message: 'Ошибка. Что-то пошло не так...' })
        }
    })


router.post(
    '/login',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }
            const { email, password } = req.body
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Такого пользователя не существует' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' });
            }

            const token = jwt.sign(
                { userId: user._id },
                config.SECRET_KEY,
                { expiresIn: '5h' }
            )

            res.json({
                token, user: {
                    email: user.email,
                    name: user.name,
                    id: user._id
                }
            })

        } catch (error) {
            res.status(500).json({ message: 'Ошибка. Что-то пошло не так...' })
        }
    })

router.get('/auth', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.userId });
        const token = jwt.sign(
            { userId: user._id },
            config.SECRET_KEY,
            { expiresIn: '5h' }
        )
        res.json({
            token,
            user: {
                email: user.email,
                name: user.name,
                id: user._id
            }
        })
    } catch (error) {
        console.log(error);
    }

})


export default router;