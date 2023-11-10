// item.controller.ts
import { Router, Request, Response, NextFunction } from 'express';
import HTTPException from '../../exceptions/http.exception';
import ItemModel, { ItemDocument } from '../../models/item.model';
import { responseFormat } from '../../lib/reposneFormat';

class ItemController {
    public path: string = '/items';
    public route: Router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.route.get('/:itemId', this.getItem);
        this.route.put('/:itemId', this.updateItem);
        this.route.delete('/:itemId', this.deleteItem);
    }

    private getItem = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const itemId = req.params.itemId;
            const item = await ItemModel.findById(itemId);
            if (!item) {
                throw new HTTPException(404, 'Item not found');
            }
            res.send(responseFormat(item, true));
        } catch (err) {
            next(err);
        }
    };

    private updateItem = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const itemId = req.params.itemId;
            const { name, description, dueDate } = req.body;
            const item = await ItemModel.findByIdAndUpdate(
                itemId,
                { name, description, dueDate },
                { new: true }
            );
            if (!item) {
                throw new HTTPException(404, 'Item not found');
            }
            res.send(responseFormat(item, true));
        } catch (err) {
            next(err);
        }
    };

    private deleteItem = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const itemId = req.params.itemId;
            const item = await ItemModel.findByIdAndDelete(itemId);
            if (!item) {
                throw new HTTPException(404, 'Item not found');
            }
            res.send(responseFormat({ message: 'Item deleted successfully' }, true));
        } catch (err) {
            next(err);
        }
    };
}

export default ItemController;
