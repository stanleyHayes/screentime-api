const directorDAO = require("./../../../../dao/v1/director.dao");

exports.createDirector = async (req, res) => {
    try {
        const {first_name, last_name} = req.body;
        if (!first_name || !last_name) {
            return res.status(400).json({message: 'Missing required fields', data: null});
        }
        const {data, message, code} = await directorDAO.createDirector(first_name, last_name);
        return res.status(code).json({data, message});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getDirector = async (req, res) => {
    try {
        const {id} = req.params;
        const response = await directorDAO.getDirectorById(id);
        res.status(response.code).json({data: response.data, message: response.message});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateDirector = async (req, res) => {
    try {
        const {id} = req.params;
        const response = await directorDAO.getDirectorById(id);
        if (!response.success) {
            return res.status(response.code).json({message: response.message, data: response.data});
        }
        const updates = Object.keys(req.body);
        for(let key of updates){
            response.data[key] = req.body[key];
        }
        const updateResponse = await directorDAO.updateDirector(id, response.data);
        res.status(updateResponse.code).json({data: updateResponse.data, message: updateResponse.message});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getDirectors = async (req, res) => {
    try {
        const response = await directorDAO.getDirectors();
        return res.status(response.code).json({message: response.message, data: response.data});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
