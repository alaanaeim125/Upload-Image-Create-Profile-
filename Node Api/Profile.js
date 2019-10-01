var mongoose = require('mongoose');
var connection = require('./connection');

class Profile {
    constructor(){
        var profileSchema = mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            username: String,
            name: String,
            image: String,
            Date: { type: Date, default: Date.now() }
        })

        this.profileModel = mongoose.model('profile', profileSchema, 'profile');
    }

// Add New Product
addNewUser(newUser) {
    return new Promise((resolve, reject) => {
        var user = {
            _id: new mongoose.Types.ObjectId(),
            username: newUser.username,
            name: newUser.name,
            image: newUser.image,
            Date: Date.now()
        }
        this.profileModel.create(user, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve('newUser Added Successfully ..... ');
            }
        })
    })
}


// Get All Profiles
getAllProfils() {
    return new Promise((resolve, reject) => {
        this.profileModel.find({}, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

// Get One Profile
getOneProfile(id) {
    return new Promise((resolve, reject) => {
        this.profileModel.findById(id, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}


}

module.exports = Profile;