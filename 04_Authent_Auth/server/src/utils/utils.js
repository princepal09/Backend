import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/secrets.config.js'
export const generateToken = (user) => {
    const payload = {
        id: user._id,
        role: user.role,
        email: user.email
    }
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '1d'
    })

    return token;
}