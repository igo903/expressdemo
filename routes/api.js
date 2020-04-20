const express = require('express');
const mongodb = require('mongoose');
const Ninja = require('../models/ninja');
const NewPost = require('../models/NewPost');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;





router.get('/posts', async(req, res, next) => {
    NewPost.find({}).then(function(posts){
        res.send(posts)
    })
})


router.get('/ppp', async(req, res, next) => {
    const posts = await loadPostsCollection()
    res.send(await posts.find({}).toArray())
    // res.send('ppp')
})

router.post('/ppp', async(req, res, next) =>{
    const posts = await loadPostsCollection()
    await posts.insertOne({
        name:req.body.name,
        createdAt: new Date()
    });
    res.status(201).send()
})

router.delete('/ppp/:id', async(req, res, next) =>{
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id:ObjectId(req.params.id)});
    res.status(200).send()
})



async function loadPostsCollection(){
    const client =  await MongoClient.connect('mongodb://localhost:27017/ninjas_appwww', 
    {useNewUrlParser: true, useUnifiedTopology: true});

    return client.db('ninjas_appwww').collection('posts');
}



//get a list of ninjas from the db
router.get('/ninjas', function(req, res, next){

    Ninja.find({}).then(function(ninjas){
        res.send(ninjas);
    })

    // Ninja.aggregate([{
    //     $geoNear: {
    //         'near': {'type':'Point', 'coordinates':[req.query.lan, req.query.lat]},
    //             'spherical': true,
    //             'maxDistance': 100000,
    //             'distanceField': 'dist' 
    //     }
    // }]).then(function(ninjas){
    //     res.send(ninjas);
    // });

})

//add a new ninja to the db
router.post('/ninjas', function(req, res, next){
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja)
    }).catch(next);
})

router.put('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(ninja){
        Ninja.findOne({_id:req.params.id}).then(function(ninja){
            res.send(ninja)
        })
        //res.send({type:'PUT'})
    })
})

router.delete('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndRemove({_id:req.params.id}).then(function(ninja){
        res.send(ninja);
    });
    //res.send({type:'DELETE'})
})

module.exports = router;