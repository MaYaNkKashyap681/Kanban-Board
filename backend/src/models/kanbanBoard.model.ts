import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface KanbanBoardDocument extends Document {
  name: string;
  columns: string[]; // Adjust this based on your actual structure
  project: ObjectId; // Adjust this based on your actual structure
}

const kanbanBoardSchema: Schema<KanbanBoardDocument> = new Schema({
  name: { type: String, required: true },
  columns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Column' }],
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', unique: true },
});

const KanbanBoardModel = mongoose.model<KanbanBoardDocument>('KanbanBoard', kanbanBoardSchema);

export default KanbanBoardModel;
