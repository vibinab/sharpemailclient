export const getdataapi=()=>{
    return fetch('https://emailclient-b79a4-default-rtdb.firebaseio.com/emailclient.json').then((res)=>{
        if(res.status===200) return res.json();
        else throw new Error("invalid meess")
    })
};