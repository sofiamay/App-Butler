import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const configSchema = new Schema({
  user: String,
  data: {
    serverType: String,
    appName: String,
    serverSettings: {
      port: String,
    },
    middleware: {
      morgan: Boolean,
      cookieparser: Boolean,
      bodyparserJson: Boolean,
      bodyparserUrlencoded: Boolean,
    },
    routers: [{
      id: String,
      startPoint: String,
      endpoints: [{}],
      name: String,
    }],
    github: {
      repoName: String,
      privacy: Boolean,
      description: String,
    },
  },
});

configSchema.pre('save', (next) => {
  next();
});

export default mongoose.model('Config', configSchema);

