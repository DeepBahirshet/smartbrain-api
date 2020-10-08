const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'c9ea4601b95e45099b3c027cdb4c18b7'
});

let flag = false;
const handleApiCall = (req, res) => 
{
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => 
	{
		flag = true;
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	if (flag === true)
	{
	const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
    flag = false;
  })
  .catch(err => res.status(400).json('unable to get entries'))
	}
}
	// else
	// {
	// 	const { id } = req.body;
 //  db('users').where('id', '=', id)
 //  .returning('entries')
 //  .then(entries => {
 //    res.json(entries[0]);
 //  })
 //  .catch(err => res.status(400).json('unable to get entries'))
	// }
  

module.exports = {
  handleImage,
  handleApiCall
}