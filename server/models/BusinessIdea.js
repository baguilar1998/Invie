const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

var businessideaSchema = new mongoose.Schema({

    name:  {
        type: String,
        require: true
    },

    objective:  {
        type: String,
        default: ''
    },

    description:  {
        type: String,
        default: ''
    },

    weblink:  {
        type: String,
        default: ''
    },

    tags:  [{
        type: String,
        uniqueitems: true
    }],

    owners: [{
        type: String
    }],

    typeOfBusiness: {
        type: String,
        default: ''
    },

    views: {
        type: String,
        default: 0
    },

    phoneNumber: {
        type: String,
        default: ''
    },

    messages: [{
      type:String,
    }],

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investee",
      require: true,
      unique: true
    }

});

businessideaSchema.plugin(validator);

module.exports = mongoose.model('BusinessIdea', businessideaSchema);
