import {Schema,model,Document} from 'mongoose';

interface IDocument extends Document{
  name:string;
  imageName:string;
  level:number;
  description:string;
  _doc:any;
}

const documentSchema = new Schema<IDocument>({
  name: {
    type: String,
    required: true, 
  },
  imageName: {
    type: String,
    required: true, 
  },
  level: {
    type: Number,
    required: true, 
  },
  description: {
    type: String,
    required: false, 
  }
});

// Create the Document model
const DocumentModel = model<IDocument>('Document', documentSchema);

export default DocumentModel;