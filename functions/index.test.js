

const test = require('firebase-functions-test')({
    databaseURL: 'https://taxi-boss.firebaseio.com',
    storageBucket: 'taxi-boss.appspot.com',
    projectId: 'taxi-boss',
  }, 'taxi-boss-5e70baeac9b9.json');

  const mocha=require('mocha');
  const chai=require('chai');

  const functions= require('firebase-funcitons');
  const key = functions.config().stripe.key;

  test.mockConfig({stripe: {key: 'AIzaSyDcPdaDs-ixSojbM4P_DhOO4-x05QG0_08'}});

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