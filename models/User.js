const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullName: {
        type: String
    },
    age: {
        type: Number
    }
});
module.exports = mongoose.model('user', UserSchema);