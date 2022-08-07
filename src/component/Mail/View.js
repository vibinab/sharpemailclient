import React, { useEffect, useState } from 'react'
import "./View.css";
import axios from "axios";



export const View = () => {
  
    const [getdata, setgetdata]=useState([])

    useEffect(()=>{
        axios.get('https://emailclient-b79a4-default-rtdb.firebaseio.com/emailclient.json')
        .then((res)=>{
            let data=[]
            
            for(const key in res.data){
                console.log(res.data[key].body)
                const parent=res.data[key].body
                data.push(parent)
               
            }
           
            console.log("data",data)
            const parsedata= data;
            setgetdata(parsedata)
            console.log("data api",getdata[0].body)
        })
        .catch((err)=>console.log(err))

    },[])

  return (
    <>
    <div>
        {
            getdata.map((email)=> {
                return (
                    <>  
                       <ul key={email.email} className="maillist">
                     
                       <li>{email.email}</li>
                       <li>{email.subject}</li>
                       <li>{email.body}</li>
                       
                       </ul>
                        
                    </>
                )
            })
        }
    </div>
    
    </>
  )
}
