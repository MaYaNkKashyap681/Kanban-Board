import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface ColumnDocument extends Document {
  name: string;
  items: string[]; // Adjust this based on your actual structure
  board: ObjectId; // Adjust this based on your actual structure
}

const columnSchema: Schema<ColumnDocument> = new Schema({
  name: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'KanbanBoard', required: true },
});

const ColumnModel = mongoose.model<ColumnDocument>('Column', columnSchema);

export default ColumnModel;
