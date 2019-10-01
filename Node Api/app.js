var express = require('express');
var app = express();

var connection = require('./connection');

var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('uploads')); // make inside folder out in the root 

var multer = require('multer');
const path = require('path');

var Profile = require('./Profile');
var profile = new Profile();


/*------------------------------------------- Start Class Photo ------------------------------*/

const DIR = './uploads';
var ImageValues= '';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        
        ImageValues = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, ImageValues);
    }
});
let upload = multer({ storage: storage });


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/api/upload', upload.single('image'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        res.send({ success: false });
    } else {
        console.log('file received + ' + ImageValues);
        res.send({ success: true })
    }
});

/*------------------------------------------- End Class Photo ------------------------------*/


// Add New User
app.post("/addNewUser", (req, res) => {
    data = req.body;
    console.log("sasasasas");
    obj = {
        _id: data._id,
        username: data.username,
        name: data.name,
        image: ImageValues,
        Date: data.Date
    }
    profile.addNewUser(obj)
        .then((data) => {
            res.status(200).json(data);
            console.log('data   : ' + data);
        })
        .catch((err) => {
            res.status(404).json({
                error: 'err insert Profile User'
            });
        })
});



app.get('/getOneProfile/:id', (req, res) => {
    profile.getOneProfile(req.params.id).then((data) => {
        res.status(200).json(data);
    }, (err) => {
        res.status(400).json({error: err});
    })
})


app.get('/getAllProfiles', (req, res) => {
    profile.getAllProfils().then((data) => {
        res.status(200).json(data);
    }, (err) => {
        res.status(400).json({error: err});
    })
})



app.listen(3030);