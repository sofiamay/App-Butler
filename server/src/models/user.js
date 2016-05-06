import mongoose from 'mongoose';
// import relationship from 'mongoose-relationship';

const Schema = mongoose.Schema;

export default mongoose.model('User', new Schema({
  name: String,
  email: String,
  githubID: String,
  id: Number,
  key: String,
  files: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Config',
    default: [],
  }],
}));
