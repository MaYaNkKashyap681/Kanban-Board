// project.controller.ts
import { Router, Request, Response, NextFunction } from 'express';
import HTTPException from '../../exceptions/http.exception';
import ProjectModel from '../../models/project.model';
import { responseFormat } from '../../lib/reposneFormat';
import RequestWithUser from '../../globalInterfaces/user.request.interface';
import AuthMiddleware from '../../middlewares/auth.middleware';

class ProjectController {
    public path: string = '/projects';
    public route: Router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.route.get(`${this.path}`, AuthMiddleware, this.getAllProjects);
        this.route.get(`${this.path}/:projectId`, AuthMiddleware, this.getProjectById);
        this.route.post(`${this.path}`, AuthMiddleware, this.createProject);
        this.route.put(`${this.path}/:projectId`, AuthMiddleware, this.updateProject);
        this.route.delete(`${this.path}/:projectId`, AuthMiddleware, this.deleteProject);
        this.route.post(`${this.path}/:projectId/add-item/:columnIndex`, AuthMiddleware, this.addItemToColumn);

        // New Endpoints
        this.route.put(`${this.path}/:projectId/update-task/:columnIndex/:itemIndex`, AuthMiddleware, this.updateTaskName);
        this.route.delete(`${this.path}/:projectId/delete-task/:columnIndex/:itemIndex`, AuthMiddleware, this.deleteTask);
        this.route.post(`${this.path}/:projectId/move-task/:fromColumnIndex/:toColumnIndex/:itemIndex`, AuthMiddleware, this.moveTask);
    }

    private getAllProjects = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const projects = await ProjectModel.find();

            res.send(responseFormat(projects, true));
        } catch (err) {
            next(err);
        }
    };

    private getProjectById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const projectId = req.params.projectId;

            const project = await ProjectModel.findById(projectId);

            if (!project) {
                throw new HTTPException(404, 'Project not found');
            }

            res.send(responseFormat(project, true));
        } catch (err) {
            next(err);
        }
    };

    private createProject = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const { name, description } = req.body;

            const projectData = {
                name,
                description,
                owner: req.user._id,
                kanbanBoard: {
                    name: 'Default Board',
                    columns: [
                        { name: 'Todo', items: [] },
                        { name: 'Progress', items: [] },
                        { name: 'Completed', items: [] },
                    ],
                },
            };

            const project = await ProjectModel.create(projectData);

            res.send(responseFormat(project, true));
        } catch (err) {
            console.error(err);
            res.status(500).send(responseFormat('Error creating project', false));
        }
    };

    private updateProject = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const projectId = req.params.projectId;
            const { name, description } = req.body;

            const project = await ProjectModel.findByIdAndUpdate(
                projectId,
                { name, description },
                { new: true }
            );

            if (!project) {
                throw new HTTPException(404, 'Project not found');
            }

            res.send(responseFormat(project, true));
        } catch (err) {
            next(err);
        }
    };

    private deleteProject = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const projectId = req.params.projectId;

            const project = await ProjectModel.findByIdAndDelete(projectId);

            if (!project) {
                throw new HTTPException(404, 'Project not found');
            }

            res.send(responseFormat({ message: 'Project deleted successfully' }, true));
        } catch (err) {
            next(err);
        }
    };

    private addItemToColumn = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const projectId = req.params.projectId;
            const columnIndex = parseInt(req.params.columnIndex);
            const { name, description, dueDate } = req.body;

            const project = await ProjectModel.findById(projectId);

            if (!project) {
                throw new HTTPException(404, 'Project not found');
            }

            if (columnIndex < 0 || columnIndex >= project.kanbanBoard.columns.length) {
                throw new HTTPException(404, 'Column not found');
            }

            const item = { name, description, dueDate };
            project.kanbanBoard.columns[columnIndex].items.push(item);
            await project.save();

            res.send(responseFormat(item, true));
        } catch (err) {
            next(err);
        }
    };

    // New Methods

    private updateTaskName = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const projectId = req.params.projectId;
            const columnIndex = parseInt(req.params.columnIndex);
            const itemIndex = parseInt(req.params.itemIndex);
            const { name } = req.body;

            const project = await ProjectModel.findById(projectId);

            if (!project) {
                throw new HTTPException(404, 'Project not found');
            }

            if (
                columnIndex < 0 ||
                columnIndex >= project.kanbanBoard.columns.length ||
                itemIndex < 0 ||
                itemIndex >= project.kanbanBoard.columns[columnIndex].items.length
            ) {
                throw new HTTPException(404, 'Column or item not found');
            }

            project.kanbanBoard.columns[columnIndex].items[itemIndex].name = name;
            await project.save();

            res.send(responseFormat(project, true));
        } catch (err) {
            next(err);
        }
    };

    private deleteTask = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const projectId = req.params.projectId;
            const columnIndex = parseInt(req.params.columnIndex);
            const itemIndex = parseInt(req.params.itemIndex);

            const project = await ProjectModel.findById(projectId);

            if (!project) {
                throw new HTTPException(404, 'Project not found');
            }

            if (
                columnIndex < 0 ||
                columnIndex >= project.kanbanBoard.columns.length ||
                itemIndex < 0 ||
                itemIndex >= project.kanbanBoard.columns[columnIndex].items.length
            ) {
                throw new HTTPException(404, 'Column or item not found');
            }

            project.kanbanBoard.columns[columnIndex].items.splice(itemIndex, 1);
            await project.save();

            res.send(responseFormat({ message: 'Task deleted successfully' }, true));
        } catch (err) {
            next(err);
        }
    };

    private moveTask = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const projectId = req.params.projectId;
            const fromColumnIndex = parseInt(req.params.fromColumnIndex);
            const toColumnIndex = parseInt(req.params.toColumnIndex);
            const itemIndex = parseInt(req.params.itemIndex);
    
            const project = await ProjectModel.findById(projectId);
    
            if (!project) {
                throw new HTTPException(404, 'Project not found');
            }
    
            const fromColumn = project.kanbanBoard.columns[fromColumnIndex];
            const toColumn = project.kanbanBoard.columns[toColumnIndex];
    
            if (!fromColumn || !toColumn) {
                throw new HTTPException(404, 'Column not found');
            }
    
            const movedTask = fromColumn.items.splice(itemIndex, 1)[0];
    
            if (!movedTask) {
                throw new HTTPException(404, 'Task not found');
            }
    
            toColumn.items.push(movedTask);
            await project.save();
    
            res.send(responseFormat(project, true));
        } catch (err) {
            next(err);
        }
    };
}

export default ProjectController;
