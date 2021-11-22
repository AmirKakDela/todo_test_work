import User from '../models/User.js';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isUsed = await User.findOne({ email })
        if (isUsed) {
            return res.status(400).json({ message: 'Данный email уже занят, попробуйте другой' })
        }

        const hashedPassword = await bcrypt.hash(password, 7)

        const user = new User({ email, password: hashedPassword });

        await user.save();

        res.status(201).json({ message: 'Пользователь создан' })
    } catch (error) {
        res.status(500).json({ message: 'Ошибка. Что-то пошло не так...' })
    }
}