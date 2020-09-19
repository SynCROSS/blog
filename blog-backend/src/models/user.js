const mongoose = require('C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/mongoose');
const bcrypt = require('bcrypt');
const jwt = require('C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/jsonwebtoken');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  hPassword: String,
});

UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hPassword = hash;
};
UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hPassword);
  return result; // true / false
};
UserSchema.methods.serialize = function () {
  // To Remove the hashed password field
  const data = this.toJSON();
  // console.log(data);
  delete data.hPassword;
  return data;
};
UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '5d', // 3day
    },
  );
  return token;
};
UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
