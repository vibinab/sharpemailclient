import axios from 'axios';
import React, { useContext, useState } from 'react'
import "./Login.css";
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';

export const Login = () => {

  const history=useHistory()

  const[email, setemail]= useState('');
  const [password, setpassword]=useState('');
  const authctx=useContext(AuthContext)

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

     const data={
          email:useremail,
          password:userpassword
     }
     console.log(data)

      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKqZs1cWTZWAWakWzJUYO1AeAdhKpQe6k', {
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
          res.json().then((data)=> {
            let err;
            if(data && data.error.message && data.error){
               err= data.error.message
            }

            throw new Error(err)

          })
        }
      
      }
      )
      .catch((error)=>console.log(error.message))



  }

  return (
    <>

      <div className='loginformmain'>
        <div className='subformlogin'>
            <h1 style={{textAlign:"center"}}>Loginform</h1>
           <form onSubmit={submithandler}>
           <div>
            <label>email:
            <input type="email" onChange={emailhandler} name="email"></input>
            
            </label>
            
            
            </div>
            <div>
            <label>password:
            <input type="password" onChange={passwordhandler} name="pass"></input>
            
            </label>
          
         
            </div>

            <div>
              <button type="submit">loginbtn</button>
            </div>
           </form>

        </div>
      </div>
    </>
  )
}
