



  const mocha=require('mocha');
  const chai=require('chai');

  const functions= require('firebase-funcitons');



  const api= require('../functions/index')

  function tRegisterDriver(){
      const req = {body:{
          fullname: 'Nikki Lauda',
            email: 'nikkilauda@coolmail.com',
            password:'nikkilauda'
    }};

    const res = {
        successful: (code,url) =>{
            assert
        }
    }
  }
