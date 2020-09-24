const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
    name: {
        type:String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    
},{timestamps: true}//whenever we create a new entry  through this schema it rec the exact time and store in database.
); 

module.exports = mongoose.model("Category", categorySchema);