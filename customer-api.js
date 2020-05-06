const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

let customers = [{

     "custID":1001,
     "custName": "prathyusha",
     "custPhn": 9347443492,
     "custLoc" : "India",
     "custLand":"chennai"
     

},{
     "custID":1002,
     "custName": "venkatesh",
     "custPhn": 9490567231,
     "custLoc" : "India",
     "custLand":"chittoor"
},{
     "custID":1003,
     "custName": "sujatha",
     "custPhn": 949067543,
     "custLoc" : "India",
     "custLand":"vizag"
}]
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.post('/customer',(req,res)=>
{
    const customer = req.body;
    console.log(customer);
    customers.push(customer);
    res.send("Customer details has been added to the database!");
});

app.get('/customer',(req,res)=>{
    res.json(customers);
});
app.get('/customer/:custID',(req,res)=>{
    const custID = req.params.custID;

    for(let customer of customers)
    {
        if(customer.custID == custID)
        {
            res.json(customer);
            return;
        }
    }
    res.status(404).send("Customer details not Found!");
});
app.post('/customer/:custID',(req,res)=>{
    const custID = req.params.custID;
    const newcustomer = req.body;

    for(let i=0;i < customers.length; i++)
    {
        let customer = customers[i];
        if(customer.custID === custID)
        {
            customers[i] = newcustomer;
        }
    }
    res.send("Customer details are edited!");
});
app.delete('/customer/:custID',(req,res)=>
{
    const custID = req.params.custID;
    customers = customers.filter(i=>{
        if(i.custID!= custID)
        {
            return true;
        }
        return false;
    });
    res.send("Customer details are deleted!");

});
app.put('/customer/:custID',(req,res)=>{
    const custID = req.params.custID;
    const newcustomer = req.body;

    for(let i=0;i < customers.length; i++)
    {
        let customer = customers[i];
        if(customer.custID === custID)
        {
            customers[i] = newcustomer;
        }
    }
    res.send("Customer details are edited!");
});

app.listen(port,()=>
console.log(`Hello world,Listening to port ${port}!`));  