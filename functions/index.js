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

var crypto = require('crypto');

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
            password: req.body.password,
            salt: "a"
        };


        let salt = crypto.randomBytes(16).toString('hex');
        let hash = crypto.pbkdf2Sync(data.password, salt, 79,32,'sha512').toString('hex');
        data.password=hash;
        data.salt=salt;


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

        //let salt = crypto.randomBytes(16).toString('hex');
        

        //data.password=hash;

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

                let hash = crypto.pbkdf2Sync(data.password, doc.data().salt, 79,32,'sha512').toString('hex');
                if (doc.data().password == hash)
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
            numberPlate: req.body.numberPlate,
            salt:"a"

        };

        let salt = crypto.randomBytes(16).toString('hex');
        let hash = crypto.pbkdf2Sync(data.password, salt, 79,32,'sha512').toString('hex');
        data.password=hash;
        data.salt=salt;

        
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

        return driverList= db.collection('DetailedViolations')
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

                let hash = crypto.pbkdf2Sync(data.password, doc.data().salt, 79,32,'sha512').toString('hex');
                if (doc.data().password == hash)
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



//This function takes 2 parameters: startTime (As a normal time string)
//and endTime (As a normal time string) and returns all violations in an 
//array containing objects containing all fields associated with that record in the db
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

exports.violationsByTime = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('violationsByTime triggered');
    return cors(req, res, () => {

        //let data= {
           // startTime: req.query.startTime,
         //   endTime: req.query.endTime
            //password: req.query.password
       // };


        let data={
          startTime: req.body.startTime,
          endTime: req.body.endTime
        };

        return violationList= db.collection('DetailedViolations')
        .where('time','>=',data.startTime)
        .where('time','<=',data.endTime)
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


//This function takes no parameters
//It returns a JSON array containg objects as below
//Each interval is named and has a numeric count associated with it

/*Returns -> [
    {"lessThanHour":x},
    {"1-to-5-hours":x},
    {"5-to-24-hours":x},
    {"moreThanADay":x}
];*/


exports.numReportsAtIntervals = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('numReportsAtIntervals triggered');
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
            
            let ret=[
                {"lessThanHour":0},
                {"1-to-5-hours":0},
                {"5-to-24-hours":0},
                {"moreThanADay":0}
            ];
            snapshot.forEach(doc => {

                if (doc.data().date!=doc.data().reportDate)
                {
                    ret[3].moreThanADay++;
                }
                else
                {
                    let time=doc.data().time.substring(0,2)+doc.data().time.substring(3,5);
                    let reportTime=doc.data().reportTime.substring(0,2)+doc.data().reportTime.substring(3,5);
                    if (reportTime-time<100)
                    {
                        ret[0].lessThanHour++;
                    }
                    else
                    if (reportTime-time<500)
                    {
                        ret[1]["1-to-5-hours"]++;
                    }
                    else
                    {
                        ret[2]["5-to-24-hours"]++;
                    }
                }
            })
            

            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(ret);

        });
        
    })
})


//This function takes monitor email as parameter
//Returns a count of all violations under all his drivers
//In a structured JSON array. 
/*Returns ->{
                        DaysAgo:<int of how many days ago. Today=0,
                        "date":<Date as string>,
                        "count":<int of count                        
                    }*/


exports.numViolationsByMonitorWeek = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('violationsByMonitorWeek triggered');
    return cors(req, res, () => {




            //let data= {
                //name: req.query.fullName,
              //  email: req.query.email,
                //password: req.query.password
            //};
    
    
            let data={
                email: req.body.email
            };

        let violations=[
            {name:"0DaysAgo"},
            {name:"1DaysAgo"},
            {name:"2DaysAgo"},
            {name:"3DaysAgo"},
            {name:"4DaysAgo"},
            {name:"5DaysAgo"},
            {name:"6DaysAgo"}
        ];
        let dates=[];
        let ret=[];
        let plateList=[];
            

            return driverList= db.collection('Taxi Driver')
            .where('monitorEmail','==',data.email)
            .get()
            .then(snapshot=> {
                 

                snapshot.forEach(doc => {
                    plateList.push({
                        numberPlate: doc.data().numberPlate
                    })
                })
                //console.log(plateList);

                return;
            })
            .then(()=> {
                
                var current_datetime=new Date();
                let day = current_datetime.getDate();
                let month = current_datetime.getMonth()+1;
                let year= current_datetime.getFullYear();
                //console.log("Current day: "+day+"Current month: "+month+"Current year: "+year);
                
                let dateString;
                
                for (var i=0;i<7;i++)
                {
                    if (day-i<=0)
                    {
                        if (month==1)
                        {
                            dateString=year-1+"-12-"+31-i;
                        }
                        else
                        if (month==2)
                        {
                            dateString=year+"-01-"+31-i;
                        }
                        else
                        if (month==3)
                        {
                            dateString=year+"-02-"+28-i;
                        }
                        else
                        if (month==4)
                        {
                            dateString=year+"-03-"+31-i;
                        }
                        else
                        if (month==5)
                        {
                            dateString=year+"-04-"+30-i;
                        }
                        else
                        if (month==6)
                        {
                            dateString=year+"-05-"+31-i;
                        }
                        else
                        if (month==7)
                        {
                            dateString=year+"-06-"+30-i;
                        }
                        else
                        if (month==8)
                        {
                            dateString=year+"-07-"+31-i;
                        }
                        else
                        if (month==9)
                        {
                            dateString=year+"-08-"+31-i;
                        }
                        else
                        if (month==10)
                        {
                            dateString=year+"-09-"+30-i;
                        }
                        else
                        if (month==11)
                        {
                            dateString=year+"-10-"+31-i;
                        }
                        else
                        if (month==12)
                        {
                            dateString=year+"-11-"+30-i;
                        }
                    }
                    else
                    {
                        month=month.toString();

                        if (month.length==1)
                        {
                            month="0"+month;
                        }
                        var dayS=day-i;
                        dayS=dayS.toString();
                        
                        if (dayS.length==1)
                        {
                            dayS="0"+dayS;
                        }
                        year=year.toString();
                        dateString=year+"-"+month+"-"+dayS;
                        dateString=dateString.toString();
                        
                    }

                    dates[i]=dateString;

                }

                for (var k=0; k<7;k++)
                {
                    ret.push({
                        DaysAgo:k,
                        "date":dates[k],
                        "count":0                        
                    })
                }

                //console.log(dates);
                //console.log(ret);

                return violationCount= db.collection('DetailedViolations')
                .get()
                .then(snapshot=>{

                    //console.log("In Detailed execution");
                    
                    snapshot.forEach(doc=>{
                        
                        //console.log("Format of date: "+doc.data().date);

                        plateList.forEach(plate=>{
                            //console.log("In plate loop. Plate:"+plate.numberPlate);
                            if (doc.data().numberPlate==plate.numberPlate)
                            {
                                for (var j=0;j<7;j++)
                                {
                                    //console.log("Date match loop. Execution: "+j);
                                    if (doc.data().date==dates[j])
                                    {
                                        //console.log("match found in Detailed");
                                        ret[j].count++;
                                    }
                                }
                            }
                        })
                    })
                })

            })
            /*.then(()=>{

                return violationCount= db.collection('Violations')
                .get()
                .then(snapshot=>{
                    //console.log("In Violations execution");

                    snapshot.forEach(doc=>{

                        plateList.forEach(plate=>{
                            if (doc.data().numberPlate==plate.numberPlate)
                            {
                                for (var j=0;j<7;j++)
                                {
                                    if (doc.data().date==dates[j])
                                    {
                                        //console.log("Match found in Violations");
                                        ret[j].count++;
                                    }
                                }
                            }
                        })
                    })
                })
                

            })*/
            .then(()=>{
                res.setHeader('Content-Type', 'application/json');
                return res.status(200).send(ret);            
            })
            .catch((err) => {
                console.log(err);
                res.setHeader('Content-Type', 'application/json');
                return res.status(500).send(err);      
            });
            
        


    });//cors

})//onRequest


//This function adds a detailed violation
//Parameter: JSON object with correct formatting
//Return - > status OK



exports.addDetailedViolation = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('addDetailedViolation triggered');
    return cors(req, res, () => {

        /*let data={
            cellNumber: req.query.cellNumber,
            email: req.query.email,
            monitorEmail: req.query.monitorEmail,
            password: req.query.password,
            name: req.query.name,
            numberPlate: req.query.numberPlate

        };*/


        /*let data={
            cellNumber: req.body.cellNumber,
            email: req.body.email,
            monitorEmail: req.body.monitorEmail,
            password: req.body.password,
            name: req.body.name,
            numberPlate: req.body.numberPlate

        };*/


        return addDoc= db.collection('DetailedViolations').add(req.body)
        .then( ref=> {
            
            console.log('Detailed Violation added with ref: '+ ref.id);
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send({status: 'success'});
        });
        
    })
})



//This function takes no parameters
//Return is each unique violation with an associated count
//Return -> [{"violation":violation, numViolations: x},...]

exports.violationsByViolationType = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('violationsByViolationType triggered');
    return cors(req, res, () => {

        /*let data= {
            //name: req.query.fullName,
            email: req.query.email,
            //password: req.query.password
        };*/



        return violated= db.collection('DetailedViolations')
        .get()
        .then(snapshot=> {
            
            let arr=[];
            snapshot.forEach(doc =>{
                arr.push(doc.data().violationDescription);
            })
            let violations= [];
            let count=[];
            arr.forEach((violation)=>{
                if (violations.includes(violation))
                {
                    count[violations.indexOf(violation)]++;
                }
                else
                {
                    violations.push(violation);
                    count[violations.indexOf(violation)]=1;
                }
            })

            let ret=[];
            violations.forEach((violation,index)=>{
                ret.push({"violationDescription":violation, numViolations: count[index]});
            })
            
            console.log("Items returned: "+ret);
            

            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(ret);

        });
        
    })
})



//This function takes no parameters
//Return -> {numMonitors:x}

exports.numMonitors = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('numMonitors triggered');
    return cors(req, res, () => {


        return numMonitors= db.collection('Monitor')
        .get()
        .then(snapshot=> {
            
            let count=0;
            snapshot.forEach(doc =>{
                count++;
            })
            ret=count;
            console.log("Items returned: "+ret);
            

            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send({numMonitors: ret});

        });
        
    })
})



//This function takes no parameters
//Return -> {numDrivers:x}

exports.numDrivers = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('numDrivers triggered');
    return cors(req, res, () => {


        return numDrivers = db.collection('Taxi Driver')
        .get()
        .then(snapshot=> {
            
            let count=0;
            snapshot.forEach(doc =>{
                count++;
            })
            ret=count;
            console.log("Items returned: "+ret);
            

            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send({numDrivers: ret});

        });
        
    })
})


//This function takes no parameters
//Return is each unique monitor email with an associated count of drivers
//Return -> [{"monitorEmail":monitor, numDrivers: x},...]

exports.driverCountPerMonitor = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('driverCountPerMonitor triggered');
    return cors(req, res, () => {

        /*let data= {
            //name: req.query.fullName,
            email: req.query.email,
            //password: req.query.password
        };*/



        return monitored= db.collection('Taxi Driver')
        .get()
        .then(snapshot=> {
            
            let arr=[];
            snapshot.forEach(doc =>{
                arr.push(doc.data().monitorEmail);
            })
            let monitors= [];
            let count=[];
            arr.forEach((monitor)=>{
                if (monitors.includes(monitor))
                {
                    count[monitors.indexOf(monitor)]++;
                }
                else
                {
                    monitors.push(monitor);
                    count[monitors.indexOf(monitor)]=1;
                }
            })

            let ret=[];
            monitors.forEach((monitor,index)=>{
                ret.push({"monitorEmail":monitor, numDrivers: count[index]});
            })
            
            console.log("Items returned: "+ret);
            

            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(ret);

        });
        
    })
})



//This function takes monitor email as parameter
//Returns a count of all violations under all drivers grouped by violationDescription
//In a structured JSON array. 
/*Returns ->{
[{"violationDescription":violation, "count": count[index]},...]            
}*/


exports.violationsByDescriptionMonitor = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('violationsByDescriptionMonitor triggered');
    return cors(req, res, () => {




            //let data= {
                //name: req.query.fullName,
              //email: req.query.email
                //password: req.query.password
            //};
    
    
            let data={
                email: req.body.email
            };

        let violations=[];
        let ret=[];
        let plateList=[];
            

            return driverList= db.collection('Taxi Driver')
            .where('monitorEmail','==',data.email)
            .get()
            .then(snapshot=> {
                    

                snapshot.forEach(doc => {
                    plateList.push({
                        numberPlate: doc.data().numberPlate
                    })
                })
                //console.log(plateList);

                return;
            })
            .then(()=> {
                

                return violationCount= db.collection('DetailedViolations')
                .get()
                .then(snapshot=>{

                    //console.log("In Detailed execution");
                    
                    snapshot.forEach(doc=>{
                        
                        //console.log("Format of date: "+doc.data().date);
                        let count=[];

                        plateList.forEach(plate=>{
                            //console.log("In plate loop. Plate:"+plate.numberPlate);
                            if (doc.data().numberPlate==plate.numberPlate)
                            {
                                
                                
                                if (violations.includes(doc.data().violationDescription))
                                {
                                    count[violations.indexOf(doc.data().violationDescription)]++;
                                }
                                else
                                {
                                    violations.push(doc.data().violationDescription);
                                    count[violations.indexOf(doc.data().violationDescription)]=1;
                                }
                                
                    
                                //let ret=[];

                                
                            }
                        })
                    })

                    violations.forEach((violation,index)=>{
                        ret.push({"violationDescription":violation, "count": count[index]});
                })

            })
            .then(()=>{
                res.setHeader('Content-Type', 'application/json');
                return res.status(200).send(ret);            
            })
            .catch((err) => {
                console.log(err);
                res.setHeader('Content-Type', 'application/json');
                return res.status(500).send(err);      
            });
    });

})
})



//This function takes monitor email as parameter
//Returns a count of all violations under all drivers grouped by violationDescription
//In a structured JSON array. 
/*Returns ->{
[{"violationDescription":violation, "count": count[index]},...]            
}*/


exports.numViolationsPerMonitor = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('numViolationsPerMonitor triggered');
    return cors(req, res, () => {



        let violations=[];
        let ret=[];
        let plateList=[];

        let monitors=[];
        let plates=[];
        let count=[];
        let mons=[];

            return driverList= db.collection('Taxi Driver')
            .get()
            .then(snapshot=> {
                    
                let present=false;
                let idx;
                snapshot.forEach(doc => {

                    present=false;
                    

                    monitors.forEach((monitor,index) =>{
                        //console.log(monitor);
                        if (monitor.email==doc.data().monitorEmail)
                        {
                            //console.log(monitor.email+" is in the monitors aray");
                            present=true;
                            idx=index;
                        }

                    });

                    if (!present)
                    {

                        monitors.push({
                            email:doc.data().monitorEmail,
                            "plates": [doc.data().numberPlate]
                        })
                    }
                    else
                    {
                        monitors[idx].plates.push(doc.data().numberPlate);
                    }
                })
                //console.log(monitors);
                return;
            })
            .then(()=> {
                

                return violationCount= db.collection('DetailedViolations')
                .get()
                .then(snapshot=>{

                    //console.log("In Detailed execution");

                    
                    snapshot.forEach(doc=>{
                        
                        //console.log("Format of date: "+doc.data().date);
                        monitors.forEach((mon,index) =>{

                            mon.plates.forEach(plate=>{

                                //console.log("Monitor: "+mon.email+". Plate: "+plate);

                                if (plate==doc.data().numberPlate)
                                {
                                    if (mons.includes(mon.email))
                                    {
                                        count[mons.indexOf(mon.email)]++;
                                    }
                                    else
                                    {
                                        mons.push(mon.email);
                                        count[mons.indexOf(mon.email)]=1;
                                    }
                                }

                            });
                        });

                    })

                    mons.forEach((mon,index)=>{
                        ret.push({
                            email:mon,
                            "count":  count[index]
                        })
                    })

                })

            })
            .then(()=>{
                res.setHeader('Content-Type', 'application/json');
                return res.status(200).send(ret);            
            })
            .catch((err) => {
                console.log(err);
                res.setHeader('Content-Type', 'application/json');
                return res.status(500).send(err);      
            });
            
        


    });//cors

})//onRequest



//This function takes no parameters
//Return -> {numAPP:x}

exports.numAPP = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('numAPP triggered');
    return cors(req, res, () => {

        /*let data= {
            //name: req.query.fullName,
            email: req.query.email,
            //password: req.query.password
        };*/



        return numAPP= db.collection('DetailedViolations')
        .where('violationOrigin','==','APP')
        .get()
        .then(snapshot=> {
            
            let arr=[];
            snapshot.forEach(doc =>{
                arr.push({rec: doc.data().violationOrigin});
            })
            ret=arr.length;
            console.log("Items returned: "+ret);
            

            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send({numAPP: ret});

        });
        
    })
})


//This endpoint takes a numberPlate as argument
//and deletes the associated driver record

exports.deleteDriver = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('deleteDriver triggered');
    return cors(req, res, () => {

        /*let data={
            numberPlate: req.query.numberPlate

        };*/


        let data={
            numberPlate: req.body.numberPlate

        };

        
        let exists=false;
        return driver= db.collection('Taxi Driver')
        .where('numberPlate','==',data.numberPlate)
        .get()
        .then(fd=>{
            console.log("The doc: "+ fd.docs[0].id);
            return fd.docs[0].id;
        })
        .then( id =>{

            deleted = db.collection('Taxi Driver').doc(id).delete()
            .then(()=>{
                res.setHeader('Content-Type', 'application/json');
                return res.status(200).send({status: 'Driver deleted with plate '+data.numberPlate});
            })
        });
        
    })
})



//This endpoint takes a numberPlate as argument
//and deletes the associated driver record

exports.updateDriver = functions
.region('europe-west2')
.https.onRequest((req, res) => {
    console.log('updateDriver triggered');
    return cors(req, res, () => {

        /*let data={
            oldPlate: req.query.oldPlate,
            numberPlate: req.query.numberPlate,
            cellNumber: req.query.cellNumber,
            email: req.query.email,
            monitorEmail: req.query.monitorEmail,
            name: req.query.name
        };*/


        let data={
            oldPlate: req.body.oldPlate,
            numberPlate: req.body.numberPlate,
            cellNumber: req.body.cellNumber,
            email: req.body.email,
            monitorEmail: req.body.monitorEmail,
            name: req.body.name

        };

        
        let exists=false;
        return driver= db.collection('Taxi Driver')
        .where('numberPlate','==',data.oldPlate)
        .get()
        .then(fd=>{
            console.log("The doc: "+ fd.docs[0].id);
            return fd.docs[0].id;
        })
        .then( id =>{

            deleted = db.collection('Taxi Driver').doc(id)
            .update({
                numberPlate:data.numberPlate,
                cellNumber: data.cellNumber,
                email: data.email,
                monitorEmail: data.monitorEmail,
                name: data.name                
            })
            .then(()=>{
                res.setHeader('Content-Type', 'application/json');
                return res.status(200).send({status: 'Driver updated with new plate '+data.numberPlate});
            })
        });
        
    })
})