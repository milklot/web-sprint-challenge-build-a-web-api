const actionsDB = require('../actions/actions-model');

const validateActionId = () => {
	return async (req, res, next) => {
		const action = await actionsDB.get(req.params.id)
		if (!action) {
			return res.status(404).json({
				message: "action with this id not found"
			})
		}
		req.action = action;
		next();
		}
}

const validateActionBody = () => {
	return async (req, res, next) => {
		if (!req.body.description || !req.body.notes) {
			return res.status(400).json({
				message: "missed description/notes field/s"
			})
		}
		next();
	}
}

const validateActionBodyWithID = () => {
	return async (req, res, next) => {
		if (!req.body.description || !req.body.notes) {
			return res.status(400).json({
				message: "missed description/notes field/s"
			})
		}
		else if (!req.body.project_id) {
			return res.status(404).json({
				message: "missed project id field"
			})
		}
		next()
	}
}


module.exports = {
	validateActionId,
	validateActionBody,
	validateActionBodyWithID
}