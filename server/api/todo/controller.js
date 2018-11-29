exports.index = function(req, res) {
  return res.json(200, 'hello');
};

// Creates a new client in the DB.
exports.create = function(req, res) {
  return res.json(200, 'hellocreate');
};
