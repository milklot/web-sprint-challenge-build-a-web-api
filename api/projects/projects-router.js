// Write your "projects" router here!
const express = require('express');
const projectsDB = require('./projects-model');

const projectsRouter = express.Router();

projectsRouter.get('/api/projects/', (req, res) => {
	projectsDB.get(req)
		.then(projects => {
			res.status(200).res(projects)
		})
		.catch(() => {
			res.status(500).json({
				message: "something went wrong"
			})
		})
});

module.exports = projectsRouter;
