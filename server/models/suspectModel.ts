import {Schema,model,Document} from 'mongoose';

interface ISuspect extends Document{
    name:string;
    faceImage:string;
    level:number;
    isGuilty:boolean;
    prompt:string;
}

const suspectSchema = new Schema<ISuspect>({
    name:{
        type:String,
        require:true,
    },
    faceImage:{
        type:String,
        required:true,
    },
    level:{
        type:Number,
        required:true,
    },
    isGuilty:{
        type:Boolean,
        required:true,
    },
    prompt:{
        type:String,
        required:true,
    }
})

const Suspect = model<ISuspect>('Suspect',suspectSchema);

export default Suspect;