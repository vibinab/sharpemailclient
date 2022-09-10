import React, { useState } from 'react';
// const initialtoken=localStorage.getItem('token')

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  useremail:()=>{},
  mainuseremail:""
 
});

export const AuthContextProvider = (props) => {
//   const [token, setToken] = useState(initialtoken);
const [token, setToken] = useState(null);

const[useremail, setuseremail]=useState(null)

 const mainuseremail=useremail
  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    
    localStorage.setItem('token',token)
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.setItem('token',token)
  };

  const getuseremailhandler=(useremail)=>{
    setuseremail(useremail)
  }

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    useremail:getuseremailhandler,
    mainuseremail:mainuseremail,

  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;