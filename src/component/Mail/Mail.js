import React ,{useContext, useEffect, useState} from 'react'
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import "./Mail.css"
import axios from "axios";
import { NavLink, useHistory } from 'react-router-dom';
// import { json } from 'stream/consumers';
import AuthContext from '../../store/auth-context';


export const Mail = (props) => {
  const history =useHistory()
  const [getdata, setgetdata]=useState([])
  const [useremail, setuseremail]=useState('');
  const [usersub, setusersub]=useState('');
  const [editorState, seteditorState]=useState(null)
  const authemail=useContext(AuthContext)
  console.log("useremailsss",props.mainuser)
  const mainuseremail=props.mainuser
  
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
        mainemail:mainuseremail,
        email:useremail,
        subject:usersub,
        body:editorState,
        isdisable:false,
        changedot:"viewitem"

    }

    console.log(data)

    // axios.post('https://sharpemailclientproject-default-rtdb.firebaseio.com/client.json',{
    //   body:data
    // })
    // .then((res)=> {
    //   console.log(res)
    //   history.replace('/view')
    // })
    // .then((err)=>console.log(err))

    axios.post('https://mailclient-6a8c1-default-rtdb.firebaseio.com/client.json',{
      body:data
    })
    .then((res)=> {
      console.log(res)
      history.replace('/view')
    })
    .catch((err)=>console.log(err))



   }
   
  //  const get=()=>{
  //   axios.get('https://sharpemailclientproject-default-rtdb.firebaseio.com/client.json')
  //   .then((res)=>{
  //       let data=[]
        
  //       for(const key in res.data){
  //           console.log(res.data[key].body) 
  //           res.data[key].body.key=key
  //           const parent=res.data[key].body
  //           data.push(parent)
           
  //       }
       
  //       console.log("data",data)
  //       const parsedata= data;
  //       setgetdata(parsedata)
  //       console.log("data api",getdata[0].body)
  //   })
  //   .catch((err)=>console.log(err))

  const get=()=>{
      axios.get('https://mailclient-6a8c1-default-rtdb.firebaseio.com/client.json')
      .then((res)=>{
          let data=[]
          
          for(const key in res.data){
              console.log("body",res.data[key].body) 
              res.data[key].body.key=key
              const parent=res.data[key].body
              data.push(parent)
             
          }
         
          console.log("data sssss",data)
          const parsedata= data;
          setgetdata(parsedata)
          // console.log("data api",getdata[0].body)
      })
      .catch((err)=>console.log(err))

}

useEffect(()=> {
  get()
}, [getdata])

const filterrec= getdata.filter((item)=>{
  return item.email===props.mainuser
})
 
console.log("filter datassssss",filterrec)


  return (
    <>
    <h1>welocme to email box</h1>
    <form onSubmit={submithandler}>
<label>To:<input type="email" onChange={useremailhandler} data-testid="test-input1"></input></label><br></br>
<label>subject<input type="text" onChange={usersubhandler} data-testid="test-input"></input></label><br></br>
<label>body:
<textarea onChange={bodyhandler}></textarea><br></br>
</label>

<button type="submit">send</button>
</form>

<div>
  <NavLink to="/view">send box</NavLink>
</div>
<div>
<h1>inbox</h1>
</div>
<div>
  {
    filterrec.map((email)=>{
      return (
        <>
         <div>
          <ul>
            <li>{email.email}</li>
            <li>{email.subject}</li>
            <li>{email.body}</li>
          </ul>
         </div>

        </>
      )
    })
  }
</div>

    </>
  )
}
