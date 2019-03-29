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


// /api/projects
// C - Create 
server.post('/api/projects', (req, res) => {
    db('projects')
    .insert(req.body)
    .then(projectId => {
        const [ id ] = projectId;
        res.status(201).json({ id: id});
    })
    .catch(err => {
        res.status(500).json({ message: "Could not add the project" })
    })
})


// /api/projects/:id
// R - Read
server.get('/api/projects/:id', (req, res) => {
    const id = req.params.id;
    db('projects')
    .where("id", id)
    .then(project => {
        db('actions')
        .where("project_id", id)
        .then(actions => {
            let item = project;
            let actions_item = actions;
            let wholeProject = Object.assign(item[0], {actions: actions_item})
            res.status(200).json(wholeProject);
        })
        .catch(err => {
            res.status(500).json({ message: "Actions could not be retrieved" })
        })
    })
    .catch(err => {
        res.status(500).json({ message: 'Error Retrieving Projects' })
    })
})



const port = process.env.PORT || 5000;
server.listen(port, () =>
    console.log(`*** Server is up and running on localhost:${port} ***`)
);
