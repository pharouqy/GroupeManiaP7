const passwordSchema = require('./modelPssword');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ message: 'Mot de passe incorrect' });
    } else {
        next();
    }
};