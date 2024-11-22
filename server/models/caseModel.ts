import { Schema, model, Document } from 'mongoose'

interface Case extends Document {
  name: string;
  imageName: string;
  level: number;
  description: string;
  hints: string[];
}

const caseSchema = new Schema<Case>({

  name: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  hints: {
    type: [String],

  }


})

const CaseModel = model<Case>('Case', caseSchema);

export default CaseModel;
