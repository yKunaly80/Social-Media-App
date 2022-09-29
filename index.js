const connectToMongo = require('./db');
const express = require('express')

// Call connectToMongo Function From db.js For Connecting The Database Server 
connectToMongo();

// Decleration Of Express Js Server At Port 5000
const app = express()
const port = 5000

app.use(express.json());


// Available Routes
app.use('/api', require('./routes/user'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/like', require('./routes/like'));
app.use('/api/unlike', require('./routes/unlike'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/all_posts', require('./routes/allPosts'));

// Assigned App At Localhost PORT : 5000  
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})


