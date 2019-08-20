const functions = require('firebase-functions');
//import * as functions from 'firebase-functions';
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//Initialise app
const admin = require('firebase-admin');

//process.env.GCLOUD_PROJECT = 'taxi-boss';
//admin.initializeApp({
//    credential: admin.credential.applicationDefault()
//});



//Initialize functions
admin.initializeApp(functions.config().firebase);
//admin.initializeApp();
let db = admin.firestore();
//db= admin.firestore();



//Initialize app Service Account
//let serviceAccount= require('https://taxiboss.azurewebsites.net/Taxi_Boss-6784cc3930bc.json');
//admin.initializeApp(functions.config().firebase,
//{
//    credential: admin.credential.cert(serviceAccount)
//});

//Now we copy everything



const express= require('express');
const cors= require('cors')({
    origin: true,
});


db = admin.firestore();

const app= express();

//app.use(cors({origin: true}));


//This function receives a monitor who wants to register his user account's
//email address and password and adds it to the database. A JSON containing the
//newly added data is returned.
//If a duplicate account is attempted to be registered,
//a JSON containing status: 'Email already registered' is returned
exports.registerMonitor = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('registerMonitor triggered');
    return cors(req, res, () => {

        /*let data= {
            name: req.query.fullName,
            email: req.query.email,
            pass: req.query.password
        };*/


        let data={
            name: req.body.fullName,
            email: req.body.email,
            password: req.body.password
        };

        
        //let exists=false;
        monitor= db.collection('Monitor')
        .where('email','==',data.email)
        .get()
        .then(snapshot=> {
            if (!snapshot.empty){
                res.setHeader('Content-Type', 'application/json');
                return res.status(200).send({status: 'Email already registered'});
            }
            return;
        })
            
        /*if (exists==true)
        {
           
        }*/

        return addDoc= db.collection('Monitor').add(data)
        .then( ref=> {
            
            console.log('Account with email '+data.email+' has been registered. ID: ', ref.id);
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(data);
        });

        
    })
})

//This endpoint takes an email address and password as parameters
//and tests the combination in the database. If a match is found,
//It responds with response code 200 (in all cases) and a JSON object
//containing status: success. If no match is found for the email address
// it responds with
//a JSON object containing status: 'Account not found'.
//If an email does not match it will return a JSON object
//containg status: 'Incorrect password'.

exports.loginMonitor = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('loginMonitor triggered');
    return cors(req, res, () => {

        /*let data= {
            //name: req.query.fullName,
            email: req.query.email,
            password: req.query.password
        };*/


        let data={
            email: req.body.email,
            password: req.body.password
        };

        return monitor= db.collection('Monitor')
        .where('email','==',data.email)
        .get()
        .then(snapshot=> {
            if (snapshot.empty){
                res.setHeader('Content-Type', 'application/json');
                return res.status(500).send({status: 'Account not found'});
            }

            let correct=false;
            let name;
            
            snapshot.forEach(doc => {
                if (doc.data().password == data.password)
                {
                   correct=true;
                   name=doc.data().name;
                }
            })
            
            if (correct == true)
            {
                res.setHeader('Content-Type', 'application/json');
                return res.status(200).send({data:{
                    name: name,
                    token: name,
                    email: data.email
                }});
            }
            else{
                res.setHeader('Content-Type', 'application/json');
                return res.status(500).send({status: 'Incorrect password'});
            }
 

        });
        
    })
})

//This endpoint returns a JSON object containing all of the drivers
//associated with the requested monitor by finding the correct email
//address associated with a monitor.


exports.listOfDrivers = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('listOfDrivers triggered');
    return cors(req, res, () => {

        /*let data= {
            //name: req.query.fullName,
            email: req.query.email,
            //password: req.query.password
        };*/


        let data={
            email: req.body.email
        };

        return driverList= db.collection('Taxi Driver')
        .where('monitorEmail','==',data.email)
        .get()
        .then(snapshot=> {
            
            let ret=[];
            snapshot.forEach(doc => {
                ret.push({
                    name: doc.data().name,
                    cellNumber: doc.data().cellNumber,
                    email: doc.data().email,
                    numberPlate: doc.data().numberPlate
                })
            })
            

            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(ret);

        });
        
    })
})


//This endpoint adds a driver with the required credentials
//to the database. Duplicate number plates are not allowed.
//If a duplicate is attempted to be added, a JSON containing
//{status: 'Number plate already registered'} is returned.
//Otherwise, a JSON containing {status: 'success'} is returned.

exports.addDriver = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('addDriver triggered');
    return cors(req, res, () => {

        /*let data={
            cellNumber: req.query.cellNumber,
            email: req.query.email,
            monitorEmail: req.query.monitorEmail,
            password: req.query.password,
            name: req.query.name,
            numberPlate: req.query.numberPlate

        };*/


        let data={
            cellNumber: req.body.cellNumber,
            email: req.body.email,
            monitorEmail: req.body.monitorEmail,
            password: req.body.password,
            name: req.body.name,
            numberPlate: req.body.numberPlate

        };

        
        let exists=false;
        return driver= db.collection('Taxi Driver')
        .where('numberPlate','==',data.numberPlate)
        .get()
        .then(snapshot=> {
            if (!snapshot.empty){
                exists= true;
                res.setHeader('Content-Type', 'application/json');
                return res.status(200).send({status: 'Number plate already registered'});
            }
            return;
        })
        .then( () => {

            if (exists)
            {
                return;
            }

            return addDoc= db.collection('Taxi Driver').add(data)
            .then( ref=> {
                
                console.log('Driver with plate '+data.numberPlate+' has been registered. ID: ', ref.id);
                res.setHeader('Content-Type', 'application/json');
                return res.status(200).send({status: 'success'});
            });
        })    
        /*if (exists==true)
        {
           
        }*/



        
    })
})



//This endpoint takes in a monitor email and returns all
//violations committed by his/her drivers (as many violations as firebase can provide at once).
//Return type is a JSON object.
//If there are any errors, a JSON containing status: 'No data' will be returned

exports.allViolations = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('allViolations triggered');
    return cors(req, res, () => {



        

        /*var date=new Date();
        var dateString=date.toISOString();
        var dateOnly=dateString.slice(0,10);
        console.log(dateOnly);
        var monthNum=dateOnly.slice(6,8);
        var lastMonth;
        if (monthNum==01)
        {
            lastMonth=12;
        }
        else
        {
            lastMonth=monthNum-1;
        }

        */



            let data= {
                //name: req.query.fullName,
                email: req.query.email,
                //password: req.query.password
            };
    
    
            /*let data={
                email: req.body.email
            };*/

            let violations=[];

            

                db.collection('Taxi Driver')
                .where('monitorEmail','==',data.email)
                .get()
                .then(snapshot=> {
                    
                    let plateList=[];
                    

                    snapshot.forEach(doc => {
                        plateList.push({
                            numberPlate: doc.data().numberPlate
                        })
                    })
                    console.log(plateList);

                    return plateList;
                })
                .then((plateList)=> {

                    async function getViolationsByPlate(ob) 
                    {
                        db.collection('Violations')
                        .where('numberPlate','==',ob.numberPlate)
                        .get()
                        .then ((snapshot) => 
                        {
                            console.log(snapshot);
                            if (!snapshot.empty)
                            {
                                console.log('Snapshot not empty');
                                snapshot.forEach(doc=>{
                                    console.log(doc.data());
                                    violations.push({
                                        city: doc.data().city,
                                        date: doc.data().date,
                                        numberPlate: doc.data().numberPlate,
                                        province: doc.data().province,
                                        street: doc.data().street,
                                        time: doc.data().time,
                                        violationDescription: doc.data().violationDescription,
                                        violationOrigin: doc.data().violationOrigin
                                    });//push
                                });//forEach violation
                                return;
                            }
                            else
                            {
                                console.log('Snapshot empty');
                                reject({status: 'No violations found'});
                            }
                        });

                    }

                    console.log(plateList);
                    async function getByPlateLoop(plateList){

                        
                    
                        for (let ob of plateList)
                        {
                            await getViolationsByPlate(ob);
                            return;
                        }
                        
                    }

                    
                    return getByPlateLoop(plateList);

                })//.then after got plates
                .then((violations)=>{
                    res.setHeader('Content-Type', 'application/json');
                    return res.status(200).send(violations);            
                })
                .catch((err) => {
                    res.setHeader('Content-Type', 'application/json');
                    return res.status(500).send(err);      
                });
            
        


    });//cors

})//onRequest



//This function takes a number plate as parameter and returns all
//violations reported on that number plate. Response Code 200
//returns a JSON array that contains violation objects. 

exports.allViolationsByPlate = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('allViolationsByPlate triggered');
    return cors(req, res, () => {

        /*let data= {
            //name: req.query.fullName,
            numberPlate: req.query.numberPlate
            //password: req.query.password
        };*/


        let data={
            numberPlate: req.body.numberPlate
        };

        return driverList= db.collection('Violations')
        .where('numberPlate','==',data.numberPlate)
        .get()
        .then(snapshot=> {
            
            let ret=[];
            snapshot.forEach(doc => {
                ret.push({
                    city: doc.data().city,
                    date: doc.data().date,
                    numberPlate: doc.data().numberPlate,
                    province: doc.data().province,
                    street: doc.data().street,
                    time: doc.data().time,
                    violationDescription: doc.data().violationDescription
                })
            })
            

            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(ret);

        })
        
    })
})



//This function takes as parameters a number plate
//and password. It checks for the combination and returns
// a JSON object. It returns either status 200: 'success'
//or status 500: 'Account not found' or status 500: 
//'Incorrect password'.


exports.loginDriver = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('loginDriver triggered');
    return cors(req, res, () => {

        let data= {
            //name: req.query.fullName,
            numberPlate: req.query.numberPlate,
            password: req.query.password
        };


        /*let data={
            email: req.body.email,
            password: req.body.password
        };*/

        return monitor= db.collection('Taxi Driver')
        .where('numberPlate','==',data.numberPlate)
        .get()
        .then(snapshot=> {
            if (snapshot.empty){
                res.setHeader('Content-Type', 'application/json');
                return res.status(500).send({status: 'Account not found'});
            }

            let correct=false;
            
            snapshot.forEach(doc => {
                if (doc.data().password == data.password)
                {
                   correct=true;
                }
            })
            
            if (correct == true)
            {
                res.setHeader('Content-Type', 'application/json');
                return res.status(200).send({status: 'success'});
            }
            else{
                res.setHeader('Content-Type', 'application/json');
                return res.status(500).send({status: 'Incorrect password'});
            }
 

        });
        
    })
})



//This function takes no parameters
//Return -> {numUSSD:x}

exports.numUSSD = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('numUSSD triggered');
    return cors(req, res, () => {

        /*let data= {
            //name: req.query.fullName,
            email: req.query.email,
            //password: req.query.password
        };*/



        return numUSSD= db.collection('DetailedViolations')
        .where('violationOrigin','==','USSD')
        .get()
        .then(snapshot=> {
            
            let arr=[];
            snapshot.forEach(doc =>{
                arr.push({rec: doc.data().violationOrigin});
            })
            ret=arr.length;
            console.log("Items returned: "+ret);
            

            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send({numUSSD: ret});

        });
        
    })
})



//This function takes no parameters
//Return -> {numWEB:x}

exports.numWEB = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('numWEB triggered');
    return cors(req, res, () => {

        /*let data= {
            //name: req.query.fullName,
            email: req.query.email,
            //password: req.query.password
        };*/



        return numUSSD= db.collection('DetailedViolations')
        .where('violationOrigin','==','WEB')
        .get()
        .then(snapshot=> {
            
            let arr=[];
            snapshot.forEach(doc =>{
                arr.push({rec: doc.data().violationOrigin});
            })
            ret=arr.length;
            console.log("Items returned: "+ret);
            

            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send({numWEB: ret});

        });
        
    })
})



//This function takes no parameters
//Return is each unique city with an associated count
//Return -> [{"city":city, numViolations: x},...]

exports.violationsByCity = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('violationsByCity triggered');
    return cors(req, res, () => {

        /*let data= {
            //name: req.query.fullName,
            email: req.query.email,
            //password: req.query.password
        };*/



        return this.violationsByCity= db.collection('DetailedViolations')
        .get()
        .then(snapshot=> {
            
            let arr=[];
            snapshot.forEach(doc =>{
                arr.push(doc.data().city);
            })
            let cities= [];
            let count=[];
            arr.forEach((city)=>{
                if (cities.includes(city))
                {
                    count[cities.indexOf(city)]++;
                }
                else
                {
                    cities.push(city);
                    count[cities.indexOf(city)]=1;
                }
            })

            let ret=[];
            cities.forEach((city,index)=>{
                ret.push({"city":city, numViolations: count[index]});
            })
            
            console.log("Items returned: "+ret);
            

            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(ret);

        });
        
    })
})


//This function takes no parameters
//Return is each unique province with an associated count
//Return -> [{"province":province, numViolations: x},...]


exports.violationsByProvince = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('violationsByProvince triggered');
    return cors(req, res, () => {

        /*let data= {
            //name: req.query.fullName,
            email: req.query.email,
            //password: req.query.password
        };*/



        return this.violationsByProvince= db.collection('DetailedViolations')
        .get()
        .then(snapshot=> {
            
            let arr=[];
            snapshot.forEach(doc =>{
                arr.push(doc.data().province);
            })
            let provinces= [];
            let count=[];
            arr.forEach((province)=>{
                if (provinces.includes(province))
                {
                    count[provinces.indexOf(province)]++;
                }
                else
                {
                    provinces.push(province);
                    count[provinces.indexOf(province)]=1;
                }
            })

            let ret=[];
            provinces.forEach((province,index)=>{
                ret.push({"province":province, numViolations: count[index]});
            })
            
            console.log("Items returned: "+ret);
            

            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(ret);

        });
        
    })
})

//This function takes a String month parameter (01 for January)
//Which indicates the month
/*Return ->[{
    city: city,
    date: date,
    latitude: latitude,
    longitude: longitude,
    numberPlate: numberPlate,
    province: province,
    reportDate: reportDate,
    reportTime: reportTime,
    street: street,
    time: time,
    violationDescription: violationDescription,
    violationOrigin: violationOrigin
},...]*/

exports.violationsByMonth = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('violationsByMonth triggered');
    return cors(req, res, () => {

        //let data= {
            //name: req.query.fullName,
          //  month: req.query.month
            //password: req.query.password
        //};


        let data={
            month: req.body.month
        };

        return violationList= db.collection('DetailedViolations')
        .get()
        .then(snapshot=> {
            
            let ret=[];
            snapshot.forEach(doc => {
                if (doc.data().date.substring(5,7)==data.month)
                {
                    
                    ret.push({
                        city: doc.data().city,
                        date: doc.data().date,
                        latitude: doc.data().latitude,
                        longitude: doc.data().longitude,
                        numberPlate: doc.data().numberPlate,
                        province: doc.data().province,
                        reportDate: doc.data().reportDate,
                        reportTime: doc.data().reportTime,
                        street: doc.data().street,
                        time: doc.data().time,
                        violationDescription: doc.data().violationDescription,
                        violationOrigin: doc.data().violationOrigin
                    })
                }
            })
            

            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(ret);

        });
        
    })
})



//This function takes no parameters
//Returns all detailed violations structured in a JSON array
/*Return ->[{
    city: city,
    date: date,
    latitude: latitude,
    longitude: longitude,
    numberPlate: numberPlate,
    province: province,
    reportDate: reportDate,
    reportTime: reportTime,
    street: street,
    time: time,
    violationDescription: violationDescription,
    violationOrigin: violationOrigin
},...]*/

exports.allDetailedViolations = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('violationsByMonth triggered');
    return cors(req, res, () => {

        //let data= {
            //name: req.query.fullName,
          //  month: req.query.month
            //password: req.query.password
        //};


        /*let data={
            month: req.body.month
        };*/

        return violationList= db.collection('DetailedViolations')
        .get()
        .then(snapshot=> {
            
            let ret=[];
            snapshot.forEach(doc => {

                    ret.push({
                        city: doc.data().city,
                        date: doc.data().date,
                        latitude: doc.data().latitude,
                        longitude: doc.data().longitude,
                        numberPlate: doc.data().numberPlate,
                        province: doc.data().province,
                        reportDate: doc.data().reportDate,
                        reportTime: doc.data().reportTime,
                        street: doc.data().street,
                        time: doc.data().time,
                        violationDescription: doc.data().violationDescription,
                        violationOrigin: doc.data().violationOrigin
                    })
            })
            

            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(ret);

        });
        
    })
})