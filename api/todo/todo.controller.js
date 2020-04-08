const Q = require('q');
const Todo = require('./todo.model');
const _ = require('lodash');

exports.index = function (req, res) {
  var page = Number(req.query.page) || 1;
  var limit = Number(req.query.limit) || 10;
  var skip = (page - 1) * limit;

  Q.all([
    Todo.count(),
    Todo.find().skip(skip).limit(limit)
  ]).spread(function (total, todos) {
    res.status(200).json({ total, todos });
  }).catch(function (err) {
    res.status(500).json(err);
  });
}

// api/v1/todos/291389123
exports.show = function (req, res) {
  Todo.findOne({ _id: req.params.id }).exec(function (err, todo) {
    if (err) return res.status(500).json(err);
    if (!todo) return res.status(404).json({ message: "Data Tidak Ditemukan!" });

    res.status(200).json(todo);
  })
}

exports.create = function (req, res) {
  Todo.create(req.body, function (err, todo) {
    if (err) return res.status(500).json({ error: err, success: false });

    res.status(201).json({ message: "Berhasil Menyimpan Data", success: true });
  })
}

exports.update = function (req, res) {
  Todo.findOne({ _id: req.params.id }).exec(function (err, todo) {
    if (err) return res.status(500).json(err);
    if (!todo) return res.status(404).json({ message: "Data tidak Ditemukan!" });

    let updated = _.merge(todo, req.body);
    updated.save(function (err) {
      if (err) return res.status(500).json(err);

      res.status(200).json(updated);
    });
  })
}

exports.finish = function (req, res) {
  Todo.update({ _id: req.params.id }, { $set: { done: true } }, function (err, result) {
    if (err) return res.status(500).json(err);

    res.status(200).json(result);
  })
}

exports.destroy = function (req, res) {
  Todo.findOne({ _id: req.params.id }).exec(function (err, todo) {
    if (err) return res.status(500).json(err);
    if (!todo) return res.status(404).json({ message: "Data tidak Ditemukan!" });

    todo.remove(function (err) {
      if (err) return res.status(500).json(err);

      res.status(200).json({ message: "Data berhasil dihapus!" });
    })
  })
}