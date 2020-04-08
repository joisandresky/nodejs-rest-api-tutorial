module.exports = function (app) {
  app.use("/api/v1/todos", require('./api/todo'));
  app.use("/api/v1/users", require('./api/user'));
}