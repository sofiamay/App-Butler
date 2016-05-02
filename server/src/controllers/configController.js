import Config from '../models/config.js';

module.exports = {
  // all methods - createOne, delete, removeOne, signIn, signUp, checkAuth
  createOne: (req, res, cb) => {
    const newConfig = req.body;
    Config.create(newConfig, (err, data) => {
      if (err) {
        if (cb) { cb(err, null); }
        res.json(err);
      } if (cb) { cb(null, err); }
      res.json(data);
    });
  },

  updateOne: (req, res, cb) => {
    const query = { _id: req.params.id };
    const updatedProps = req.body;
    const options = {
      new: true,
      upsert: true,
    };

    Config.findOneAndUpdate(query, updatedProps, options, (err, data) => {
      if (err) {
        if (cb) { cb(err, null); }
        res.json(err);
      } if (cb) { cb(null, data); }
      res.json(data);
    });
  },

  removeOne: (req, res, cb) => {
    const query = { _id: req.params.id };
    Config.findOneAndRemove(query, (err, data) => {
      if (err) {
        if (cb) { cb(err, null); }
        res.json(err);
      } if (cb) { cb(null, data); }
      res.json(data);
    });
  },

  retrieveOne: (req, res, cb) => {
    const query = { _id: req.params.id };
    Config.findOne(query, (err, data) => {
      if (err) {
        res.json(err);
        cb(err, null);
      }
      cb(null, data);
      res.json(data);
    });
  },

  retrieveAll: (req, res, cb) => {
    const query = req.query;
    Config.find(query, (err, data) => {
      if (err) {
        if (cb) { cb(err, null); }
        res.json(err);
      }
      if (cb) { cb(null, data); }
      res.json(data);
    });
  },
};
