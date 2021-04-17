// Write your "projects" router here!
const express = require('express');
const projectsDB = require('./projects-model');
const mw = require('../middleware/projectsMiddleware')

const projectsRouter = express.Router();

projectsRouter.get('/api/projects/', async (req, res, next) => {
	try {
		const projects = await projectsDB.get();
		res.status(200).json(projects);
	}
	catch (error) {
		next()
	} 
});

projectsRouter.get('/api/projects/:id',mw.validateProjectId(),(req, res) => {
	res.status(200).json(req.project)
})

projectsRouter.post('/api/projects/', mw.validateProjectBody(), async (req, res, next) => {
	try {
		const newProject = await projectsDB.insert(req.body)
		res.status(201).json(newProject)
	}
	catch (error) {
		next()
	}
})

projectsRouter.put('/api/projects/:id', mw.validateProjectBody(), async (req, res, next) => {
	try {
		const modifiedProject = await projectsDB.update(req.params.id, req.body)
		if (!modifiedProject) {
			res.status(404).json({
				message: "project with this id does not exist"
			})
		}
		else {
			res.status(200).json(modifiedProject)
		}
	}
	catch(error) {
		next()
	}
})

projectsRouter.delete('/api/projects/:id',async (req, res, next) => {
	try {
		const deletedProject = await projectsDB.remove(req.params.id);
		if (!deletedProject) {
			res.status(404).json({
				message: "project with this id does not exist"
			})
		}
		else {
			res.status(200).json(deletedProject)
		}
	}
	catch(error) {
		next()
	}
})

projectsRouter.get('/api/projects/:id/actions/', async (req, res, next) => {
	try {
		const projectActions = await projectsDB.getProjectActions(req.params.id)
		res.status(200).json(projectActions)
		}
	catch(error) {
		next()
	}
})

module.exports = projectsRouter;
