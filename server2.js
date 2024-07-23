import { createServer } from 'http';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const PORT = process.env.PORT;

const users = [
    {id: 1, name: 'John Doe'},
    {id: 2, name: 'Jake Smith'},
    {id: 3, name: 'Ellen Smith'}
]

//Logger Middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

//JSON Middleware
const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
}

//Route handler for GET /api/users
const getUsersHandler = (req, res) => {
    res.write(JSON.stringify(users));
    res.end();
}

//Route handler for POST /api/users/:id
const getUserByIdHandler = (req, res) => {
    const id = req.url.split('/')[3];
    const user = users.find(user => user.id === parseInt(id));

    if(user){
        res.write(JSON.stringify(user));
    }
    else{
        res.statusCode = 404;
        res.write(JSON.stringify({message: 'User Not Found'}));
    }
    res.end();
}

//Not found handler
const notFoundHandler = (req, res) => {
    res.statusCode = 404;
    res.write(JSON.stringify({message: 'Route Not Found'}));
    res.end();
}

const server = createServer( (req, res) => {
    logger(req, res, ()=> {
        jsonMiddleware(req, res, ()=> {
            if (req.url === '/api/users' && req.method === 'GET') {
                getUsersHandler(req, res);
            }else if (req.url.match('\/api\/users\/([0-9]+)') && req.method === 'GET'){
                getUserByIdHandler(req, res);
            }else{
                notFoundHandler(req, res);
            }
        })
    })
})

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})