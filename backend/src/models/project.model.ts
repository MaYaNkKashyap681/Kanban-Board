// project.model.ts
import mongoose, { Schema, Document, ObjectId } from 'mongoose';

interface Item {
    _id?: string;
    name: string;
    description?: string;
    dueDate?: Date;
}

interface Column {
    name: string;
    items: Item[];
}

interface KanbanBoard {
    name: string;
    columns: Column[];
}

export interface ProjectDocument extends Document {
    name: string;
    description?: string;
    owner: ObjectId;
    kanbanBoard: KanbanBoard;
}

const projectSchema: Schema<ProjectDocument> = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    kanbanBoard: {
        name: { type: String, default: 'Default Board' },
        columns: [
            { name: { type: String, default: 'Todo' }, items: [{ name: String }] },
            { name: { type: String, default: 'Progress' }, items: [{ name: String }] },
            { name: { type: String, default: 'Completed' }, items: [{ name: String }] },
        ],
    },
});

const ProjectModel = mongoose.model<ProjectDocument>('Project', projectSchema);

export default ProjectModel;


/*
import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import KanbanBoardModel from './kanbanBoard.model'; // Import the KanbanBoard model

export interface ProjectDocument extends Document {
  name: string;
  description?: string;
  owner: ObjectId;
  kanbanBoard: ObjectId[]; // Adjust this based on your actual structure
}

const projectSchema: Schema<ProjectDocument> = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  kanbanBoard: [{ type: mongoose.Schema.Types.ObjectId, ref: 'KanbanBoard' }], // Reference the KanbanBoard model
});

const ProjectModel = mongoose.model<ProjectDocument>('Project', projectSchema);

export default ProjectModel;

*/