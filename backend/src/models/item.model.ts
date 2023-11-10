import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface ItemDocument extends Document {
  name: string;
  description?: string;
  dueDate?: Date;
  column: ObjectId; // Adjust this based on your actual structure
}

const itemSchema: Schema<ItemDocument> = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  column: { type: mongoose.Schema.Types.ObjectId, ref: 'Column', required: true },
});

const ItemModel = mongoose.model<ItemDocument>('Item', itemSchema);

export default ItemModel;
