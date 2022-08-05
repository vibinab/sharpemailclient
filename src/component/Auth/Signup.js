import React, { useState } from 'react'
import "./Signup.css"
import axios from 'axios';

export const Signup = () => {

    const [data, setdata]= useState([{}])
    const [email,setemail]=useState('');
    const [password,setpassword]= useState('');
    const [confirmpassowrd, setconfirmpassword]=useState('');
    const [submiterror, setsubmiterror]=useState(false)

    const emailhandler=(event)=> {
        console.log(event)
        setemail(event.target.value)
    }

    const passwordhandler=(event)=> {
        setpassword(event.target.value)

    }

    const confirmpasswordhandler=(event)=> {
        setconfirmpassword(event.target.value)

    }

    const submithandler=(event)=> {
        event.preventDefault()

        const useremail=email
        const userpassword=password
        const  userconfirmpassword=confirmpassowrd

        if(userpassword===userconfirmpassword){

        // const userdata= {
        //     email:useremail,
        //     password:userpassword
        // }

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKqZs1cWTZWAWakWzJUYO1AeAdhKpQe6k',{
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
        .then((res)=> {
            if(res.ok){
                console.log("user registered")
            }
           else {
            res.json().then((data)=> {
                console.log(data)
                let err;
                if(data && data.error && data.errormessage){
                      err=data.error.message
                }
                throw new Error(err)
            })
        }
           
        })
        .catch((error)=>console.log(error.message))

        // const newdata=[...data,userdata]
        // setdata(newdata)
        // console.log(data)
        setemail("")
        setpassword("")
        setconfirmpassword("")
    }
    else {
         setsubmiterror(true)
    }
        
    }
  return (
    <>
        <div className='signupmainform'>
        <div className='signform'>
            <form className='signformcontent' onSubmit={submithandler}>
                <div>
             
                <input type="email" placeholder='email' onChange={emailhandler}></input>
                </div>
                <div>
                    
                    <input type="password" placeholder='password' onChange={passwordhandler}></input>
                </div>
                <div>
                   
                    <input type="password" placeholder='confirm password' onChange={confirmpasswordhandler}></input>
                </div>
                <div>
                    <button type="submit">Signup</button>
                </div>
                <div>

                    {submiterror && <p>password don;t match</p>}
                </div>
               
            </form>

        </div>
        </div>
    </>
  )
}
