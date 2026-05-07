const express = require('express');
const bodyParser = require('body-parser');  

const app = express();

app.use((req, res, next) => {
  console.log('Hello, World!', req.url, req.method);
  next();
});

app.use((req, res, next) => {   
  console.log('This is a middleware function!', req.url, req.method);
  next();
});

// app.use((req, res, next) => {
//     console.log('This is the root route!', req.url, req.method);
//   res.send('Welcome to the root route!');
// });

app.get("/",(req, res, next) => {
    console.log('This is the root route!', req.url, req.method);
  res.send('Welcome to the root route!');
});


app.get("/contact", (req, res, next) => {
    console.log('This is the contact route!', req.url, req.method);
  res.send(`<h1>Contact Us</h1>
  <p>You can contact us at</p> 
  <form action="/contact" method="POST">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" placeholder="Enter your name">
    <br><br>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" placeholder="Enter your email">
    <br><br>
    <input type="submit" value="Submit">
  </form>`);
});


app.use(bodyParser.urlencoded({ extended: true }));

app.post("/contact", (req, res, next) => {
    console.log('This is the contact route!', req.url, req.method, req.body);
  res.send('Thank you for contacting us!');
});


const port = 8081;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 