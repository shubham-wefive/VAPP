const mongoose = require("mongoose");
const Schema = mongoose.Schema;

tokenSchema = new Schema({
    userId: {
        // type: Schema.Types.ObjectId,
        type: Number,
        required: true,
        // ref: "user",
    },
    otp: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});

Token = mongoose.model("token", tokenSchema);

module.exports = Token;