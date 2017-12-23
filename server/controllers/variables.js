const Mood = require('../models/moods');
const Activity = require('../models/activity');

Mood.remove({}, function(err) {     
	console.log('collection removed')  
});
 
Mood.create(
	[
		{
			mood: 'happy',
			emoji: ':grinning:'
		},
		{
			mood: 'nervous',
			emoji: ':worried:'
		},
		{
			mood: 'angry',
			emoji: ':angry:'
		},
		{
			mood: 'optimistic',
			emoji: ':joy:'
		}
	]
);

Activity.remove({}, function(err) {     
	console.log('collection removed')  
});
 
Activity.create(
	[
		{
			activity: 'dancing',
			emoji: ':dancer:'
		},
		{
			activity: 'videogames',
			emoji: ':video_game:'
		},
	]
);

exports.getMoods = function(req, res, next) {
	Mood.find()
		.exec((err, moods) => {
	    if (err) {
	      res.send({ error: err });
	      return next(err);
	    }
	    return res.status(200).json({ moodList: moods });
	})
}

exports.getActivities = function(req, res, next) {
	Activity.find()
		.exec((err, activities) => {
	    if (err) {
	      res.send({ error: err });
	      return next(err);
	    }
	    return res.status(200).json({ activityList: activities });
	})
}


