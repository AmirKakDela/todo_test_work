import jwt from 'jsonwebtoken';
import { config } from "../config.js";

export const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        console.log('OPTIONS');
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: 'Токена нет' });
        }
        const decoded = jwt.verify(token, config.SECRET_KEY)
        req.user = decoded
        next();
    } catch (e) {
        console.log(e);
        return res.status(403).json({ message: 'Ошибка authMiddleware' });
    }
}