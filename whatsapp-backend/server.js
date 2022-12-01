
// importing
import express from 'express'
import  mongoose from 'mongoose'
import Messages from './Messages.js'
import Pusher from 'pusher'
import  cors from 'cors'


// app config
const app=express()
const port  =process.env.PORT || 9000
const pusher = new Pusher({
    appId: "1428205",
    key: "6378a3d606191f9db166",
    secret: "2adb81dcb9de2ad02291",
    cluster: "eu",
    useTLS: true
  });
//middleware
app.use(express.json())
app.use(cors())
// app.use((req,res,next)=>{
//     res.setHeader("Access-control-Allow-Origin",'*');
//     res.set('Access-Control-Allow-Headers',"*");
//     next();
// })
//DB config
const connection_url='mongodb+srv://samiayachi:samiayachi@whatsapp.dnfez.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(connection_url)
const  db=mongoose.connection
db.once('open',()=>{

    console.log('db connected')
    const  msgCollection=db.collection("messages");
    const  changeStream=msgCollection.watch();
    changeStream.on("change",(change)=>{
        console.log(" a change occured",change);
        if(change.operationType==='insert'){
            const messageDetails=change.fullDocument;
            pusher.trigger('messages','inserted',
            {
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
              received:messageDetails.received
            })
        }
        else{
            console.log("error triggering pusher")
        }
    })
})
//????
//api routes
app.get('/',(req,res)=>res.status(200).send('hello world'))
app.get('/message/sync',(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err)

        }
        else{
            res.status(200).send(data)
        }
    })
})
app.post('/message/new',(req,res)=>{
    const dbMessage=req.body
    Messages.create(dbMessage,(err,data)=>{
        if (err) {
            res.status(500).send(err)

            
        } else {
            res.status(201).send(data)
            
        }
    })
})
//listen
app.listen(port,()=>console.log(`listening on localhost  :${port}` ))