import App from './app';
// import UserController from './user/user.controller';
import AuthController from './features/auth/auth.controller';
import UserController from './features/user/user.controller';
import ProjectController from './features/project/project.controller';
// import KanbanBoardController from './features/board/kanban.controller';
// import ColumnController from './features/column/colums.controller';
// import ItemController from './features/item/item.controller';

const app = new App([new AuthController(), new UserController(), new ProjectController()]);
app.listen();
