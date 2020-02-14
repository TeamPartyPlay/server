const express = require('express');
const UserModel = require('./../../models/User');
const ImageModel = require('./../../models/Image');
const tokenAuth = require('./../../middleware/tokenAuth');

const router = express.Router();

router.post('/', tokenAuth, async (req, res) => {
	// https://codeburst.io/asynchronous-file-upload-with-node-and-react-ea2ed47306dd
	// https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d
    try {
        const id = req.user._id;
        const image = req.files.file;
        if(id && image){
            let imageModel = new ImageModel();
            imageModel.data = image.data;
            imageModel.mimetype = image.mimetype;
            imageRes = await imageModel.save();
            let user = await UserModel.findById(id);
            await ImageModel.deleteOne({ _id: user.image });
            user.image = imageModel._id;
            user.save();
        } else throw Error('User or Image is not set');
    } catch (error) {
        res.status(500).send({error})
    }
	
});

router.get('/:userId', async (req, res) => {
	try {
		const id = req.params.userId || req.user._id;
		if (id == 'undefined') throw Error("User not defined");
		const user = await UserModel.findById(id).lean();
        if (!user) throw Error("User not defined");
        else if (user.image) {
			let image = await ImageModel.findById(user.image).lean();
			res.contentType(image.mimetype);
			res.end(Buffer.from(image.data.buffer, 'base64'));
		}
	} catch (error) {
		res.status(500).send({error});
	}
});

module.exports = router;