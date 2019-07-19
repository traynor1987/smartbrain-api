const clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '3e4ba38e3ef44262943593fea4fb4a8e'
   });

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL , req.body.input)
    .then(data => {
        res.json(data)
        console.log(data)
    })
    .catch(err => res.status(400).json('Unable to work with api'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body
    let found = false
    db('users').where('id', '=', id).increment('entries', 1)
    .returning('entries').then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json("unable to get entries"))
    }


module.exports = {
    handleApiCall: handleApiCall,
    handleImage: handleImage
}