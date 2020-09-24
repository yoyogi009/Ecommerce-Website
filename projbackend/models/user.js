var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require('uuid/v1');

  var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, //it make name an mandatory value
        maxlength: 32,   
        trim: true  // not accept spaces in b/w remove extra spaces that might come

    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true //if there is a duplicate email then mongo db infor us

    },
    userinfo: {
        type: String,
        trim: true
    },
    //TODO: come back here
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,  //greater the value more will be its privilage
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
  },{timestamps: true}
  );

  userSchema.virtual("password")
    .set(function(password){
        this._password = password  //pwd is made private using underscore
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password
    })

  userSchema.methods = {
     
    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },


      //securePass function will give encrypt pwd
    securePassword: function(plainpassword){
          if(!plainpassword) return "";
          try{
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
          }catch(err){
              return ""; //empty pwd can't be stored
          }
      }
  }

  module.exports = mongoose.model("User", userSchema)