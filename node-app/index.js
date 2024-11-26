require('dotenv').config();
const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
const fs= require('fs');
const multer  = require('multer');
const {google} = require('googleapis');
const https = require('https');
const url = require('url');
const crypto = require('crypto');
const jwtDecoder = require('jwt-decode');
const session = require('express-session');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email'
];

let userCredential = null;
  
const upload = multer({ storage: storage })
const app = express()
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET}
));
const port = 4000

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');
//mongodb+srv://b22072:MongoDB@161003@cluster0.y1zj4ww.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const Users = mongoose.model('Users2', { user_email: String });
const Posts = mongoose.model('Posts2', { type:String, title: String, desc: String, place: String, date:String, category: String, image: String, contact: String, userId:String, });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/add-post',upload.single('image'),(req,res)=>{
    const type = req.body.type;
    const title = req.body.title;
    const desc = req.body.desc;
    const place = req.body.place;
    const date = req.body.date;
    const contact = req.body.contact;
    const category = req.body.category;
    const userId = req.body.userId;
    const image=req.file.path;
    const post = new Posts({type,title,desc,place,date,category,image,contact,userId});
    post.save()
        .then(() =>{res.send({message: "Data saved successfully"})})
        .catch(()=>{res.send({message: 'Server error'})})

})

app.get('/get-post',(req,res)=>{
    Posts.find()
    .then((result)=>{
        res.send({message:'products sent', posts:result})
    })
    .catch((err)=>{
        res.send({message:'Server error'})
    })
})

app.get('/get-post/found',(req,res)=>{
    Posts.find()
    .then((result)=>{
        let ans = new Array();
        for(let element of result){
            if(element.type == 'Found'){
                ans.push(element)
            }
        }
        res.send({message:'products sent', posts:ans})
    })
    .catch((err)=>{
        res.send({message:'Server error'})
    })
})

app.get('/get-post/lost',(req,res)=>{
    Posts.find()
    .then((result)=>{
        let ans = new Array();
        for(let element of result){
            if(element.type == 'Lost'){
                ans.push(element)
            }
        }
        res.send({message:'products sent', posts:ans})
    })
    .catch((err)=>{
        res.send({message:'Server error'})
    })
})

app.get('/google-login', async (req, res) => {
    const state = crypto.randomBytes(32).toString('hex');
    req.session.state = state;
    const authorizationUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: true,
        state: state
    });

    res.redirect(authorizationUrl);
});

var user_email;

app.get('/oauth2callback', async (req, res) => {
    let q = url.parse(req.url, true).query;

    if (q.error) { // An error response e.g. error=access_denied
        console.log('Error:' + q.error);
    } else if (q.state !== req.session.state) { //check state value
        console.log('State mismatch. Possible CSRF attack');
        res.end('State mismatch. Possible CSRF attack');
    } else { // Get access and refresh tokens (if access_type is offline)
        let { tokens } = await oauth2Client.getToken(q.code);
        oauth2Client.setCredentials(tokens);
        userCredential = tokens;
        console.log(userCredential);
        user_email = jwtDecoder.jwtDecode(userCredential.id_token).email;
        console.log(user_email);
        Users.findOne({user_email: user_email})
            .then((result) => {
                if(!result) {
                    const user = new Users({user_email: user_email});
                    user.save()
                        .then(() => {console.log('Successfully signed in')})
                        .catch(() => {console.log('Login failed')})
                }
                else {console.log('Login success')}
            })
            .catch(() => {
                console.log('Server error');
            })
        res.redirect('http://localhost:3000/?user_email=${user_email}');          
    }
});

app.post('/get-category/:id',(req,res)=>{
    //console.log(req.params.id);
    const category = req.params.id;
    Posts.find()
    .then((result)=>{
        let ans = new Array();
        for(let element of result){
            if(element.category==category){
                ans.push(element)
            }
        }
        res.send({message:'products sent', posts:ans})
    })
    .catch((err)=>{
        res.send({message:'Server error'})
    })

});

app.get('/revoke', async (req, res) => {
    // Build the string for the POST request
    let postData = "token=" + userCredential.access_token;

    // Options for POST request to Google's OAuth 2.0 server to revoke a token
    let postOptions = {
      host: 'oauth2.googleapis.com',
      port: '443',
      path: '/revoke',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    // Set up the request
    const postReq = https.request(postOptions, function (res) {
        res.setEncoding('utf8');
        res.on('data', d => {
            console.log('Response: ' + d);
      });
    });

    postReq.on('error', error => {
        console.log(error)
    });

    // Post the request with data
    postReq.write(postData);
    postReq.end();
});



app.post('/lost/get-category/:id',(req,res)=>{
    //console.log(req.params.id);
    const category = req.params.id;
    //console.log(category);
    Posts.find()
    .then((result)=>{
        let ans = new Array();
        for(let element of result){
            if(element.category==category && element.type=='Lost'){
                ans.push(element)
            }
        }
        res.send({message:'products sent', posts:ans})
    })
    .catch((err)=>{
        res.send({message:'Server error'})
    })

})

app.post('/found/get-category/:id',(req,res)=>{
    //console.log(req.params.id);
    const category = req.params.id;
    //console.log(category);
    Posts.find()
    .then((result)=>{
        let ans = new Array();
        for(let element of result){
            if(element.category==category && element.type=='Found'){
                ans.push(element)
            }
        }
        res.send({message:'products sent', posts:ans})
    })
    .catch((err)=>{
        res.send({message:'Server error'})
    })

})


app.post('/my-posts',(req,res)=>{
    const userid = req.body.userid;
    Posts.find()
    .then((result)=>{
        let ans = new Array();
        for(let element of result){
            if(element.userId==userid){
                ans.push(element)
            }
        }
        res.send({message:'products sent', posts:ans})
    })
    .catch((err)=>{
        res.send({message:'Server error'})
    })
})

async function deletePost(query) {
    try {
        const result = await Posts.deleteOne(query);
    } catch (err) {
        console.error('Error deleting document:', err);
    } 
}

app.post('/delete-post',(req,res)=>{
    const pID = req.body.ID;
    console.log(req.body.pId)
    Posts.findOne({_id : pID})
    .then((result)=>{
        if (result){
            const query = {_id : pID};
            deletePost(query);
            var filePath = path.join(__dirname,result.image); 
            try {
                fs.unlinkSync(filePath);
                //console.log('File deleted!');
              } catch (err) {
                //console.error(err.message);
              }
            res.send({message:'Post deleted'})
        } 
    })
    .catch((err)=>{
        res.send({message:'Server errror5'})
    })
})
    
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
