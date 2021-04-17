// Write your "projects" router here!
const express = require('express');
const projectsDB = require('./projects-model');

const projectsRouter = express.Router();

projectsRouter.get('/api/projects/', async (req, res) => {
	try {
		const projects = await projectsDB.get();
		res.status(200).json(projects);
	}
	catch (error) {
		res.status(500).json({
			message: "cannot get projects"
		})
	}
});

projectsRouter.get('/api/projects/:id', async (req, res) => {
	try {
		const project = await projectsDB.get(req.params.id);
		if (!project) {
			res.status(404).json({
				message: "project with this id not found"
			})
		}
		else {
			res.status(200).json(project)
		}
	}
	catch (error) {
		res.status(500).json({
			message: "cannot get project with specific id"
		})
	}
})

projectsRouter.post('/api/projects/', async (req, res) => {
	if (!req.body.name || !req.body.description) {
		return res.status(400).json({
			message: "missing name/description fields"
		})
	}
	try {
		const newProject = await projectsDB.insert(req.body)
		res.status(201).json(newProject)
	}
	catch (error) {
		res.status(500).json({
			message: "project cannot be added"
		})
	}
})

projectsRouter.put('/api/projects/:id', async (req, res) => {
	if (!req.body.name || !req.body.description) {
		return res.status(400).json({
			message: "missing name/description fields"
		})
	}
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
		res.status(500).json({
			message: "project cannot be modified"
		})
	}
})

projectsRouter.delete('/api/projects/:id',async (req, res) => {
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
		res.status(500).json({
			message: "project cannot be removed"
		})
	}
})

projectsRouter.get('/api/projects/:id/actions/', async (req, res) => {
	try {
		const projectActions = await projectsDB.getProjectActions(req.params.id)
		res.status(200).json(projectActions)
		}
	catch(error) {
		res.status(500).json({
			message: "cannot get list of actions of this project id"
		})
	}
})

module.exports = projectsRouter;
