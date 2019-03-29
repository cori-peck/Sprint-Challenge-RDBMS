const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile')

const server = express();
const db = knex(knexConfig.development);


server.use(express.json());
server.use(helmet());


server.get('/', (req, res) => {
    res.status(200).send("Project Tracker - David Allen's Getting Things Done Methodology")
})


// C - Create 
// /api/projects
server.post('/api/projects', (req, res) => {
    db('projects').insert(req.body)
    .then(projectId => {
        const [ id ] = projectId;
        res.status(201).json({ id: id});
    })
    .catch(err => {
        res.status(500).json({ message: "Could not add the project" })
    })
})


const port = process.env.PORT || 5000;
server.listen(port, () =>
    console.log(`*** Server is up and running on localhost:${port} ***`)
);
