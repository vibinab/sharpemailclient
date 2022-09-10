import React, { useCallback, useEffect, useState } from 'react'
import "./View.css";
import axios from "axios";
import { ViewItem } from './ViewItem';
import { NavLink } from 'react-router-dom';

const liststyle={
    backgroundColor:"yellow"
}

const viewedliststyle={
    backgroundColor:"green"
}


export const View = (props) => {
    // console.log("viewemail",props.checkmainuser)
    let checkmainuser=props.checkmainuser
  
    const [getdata, setgetdata]=useState([])
    const [viewemail, setviewemail]=useState([])
    const [total, settotal]=useState(0);
    const [read,setread]=useState(0)

    const[isviewed, setisviewd]=useState(false)

    const viewhandler=(email)=>{
        setisviewd(true)
    
    setviewemail([...viewemail, email])
    setread(viewemail.length)

    }
   

    

    const readmail= viewemail.length
   
  
    // console.log("count",filtermainuser.length)
    // const count=filtermainuser.length
    // const get=()=>{
    //     axios.get('https://sharpemailclientproject-default-rtdb.firebaseio.com/client.json')
    //     .then((res)=>{
    //         let data=[]
            
    //         for(const key in res.data){
    //             console.log(res.data[key].body) 
    //             res.data[key].body.key=key
    //             const parent=res.data[key].body
    //             data.push(parent)
               
    //         }
           
    //         console.log("data",data)
    //         const parsedata= data;
    //         setgetdata(parsedata)
    //         console.log("data api",getdata[0].body)
    //     })
    //     .catch((err)=>console.log(err))

    // }


    const get=()=>{
        axios.get('https://mailclient-6a8c1-default-rtdb.firebaseio.com/client.json')
        .then((res)=>{
            let data=[]
            
            for(const key in res.data){
                // console.log(res.data[key].body) 
                res.data[key].body.key=key
                const parent=res.data[key].body
                data.push(parent)
               
            }
           
            // console.log("data",data)
            const parsedata= data;
            setgetdata(parsedata)
            // console.log("data api",getdata[0].body)
        })
        .catch((err)=>console.log(err))

    }


    
    useEffect(()=>{
        get()
    //    settotal(filtermainuser.length)
        // axios.get('https://emailclient-b79a4-default-rtdb.firebaseio.com/client.json')
        // .then((res)=>{
        //     let data=[]
            
        //     for(const key in res.data){
        //         console.log(res.data[key].body) 
        //         res.data[key].body.key=key
        //         const parent=res.data[key].body
        //         data.push(parent)
               
        //     }
           
        //     console.log("data",data)
        //     const parsedata= data;
        //     setgetdata(parsedata)
        //     console.log("data api",getdata[0].body)
        // })
        // .catch((err)=>console.log(err))

    },[getdata])

    


    // const deletehandler= (key)=>{
    //     console.log(key)
    //     axios.delete(`https://sharpemailclientproject-default-rtdb.firebaseio.com/client/${key}.json`)
    //     .then((res)=>console.log(res))
    //     .catch((error)=>console.log(error))

    // }

    const deletehandler= (key)=>{
        // console.log(key)
        axios.delete(`https://mailclient-6a8c1-default-rtdb.firebaseio.com/client/${key}.json`)
        .then((res)=>console.log(res))
        .catch((error)=>console.log(error))

    }


    // useEffect( ()=> {
    //     deletehandler()
    // }, [deletehandler])
  
    
     
    const filtermainuser= getdata.filter((mainuser)=> {
        return  mainuser.mainemail==checkmainuser
    })

    // console.log("count",filtermainuser.length)
    const count=filtermainuser.length
    
    let commom= filtermainuser.filter((item)=> {
        return viewemail.includes(item)
    })
    // console.log(commom)
    let commonlength=commom.length

    console.log("viewsssssss",viewemail)
    // console.log("filterssssssssss", filtermainuser)
     
  const countunread= filtermainuser.filter((item)=> {
    return  !viewemail.includes(item.email) 
  })

  const countread= filtermainuser.filter((item)=> {
    return  viewemail.includes(item.email)
  })

    
//     console.log("filter", filtermainuser)
// console.log("unreddddddddddddddddddd",countunread)
let countunreadlength= countunread.length
console.log("uncount number", countunreadlength)
// let countreadlength= countread.length
  
  return (
    <>
    <div>
    <h1>
    <NavLink to="/mail">Compose</NavLink>
    </h1>
   

    </div>

    <div>
        <h1>sended emails</h1>
    </div>
    <div>

        {
            filtermainuser.map((email)=> {
                return (
                    <>  
                    <ViewItem 
                    key={email.key}
                    keyss={email.key}
                    email={email.email}
                    subject={email.subject}
                    body={email.body}
                    ondeletehandler={deletehandler}
                    onviewhandler={viewhandler}
                    isdisable={email.isdisable}
                    changedot={email.changedot}
                    mainusermail={checkmainuser}


                    />
                    {/* <div >
                       <ul key={email.email} className="maillist">
                     
                       <li>{email.email}</li>
                       <li>{email.subject}</li>
                       <li>{email.body}</li> 
                       <li><button onClick={()=>deletehandler(email.key)}>delete</button></li>
                       <li><button disabled={isviewed} onClick={()=>viewhandler(email.email)}>viewd</button></li>
                    
                       
                       
                       </ul>
                     </div>    */}
                    </>
                )
            })
        }
    </div>
    <div>
       {/* <h1>total:{count}</h1> */}
       <h1>total {count}</h1>
    </div>

    <div>
        {/* <h4>total viewed mail {readmail}</h4> */}
        <h4>total unviewed mail {countunreadlength}</h4>
        <h4>recently  viewed email</h4>
        {
            viewemail.map((e)=>{
                return (
                    <>
                        <ul>
                            <li>{e}</li>
                        </ul>
                    </>

                )
            })
        }

    </div>
    
    </>
  )
}
