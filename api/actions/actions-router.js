// Write your "actions" router here!
const express = require('express');
const actionsDB = require('./actions-model');

const actionsRouter = express.Router();

actionsRouter.get('/api/actions/', async (req, res) => {
	try {
		const actions = await actionsDB.get();
		res.status(200).json(actions)
	}
	catch (error) {
		res.status(500).json({
			message: "cannot get actions"
		})
	}
})

actionsRouter.get('/api/actions/:id', async (req, res) => {
	try {
		const specAction = await actionsDB.get(req.params.id);
		if (!specAction) {
			res.status(404).json({
				message: "action with this id does not exist"
			})
		}
		else {
			res.status(200).json(specAction)
		}
	}
	catch (error) {
		res.status(500).json({
			message: "cannot get specific action"
		})
	}
})

actionsRouter.post('/api/actions/', async (req, res) => {
	if (!req.body.description || !req.body.notes) {
		return res.status(404).json({
			message: "missed description/notes field/s"
		})
	}
	else if (!req.body.project_id) {
		return res.status(404).json({
			message: "project with this id does not exist"
		})
	}
	else {
		try {
			const newAction = await actionsDB.insert(req.body)
			res.status(201).json(newAction)
		}
		catch (error) {
			res.status(500).json({
				message: "cannot add new action"
			})
		}
	}
})

actionsRouter.put('/api/actions/:id', async (req, res) => {
	if (!req.body.description || !req.body.notes) {
		return res.status(404).json({
			message: "missed description/notes field/s"
		})
	}
	else {
		try {
			const modifiedAction = await actionsDB.update(req.params.id, req.body);
			if (!modifiedAction) {
				res.status(404).json({
					message: "action with this id does not exist"
				})
			}
			else {
				res.status(200).json(modifiedAction);
			}
		}
		catch (error) {
			res.status(500).json({
				message: "cannot add new action"
			})
		}
	}
})

actionsRouter.delete('/api/actions/:id', async (req, res) => {
	try {
		const deletedAction = await actionsDB.remove(req.params.id);
		if (!deletedAction) {
			res.status(404).json({
				message: "action with this id does not exist"
			})
		}
		else {
			res.status(200).json(deletedAction)
		}
	}
	catch (error) {
		res.status(500).json({
			message: "cannot delete action"
		})
	}
})

module.exports = actionsRouter;