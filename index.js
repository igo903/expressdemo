const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const routes = require('./routes/api');
const db = require('./config/db').database;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api',routes);
mongoose.set("useCreateIndex", true);

//connect to mongodb
// mongoose.connect('mongodb://lei:lei@cluster0-shard-00-02-dcrth.mongodb.net:27017/test',
// {useUnifiedTopology: true, useNewUrlParser: true},()=>{
//     console.log('connected to DBBB!')
// });
mongoose.Promise = global.Promise;

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=>{
            console.log('DB connected!!!!')
        })
        .catch((err)=>{
            console.log('Unable connect', err);
        });

const port = process.env.PORT || 4000;

app.get('/',(req, res) =>{
    res.sendFile(path.join(__dirname, 'public/index.html'))
});


app.use(function(err, req, res, next){
    //console.log(err)
    res.status(422).send({error: err.message})
})


app.listen(port,()=>{
    console.log('server started on port', port)
})






// app.listen(process.env.port || 4000, function(){
//     console.log('now listening for request ')
// })