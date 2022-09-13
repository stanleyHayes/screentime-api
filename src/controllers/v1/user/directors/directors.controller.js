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
