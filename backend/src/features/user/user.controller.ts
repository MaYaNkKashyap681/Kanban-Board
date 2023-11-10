// auth.controller.ts
import { Router, Request, Response, NextFunction } from 'express';
import HTTPException from '../../exceptions/http.exception';
import UserModel, { UserDocument } from '../../models/user.model';
import bcrypt from 'bcryptjs';
import { responseFormat } from '../../lib/reposneFormat';
import jwt from 'jsonwebtoken';
import AuthMiddleware from '../../middlewares/auth.middleware';
import RequestWithUser from '../../globalInterfaces/user.request.interface';

class UserController {
    public path: string = '/user';
    public route: Router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.route.get(`${this.path}/:userId`, AuthMiddleware, this.getUser);
        this.route.put(`${this.path}/:userId`, AuthMiddleware ,this.updateUser);
        this.route.delete(`${this.path}/:userId`, AuthMiddleware, this.deleteUser);
    }

    private getUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.userId;

            const user = await UserModel.findById(userId);

            if (!user) {
                throw new HTTPException(404, 'User not found');
            }

            res.send(responseFormat(user, true));
        } catch (err) {
            next(err);
        }
    };

    private updateUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.userId;
            const { name } = req.body;

            const user = await UserModel.findByIdAndUpdate(userId, { name }, { new: true });

            if (!user) {
                throw new HTTPException(404, 'User not found');
            }

            res.send(responseFormat({ 'message': "Updated User Successfully" }, true));
        } catch (err) {
            next(err);
        }
    };

    private deleteUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.userId;

            const user = await UserModel.findByIdAndDelete(userId);

            if (!user) {
                throw new HTTPException(404, 'User not found');
            }

            res.send(responseFormat({ message: 'User deleted successfully' }, true));
        } catch (err) {
            next(err);
        }
    };
}

export default UserController;
