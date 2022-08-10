import React, { useCallback, useEffect, useState } from 'react'
import "./View.css";
import axios from "axios";



export const View = () => {
  
    const [getdata, setgetdata]=useState([])

    useEffect(()=>{
       
        axios.get('https://emailclient-b79a4-default-rtdb.firebaseio.com/client.json')
        .then((res)=>{
            let data=[]
            
            for(const key in res.data){
                console.log(res.data[key].body) 
                res.data[key].body.key=key
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


    const deletehandler= useCallback((key)=>{
        console.log(key)
        axios.delete(`https://emailclient-b79a4-default-rtdb.firebaseio.com/client/${key}.json`)
        .then((res)=>console.log(res))
        .catch((error)=>console.log(error))

    },[])


    useEffect( ()=> {
        deletehandler()
    }, [deletehandler])

  return (
    <>
    <div>
        <h1>view emails</h1>
    </div>
    <div>

        {
            getdata.map((email)=> {
                return (
                    <>  
                       <ul key={email.email} className="maillist">
                     
                       <li>{email.email}</li>
                       <li>{email.subject}</li>
                       <li>{email.body}</li> 
                       <li><button onClick={()=>deletehandler(email.key)}>delete</button></li>
                       
                       
                       </ul>
                        
                    </>
                )
            })
        }
    </div>
    
    </>
  )
}
