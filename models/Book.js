const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    userId: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        maxlength: [20, '`{PATH}` max length 20'],
        minlength: [2, '`{PATH}` min length 2']
    },
    description: String,
    comments: [{ message: String }],
    meta: {
        votes: Number,
        favs: Number
    },
    published: {
        type: Boolean,
        default: false    
    },
    publishedDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('book', BookSchema);//tırnak icerisine yazılan kelime collection ismini belirler