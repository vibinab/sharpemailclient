import React ,{useState} from 'react'
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import "./Mail.css"
import axios from "axios";
import { NavLink } from 'react-router-dom';
// import { json } from 'stream/consumers';

export const Mail = (props) => {
  const [useremail, setuseremail]=useState('');
  const [usersub, setusersub]=useState('');
  const [editorState, seteditorState]=useState(null)
  
   const useremailhandler=(event)=> {
    setuseremail(event.target.value)
   }

   const usersubhandler=(event)=>{
    setusersub(event.target.value)
   }
   
   const bodyhandler=(event)=> {
    seteditorState(event.target.value)
   }
  

   const submithandler=(event)=> {
    event.preventDefault();

    const data= {
        email:useremail,
        subject:usersub,
        body:editorState

    }

    console.log(data)

    axios.post('https://emailclient-b79a4-default-rtdb.firebaseio.com/client.json',{
      body:data
    })
    .then((res)=> {
      console.log(res)
    })
    .then((err)=>console.log(err))


   }


 


  return (
    <>
    <form onSubmit={submithandler}>
<label>To:<input type="email" onChange={useremailhandler} data-testid="test-input1"></input></label><br></br>
<label>subject<input type="text" onChange={usersubhandler} data-testid="test-input"></input></label><br></br>
<label>body:
<textarea onChange={bodyhandler}></textarea><br></br>
</label>

<button type="submit">send</button>
</form>

{/* <div>
  <NavLink to="/view">View email</NavLink>
</div> */}
    </>
  )
}
