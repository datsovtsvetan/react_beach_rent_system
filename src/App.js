//import React, { Component }  from 'react';
import {BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import React from 'react';
import {useEffect, useState} from 'react';
import Header from './components/Header';
import Home from './components/Home';
import axios from 'axios';
import Beach from './components/Beach';
import About from './components/About';
import LoginForm from './components/LoginForm';
import ErrorPage from './components/ErrorPage';
import Button from './components/Button';

function App() {

  const [user, setUser] = useState( {roles: ['default'],
    companyId: "0",
    userId: "default",
    userName: "default", 
    companyName: "default" });
  // let userCompanyId = user.companyId;
  // let userUserId = user.userId;
  // let userUserName = user.userName;
  // let userRoles = user.roles;


    const [error, setError] = useState("");

  const Login = (details) => {

    refresh();

    authenticate(details)
    .then( res => {
      //console.log(res.data);
      setUser( (user) =>  { return {...user, companyId: res.data.companyId, userId: res.data.userId, userName: res.data.userName, companyName: res.data.companyName, roles: res.data.roles }})
    });
    //console.log(user);
    // if(details.username == user.userName){
    //   console.log("you are logged in");
    // } else {
    //   console.log('you are not logged in');
    // }
    // console.log(details);
    // console.log(user);
  };

  const showUser = () => {console.log(user)};

  const Logout = () => {
    console.log(user);
  };
  // let roles;
  // let companyId;
  // let companyName;
  // let userId;
  // let userName;
  axios.defaults.withCredentials = true;


  // const refreshToken = (refresh) => {
  //   axios.post(`https://localhost:8000/api/token/refresh`, {refresh_token: refresh}, { headers: {'Content-Type': 'application/json'}})
  //   .then(res => { 
  //     token = `BEARER ${res.data.token}`;
  //     }).catch(err => {
  //       console.log(err);
  //     })
  // }

  // const authenticate = (details) => {
//console.log( typeof token !== undefined ? token : 'not true')
    // if(!companyId){
    //   console.log('companyId doesnt exists, refresh token!');
    //   refresh();

    // }


    //const credentials = { username: 'test@test.com', password: 'test' };

    // axios.post(`https://localhost:8000/api/login_check`, details, { headers: {'Content-Type': 'application/json'}})

    // //axios.post(`https://localhost:8000/api/login_check`, credentials, { headers: {'Content-Type': 'application/json'}})
    // .then(res => {
     //console.log(res.data.companyName);
      //refresh = res.data.refresh_token;
      //token = `BEARER ${res.data.token}`; //comment for test http only cookie, uncoment otherwise !!!
      // roles = res.data.roles;
      // companyId = res.data.companyId;
      // userId = res.data.userId;
      // userName = res.data.userName;
     //let data = res.data;
      // setUser( user =>  {
      //   return {...user, 
      //   roles: res.data.roles,
      //   companyId:res.data.companyId,
      //   companyName: user.companyName,
      //   userId:res.data.userId,
      //   userName: res.data.userName
      //          }
      // });

    async function authenticate(details) {
      //console.log(details);
      try {
        let res = await axios.post(`https://localhost:8000/api/login_check`, details, { headers: {'Content-Type': 'application/json'}});
            // if(res.status == 200){
            //     // test for status you want, etc
        //console.log(res.status)
            // }    
            // Don't forget to return something   
        return res;
        }
      catch (err) {
            console.error(err);
        }
    }
   

  const  getBeaches = (companyId) => {
    //axios.get(`https://localhost:8000/api/beaches?page=1`, { headers: { "Authorization": token }})
    axios.get(`https://localhost:8000/api/beaches?page=1&company=${companyId}`, {withCredentials: true})
    //axios.get(`https://localhost:8000/api/beaches?page=1`)
    .then(res => {
     
      console.log( res['data']['hydra:member'][0]['name'],res['data']['hydra:member'][0]['companyId']  );
      console.log( res['data']['hydra:member'] ); // works
    }).catch(err => {
      console.log(err);
    })
  }

  const  refresh = () => {
  
    axios.get(`https://localhost:8000/api/token/refresh`, {withCredentials: true})
    .then(res => {
     
      console.log('in refresh token func');
    
    }).catch(err => {
      console.log(err);
    })
  }



  
  // useEffect(() => {

  //   authenticate();
  //   //authenticate(getBeaches(companyId));
  //   //setInterval(authenticateAndThen(getBeaches), 2000, companyId);

  // }, [])

  return (
    <div className="App">
      {(user.userName !== "default" ? (
        <div className='Welcome'>
          {/* <h2>Welcome, <span>{user.userName}</span></h2> */}
          {/* <Beach user={user} /> */}
          <Beach user={user}/>
        </div>
      ) : (
        <LoginForm Login={Login} error ={error} />
      ) )}

    </div>
  )

    // return  (

    // //<Router>
    //   <Routes>
    //     <Route path="/" element={<Home/>}/>
    //     <Route path="beach/:beachName" element={<Beach user={user}/>}/>
    //     <Route path="about" element={<About/>}/>
    //     <Route path="*" element={<ErrorPage/>}/>
    //   </Routes>
    // //</Router>
    // )
  
}

export default App;
