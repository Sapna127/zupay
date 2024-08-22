const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:String,
    subtitle:String,
    desc:String
})

module.exports = mongoose.model('Blog', blogSchema);