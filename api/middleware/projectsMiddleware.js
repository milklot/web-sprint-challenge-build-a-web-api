const projectsDB = require("../projects/projects-model");

const validateProjectId = () => {
	return async (req, res, next) => {
		const project = await projectsDB.get(req.params.id)
		if (!project) {
			return res.status(404).json({
				message: "project with this id not found"
			})
		}
		req.project = project;
		next();
		}
}

const validateProjectBody = () => {
	return (req, res, next) => {
		if (!req.body.name || !req.body.description) {
			return res.status(400).json({
				message: "missing name/description fields"
			})
		}
		next();
	}
}

module.exports = {
	validateProjectId,
	validateProjectBody
}