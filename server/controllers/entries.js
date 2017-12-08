const Entry = require('../models/entries');

//Find All Entries
exports.findAllEntries = function(req, res, next) {
	console.log('olive');
	console.log(req.user);
	Entry.find({})
		.exec((err, data) => {
	    if (err) {
	      res.send({ error: err });
	      return next(err);
	    }
	    return res.status(200).json({ data: data });
	})
}

//Find a Single user's Entries
exports.findUserEntries = function(req, res, next) {
	console.log('peaches');
	console.log(req.user.id);
	Entry.find({ userId: req.user.id })
		.exec((err, data) => {
	    if (err) {
	      res.send({ error: err });
	      return next(err);
	    }
	    return res.status(200).json({ data: data });
	})
}

