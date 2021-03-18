const mongoose = require('mongoose');

const plantsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    plantId: {
        type: String,
        required: true
    },
    plantHumidity: {
        type: String
    },
    tempWarning: {
        type: Boolean

    },
    drySoil: {
        type: Boolean

    }

})

//Model will allow us to directly work with the DB
module.exports = mongoose.model("plant", plantsSchema)