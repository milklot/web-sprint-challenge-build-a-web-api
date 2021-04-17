// Write your "actions" router here!
const express = require('express');
const actionsDB = require('./actions-model');
const mw = require('../middleware/actionsMiddleware');

const actionsRouter = express.Router();

actionsRouter.get('/api/actions/', async (req, res, next) => {
	try {
		const actions = await actionsDB.get();
		res.status(200).json(actions)
	}
	catch (error) {
		next()
	}
})

actionsRouter.get('/api/actions/:id',mw.validateActionId() ,async (req, res) => {
	res.status(200).json(req.action)
})

actionsRouter.post('/api/actions/', mw.validateActionBodyWithID(), async (req, res, next) => {
	try {
		const newAction = await actionsDB.insert(req.body)
		res.status(201).json(newAction)
	}
	catch (error) {
		next()
	}
})

actionsRouter.put('/api/actions/:id', mw.validateActionBody(), async (req, res) => {
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