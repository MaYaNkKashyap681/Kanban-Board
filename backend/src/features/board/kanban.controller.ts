// kanbanBoard.controller.ts
import { Router, Request, Response, NextFunction } from 'express';
import HTTPException from '../../exceptions/http.exception';
import KanbanBoardModel, { KanbanBoardDocument } from '../../models/kanbanBoard.model';
import ColumnModel, { ColumnDocument } from '../../models/column.model';
import { responseFormat } from '../../lib/reposneFormat';

class KanbanBoardController {
    public path: string = '/kanbanBoards';
    public route: Router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.route.get('/:boardId', this.getKanbanBoard);
        this.route.get('/:boardId/columns', this.getColumns);
        this.route.post('/', this.createKanbanBoard);
        this.route.put('/:boardId', this.updateKanbanBoard);
        this.route.delete('/:boardId', this.deleteKanbanBoard);
    }

    private getKanbanBoard = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const boardId = req.params.boardId;
            const kanbanBoard = await KanbanBoardModel.findById(boardId).populate('columns');
            if (!kanbanBoard) {
                throw new HTTPException(404, 'Kanban Board not found');
            }
            res.send(responseFormat(kanbanBoard, true));
        } catch (err) {
            next(err);
        }
    };

    private getColumns = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const boardId = req.params.boardId;
            const kanbanBoard = await KanbanBoardModel.findById(boardId).populate('columns');
            if (!kanbanBoard) {
                throw new HTTPException(404, 'Kanban Board not found');
            }
            res.send(responseFormat(kanbanBoard.columns, true));
        } catch (err) {
            next(err);
        }
    };

    private createKanbanBoard = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, projectId } = req.body;
            const kanbanBoardData = {
                name,
                project: projectId,
            };
            const kanbanBoard = await KanbanBoardModel.create(kanbanBoardData);

            // Create default columns for the Kanban Board
            const columnNames = ['To Do', 'In Progress', 'Completed'];
            for (const columnName of columnNames) {
                await ColumnModel.create({ name: columnName, board: kanbanBoard._id });
            }

            res.send(responseFormat(kanbanBoard, true));
        } catch (err) {
            next(err);
        }
    };

    private updateKanbanBoard = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const boardId = req.params.boardId;
            const { name } = req.body;
            const kanbanBoard = await KanbanBoardModel.findByIdAndUpdate(
                boardId,
                { name },
                { new: true }
            );
            if (!kanbanBoard) {
                throw new HTTPException(404, 'Kanban Board not found');
            }
            res.send(responseFormat(kanbanBoard, true));
        } catch (err) {
            next(err);
        }
    };

    private deleteKanbanBoard = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const boardId = req.params.boardId;
            const kanbanBoard = await KanbanBoardModel.findByIdAndDelete(boardId);
            if (!kanbanBoard) {
                throw new HTTPException(404, 'Kanban Board not found');
            }
            res.send(responseFormat({ message: 'Kanban Board deleted successfully' }, true));
        } catch (err) {
            next(err);
        }
    };
}

export default KanbanBoardController;
