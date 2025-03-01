// The address of this server connected to the network is:
// URL ->  http://localhost:3333
// IP -> 127.0.0.1:3333
const express = require('express');
const app = express();
const PORT = 3333;

let data = {
    users: [{
        name: 'John',
        age: 30
    }, {
        name: 'Jane',
        age: 25
    }]
}

// Middleware (a function that has access to the request and response objects)
// This is a middleware that helps us to parse incoming requests with JSON payloads
app.use(express.json());

// HTTP VERBS && ROUTES (or paths)

// The method informs the nature of request and the route is a further subdirectory
// (basically we direct the request to the body of code to respond appropriately, and these locations or routes are called endpoints)


// Type 1 - Website endpoints
// These endpoints are for sending back html and they typically come when a user enters a url in a browser
app.get('/', (req, res) => {
    // this is endpoint number 1 - / (root)
    console.log('Someone visited the home page');
    res.send(`
        <body style="background-color: lightblue;">
            <h1>DATA: </h1>
            <p>${JSON.stringify(data)}</p>
            <a href="/dashboard">Dashboard</a>
            <script>
                fetch('/api/data')
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    });
            </script>
        </body>
        `);

});

app.get('/dashboard', (req, res) => {
    res.send(`
        <body>
            <h1>Dashboard</h1>
            <a href="/">Home</a>
        </body>

        `);
});

// CRUD (method) - Create-post, Read-get, Update-put, Delete-delete
// Type 2 -  API endpoints (non visula)
app.get('/api/data', (req, res) => {
    res.status(201).send(data)
});

app.post('/api/data', (req, res) => {

    // someone wants to create a user
    // for example wher they click a sign up button
    const newEntry = req.body;
    console.log(newEntry);
    data.users.push(newEntry);
    res.send(data);
});

app.delete("/api/endpoint", (req, res) => {
    data.users.pop();
    res.send(data, 200);
});


app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);
}); // Start the server
