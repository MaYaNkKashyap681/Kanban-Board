import express = require('express');
import { Request, Response } from 'express';
import Controller from 'globalInterfaces/controller.interface';
import { errorMiddleware } from './middlewares/error.middleware';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();

class App {
    //express App
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.connectDb();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeErrorHandling() {
        this.app.use("/", errorMiddleware);
    }

    public listen() {
        this.app.listen(8000, () => {
            console.log("Server is Strted on PORT 3000");
        });
    }

    private initializeMiddleware() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.get('/', (req: Request, res: Response) => {
            res.send("Hello Server is Active");
        })
    }

    public getServer() {
        return this.app;
    }

    public initializeControllers(controllersList: Controller[]) {
        controllersList.map((item, index) => {
            this.app.use('/', item.route);
        })
    }

    private async connectDb() {
        mongoose.connect(process.env.DATABASE_URL).then(() => {
            console.log("Database Connected");
        });
    }
}

export default App;