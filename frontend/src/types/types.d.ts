type User = {
  id: string;
  name: string;
  email: string;
  pictue: string
};


type AuthUser = {
  token: string,
  email: string
}


export interface Item {
  _id?: string;
  name: string;
  description?: string;
  dueDate?: Date;
  tags?: string[]
}

export interface Column {
  name: string;
  items: Item[];
}

export interface KanbanBoard {
  name: string;
  columns: Column[];
}

export interface Project{
  _id: any,
  name: string;
  description?: string;
  owner: any;
  kanbanBoard: KanbanBoard;
}