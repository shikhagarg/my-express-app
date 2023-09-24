const express = require('express');

const app = express();
const PORT = 8080;

app.use(express.json());

const USERS = [];
const QUESTIONS = [
    {
        "title" : "Find the maximum",
        "description" : "Given an array, find the maximum of the array",
        "test cases" : [{
            "input": "[1,2,3,4,5,]",
            "output": "5"
            }]
    }];

const SUBMISSIONS = [];

app.get('/getUsers', (req,res) => {
    res.json({"Users": USERS});
});

app.post('/signup', (req,res) => {
    
      // Add logic to decode body
      // body should have email and password
     const  username  = req.body.username;
     const  password  = req.body.password;
     console.log('username', username);

        if(!username || !password) {
            return res.status(400).json({"error": "Username and Password cannot be empty"});
        }
         //Store email and password (as is for now) in the USERS array above
         //(only if the user with the given email doesnt exist)

        if(!userExists(username)) {
            USERS.push(req.body);
        } else {
            return res.status(400).json({"error": "User already exists!"});
        }
         // return back 200 status code to the client
        return res.status(201).json({"message": "User is created"});

});

function userExists(username) {
    return USERS.some(user => user.username === username);

}


// Function to generate a random token
const generateRandomToken = () => {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const tokenLength = 32; 

    let token = '';
    for (let i = 0; i < tokenLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
    }
    return token;
}

app.post('/login', (req,res) => {
    // Add logic to decode body
  // body should have email and password
    const username = req.body.username;
    const password = req.body.password;

  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same

   // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client

    if(userExists(username)) {
        if(USERS.some(user => user.username === username && user.password === password)) {
            res.json({"message": "Successfully logged in", "token": generateRandomToken()});
        } else {
            res.status(401).json({"error": "Password is incorrect"});
        }
    } else {
        res.status(401).json({"error": "User doesn't exist"});
    }
});

app.get('/questions', (req,res) => {
    res.json({"questions": QUESTIONS});
});

app.get('/submissions', (req,res) => {
    res.json({"submissions": SUBMISSIONS});
});

app.post('/submissions', (req,res) => {
    // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above

    const userSubmission = req.body;
    const isAccepted = Math.random() < 0.5;
    
    SUBMISSIONS.push({ ...userSubmission, isAccepted: isAccepted});
    res.status(200).json({isAccepted: isAccepted});
});

app.listen(PORT, () => {
    console.log('Server is running on port:',PORT);
});