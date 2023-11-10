// auth.controller.ts
import { Router, Request, Response, NextFunction } from 'express';
import HTTPException from '../../exceptions/http.exception';

import UserModel, { UserDocument } from '../../models/user.model';
import bcrypt from 'bcryptjs';
import { responseFormat } from '../../lib/reposneFormat';
import jwt from 'jsonwebtoken';

class AuthController {
    public path: string = '/auth';
    public route: Router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.route.post(`${this.path}/register`, this.registerUser);
        this.route.post(`${this.path}/login`, this.loginUser);
    }

    private registerUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, password } = req.body;
            const findUser = await UserModel.findOne({ email });

            if (findUser) {
                throw new HTTPException(401, 'Email already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const data = {
                name,
                email,
                password: hashedPassword,
            };
            const response = await UserModel.create(data);

            const responseData = {
                message: "User Created Successfully",
                userEmail: response.email
            }
            res.send(responseFormat(responseData, true));
        } catch (err) {
            next(err);
        }
    };

    private loginUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new HTTPException(401, 'Invalid email or password');
            }
            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '7h' });

            res.send(responseFormat({ token, email: user.email }, true));
        } catch (err) {
            next(err);
        }
    };
}

export default AuthController;
