import axios from 'axios';
import React, { useContext, useState } from 'react'
import "./Login.css";
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
import { NavLink } from "react-router-dom";

export const Login = (props) => {

  const history=useHistory()

  const[email, setemail]= useState('');
  const [password, setpassword]=useState('');
  const authctx=useContext(AuthContext)
  const[iserror, setiserror]=useState(false)
  const[errormesg,seterrormsg]=useState("")

  const emailhandler=(event)=> {
    setemail(event.target.value)

  }

  const passwordhandler=(event)=>{
    setpassword(event.target.value)
  }

  const submithandler=(event)=> {
     event.preventDefault();
     const useremail=email
     const userpassword=password
     props.onmainuserhandler(useremail)

     const data={
          email:useremail,
          password:userpassword
     }
     console.log(data)

      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBii3N5oNv2Wy74_8AU8s16ZB4JJ2kYj7w', {
          method:'POST',
          body:JSON.stringify({
            email:useremail,
            password:userpassword,
            returnSecureToken:true
          }),
          headers: {
            'Content-Type':'application/json'
           }
      })
      .then( (res)=>{
        if(res.ok){
          console.log("sucess")
         res.json().then((res)=> {
          console.log(res)
          authctx.login(data.idToken)
          
          history.replace('mail')
         })
        }
        else {
          setiserror(true)
          res.json().then((data)=> {
            let err;
            if(data && data.error.message && data.error){
               err= data.error.message
            }
            console.log("login err",err)
            seterrormsg(err)

            throw new Error(err)

          })
        }
      
      }
      )
      .catch((error)=>{
        
        console.log(error.message)
        seterrormsg(error.message)
      })



  }

  return (
    <>

      <div className='loginformmain'>
        <div className='subformlogin'>
            <h1 style={{textAlign:"center"}}>Loginform</h1>
           <form onSubmit={submithandler}>
           <div>
            <label>email:
            <input type="email" onChange={emailhandler} name="email" required></input>
            
            </label>
            
            
            </div>
            <div>
            <label>password:
            <input type="password" onChange={passwordhandler} name="pass" required></input>
            
            </label>
          
         
            </div>

            <div>
              <button type="submit">loginbtn</button>
            </div>
            
           </form>

        </div>
        <div>
      <p>{ iserror && <span>{errormesg}</span>}</p>

      </div>
      </div>
     
      <div style={{textAlign:"center"}}>
      <h6>if user exist, signup</h6>
<NavLink to="/">signup</NavLink>
      </div>
     
    </>
  )
}
