import User from './user';

module.exports = {
  getUser: (req, res) => {
    User.findOne({ githubID: req.cookies.user }, (err, person) => {
      if (err) {
        console.log(err);
        res.status(404).send();
      } else {
        res.json(person);
      }
    });
  },
};
