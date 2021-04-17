const express = require('express');
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use(projectsRouter);
server.use(actionsRouter);

server.get('/', (req, res) => {
	res.status(200).json({
		message: "server is up and running"
	})
});

server.use((error, req, res, next) => {
	//console.log(error);
	res.status(500).json({
		message: "something went wrong"
	})
});

module.exports = server;
