import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';

const Beach = ({user}) => {
  let [beaches, setBeaches] = useState('[]');
  useEffect(()=>{
   getBeachesByUser(user);
   console.log(beaches);
  })


  //let {beachName} = useParams();
  const getBeachesByUser = (user) =>{
    //axios.get(`https://localhost:8000/api/beaches?page=1&company=${user['companyId']}&users=${user['userName']}&name=${beachName}`, {withCredentials: true})
    axios.get(`https://localhost:8000/api/beaches?page=1&isActive=true&company.id=${user.companyId}&user.id=${user.userId}`, {withCredentials: true})

    //axios.get(`https://localhost:8000/api/beaches?page=1`)
    .then(res => {
      console.log(res['data']['hydra:member'][0]['name']);
      setBeaches([...res['data']['hydra:member']]);
      //beaches = res['data']['hydra:member'][0]['name'];
      //return beaches;
      //console.log( res['data']['hydra:member'][0]['name'],res['data']['hydra:member'][0]['companyId']  );
      console.log( res['data']['hydra:member'] ); // works
      //console.log(`in Beach.js https://localhost:8000/api/beaches?page=1&company=${user.companyId}&users=${user.userName}&name=${beachName}` );
    }).catch(err => {
      console.log(err);
    })
  };


  return (
    <div>
      {/* {beaches.map((beach) => ( <h3>{beach.name}</h3>))} */}
      <h1>companyId `{user.companyId}`</h1>
      <h1>userName `{user.userName}`</h1>
      <h1>UserId `{user.userId}`</h1>

    </div>
  )
}

export default Beach