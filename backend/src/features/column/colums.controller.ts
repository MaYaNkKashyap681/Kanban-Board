// column.controller.ts
import { Router, Request, Response, NextFunction } from 'express';
import HTTPException from '../../exceptions/http.exception';
import ColumnModel, { ColumnDocument } from '../../models/column.model';
import ItemModel, { ItemDocument } from '../../models/item.model';
import { responseFormat } from '../../lib/reposneFormat';

class ColumnController {
    public path: string = '/columns';
    public route: Router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.route.get('/:columnId', this.getColumn);
        this.route.get('/:columnId/items', this.getItems);
        this.route.post('/:boardId', this.addItem);
        this.route.put('/:columnId', this.updateColumn);
        this.route.delete('/:columnId', this.deleteColumn);
    }

    private getColumn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const columnId = req.params.columnId;
            const column = await ColumnModel.findById(columnId).populate('items');
            if (!column) {
                throw new HTTPException(404, 'Column not found');
            }
            res.send(responseFormat(column, true));
        } catch (err) {
            next(err);
        }
    };

    private getItems = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const columnId = req.params.columnId;
            const column = await ColumnModel.findById(columnId).populate('items');
            if (!column) {
                throw new HTTPException(404, 'Column not found');
            }
            res.send(responseFormat(column.items, true));
        } catch (err) {
            next(err);
        }
    };

    private addItem = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const columnId = req.params.columnId;
            const { name, description, dueDate } = req.body;
            const column = await ColumnModel.findById(columnId);
            if (!column) {
                throw new HTTPException(404, 'Column not found');
            }
            const itemData = {
                name,
                description,
                dueDate,
                column: columnId,
            };
            const item = await ItemModel.create(itemData);
            // Add the item to the column
            column.items.push(item._id);
            await column.save();
            res.send(responseFormat(item, true));
        } catch (err) {
            next(err);
        }
    };

    private updateColumn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const columnId = req.params.columnId;
            const { name } = req.body;
            const column = await ColumnModel.findByIdAndUpdate(columnId, { name }, { new: true });
            if (!column) {
                throw new HTTPException(404, 'Column not found');
            }
            res.send(responseFormat(column, true));
        } catch (err) {
            next(err);
        }
    };

    private deleteColumn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const columnId = req.params.columnId;
            const column = await ColumnModel.findByIdAndDelete(columnId);
            if (!column) {
                throw new HTTPException(404, 'Column not found');
            }
            res.send(responseFormat({ message: 'Column deleted successfully' }, true));
        } catch (err) {
            next(err);
        }
    };
}

export default ColumnController;
