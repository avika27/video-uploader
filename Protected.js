import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LOGIN_TIMEOUT = 1000;

const Protected = (props) => {
const {Component} = props;
// const navigate = useNavigate()

const tokenExpired = () => {
  const expireTime = localStorage.getItem('expiresIn')
  return new Date().getTime() > expireTime;

}


const logOut= () => {
localStorage.clear();
  if(tokenExpired()){
    console.log("user logged")
  window.location.href = '/login'
  }
}
setInterval(()=>{
  logOut()
console.log("This is triggered")}, LOGIN_TIMEOUT) 
  // if(!login) {
  //   navigate('/login')
  // }


return(
<div>
    <Component />
</div>
)

}

export default Protected;