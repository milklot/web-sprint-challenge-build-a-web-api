const express = require('express')
const projectsRouter = require('./projects/projects-router');

const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use(projectsRouter);

server.get('/', (req, res) => {
	res.status(200).json({
		message: "server is up and running"
	})
});

module.exports = server;
