const express = require("express"); 
const authRoutes = require('./routes/auto-routes');

const app = express(); 

// set up view engine 
app.set('view engine', 'ejs');
app.use(express.json());

// set up routes 
app.use('/auth', authRoutes); 

// create home route 
app.get('/', (req, res) => {
    res.render('home');
})

app.listen(5001, () => {
    console.log("App now listening for request on port 5001");
})