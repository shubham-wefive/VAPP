const mongoose = require('mongoose');
const Schema = mongoose.Schema;

userSchema = new Schema({
	unique_id: {
		type: String,
	},
	email: {
		type: String,
        required: true,
	},
	phone: {
        type: Number,
        required: true,
    },
	username: {
		type: String,
        required: true,
	},
	password: {
		type: String,
        required: true,
	}
});

Users = mongoose.model('users', userSchema);

module.exports = Users;