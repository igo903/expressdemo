const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema({
    content:{type:String}

})

const NewPost = mongoose.model('tpost', PostSchema);
module.exports = NewPost;

