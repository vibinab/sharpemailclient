import axios from 'axios'
import React, { useState } from 'react'
import "./ViewItem.css"

export const ViewItem = (props) => {
  console.log("keysssss",props.keyss)
  console.log("key", props.key)



    const [color, setcolor]=useState("white")

    const [isdisable, setisdisbale]=useState(false)
    const [changedot, setchangedot]=useState("viewitem")

    const deletehandler=()=> {
        props.ondeletehandler(props.keyss)
    }
    let isdisablecheck="false";
    let changedotcheck="viewitem"
    const viewhandler=()=> {
        props.onviewhandler(props.email)
      
        setcolor("blue")
        setchangedot("already")
        setisdisbale(true)
        isdisablecheck="true"
        changedotcheck="already"
       updateitem()
       
    }
    const  updateitem=()=>{
      // console.log(key)
console.log("update")
      const data={
        body:props.body,
        email:props.email,
        isdisable:isdisablecheck,
        changedot:changedotcheck,
        
        mainemail:props.mainuseremail,
        subject:props.subject

      }

      console.log("updated data", data)
      axios.put(`https://mailclient-6a8c1-default-rtdb.firebaseio.com/client/${props.keyss}.json`,data)
      .then((res)=>console.log(res))
      .catch((error)=>console.log(error))

  }
   
    // const data= changedot
    // const data=changedot
    const data=changedot
  return (
    <>
    <div>
    <ul style={{display:"flex"}} className={data}>
       <li className='first'>
       <span>{props.subject}</span>
      
       </li>
    
       <button disabled={isdisable} onClick={viewhandler} className="btn"> {props.body}</button>
       <button
       onClick={deletehandler}>delete</button>
       {/* <button disabled={isdisable} style={{color:color}}onClick={viewhandler}>viewed */}
       {/* </button> */}

    </ul>

    </div>
        
    </>
  )
}
