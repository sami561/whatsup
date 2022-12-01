
import { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './sidebar';
import Pusher from 'pusher-js'
import axios from './axios'
function App() {
  const [messages,setMessages]=useState([]);

  
  useEffect(()=>{
    axios.get('/message/sync').then((response)=>{
      
      setMessages(response.data)
    })
  
  
   },[])

  useEffect(()=>{
    
    const pusher = new Pusher('6378a3d606191f9db166', {
       cluster: 'eu'
     });
     
   const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data)=> {
      // alert(JSON.stringify(data));
      setMessages([...messages,data])
    });
   return()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
 
   },[messages])
   console.log(messages)
  return (
 
    <div className='app'>
      <div className='app__body'><Sidebar />
 <Chat messages={messages} /></div>
 
    </div>
  );
}

export default App;
