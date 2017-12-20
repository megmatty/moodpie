const Mood = require('./models/moods');
const Activity = require('./models/activity');

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
			activity: 'work',
			emoji: ':grinning:'
		},
		{
			activity: 'videogames',
			emoji: ':worried:'
		},
	]
);