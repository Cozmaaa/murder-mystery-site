import {Schema , model ,Document } from 'mongoose';



interface IUserNote extends Document{
    userId:string;
    caseLevel:number;
    content:string;
}


const userNoteSchema = new Schema<IUserNote>({

    userId:{type: String, required:true},
    caseLevel:{type:Number,required:true},
    content:{type:String,required:false},

});


const UserNote = model<IUserNote>('UserNote',userNoteSchema);

export default UserNote;