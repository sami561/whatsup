import  mongoose from 'mongoose'
const  MessagesSchema=mongoose.Schema({
    message:String,
    name:String,
    timestamp:String,
    received:Boolean
});
export default mongoose.model('Message',MessagesSchema)