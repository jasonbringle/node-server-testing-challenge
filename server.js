const express = require("express");
const memsRouter = require('./members/membersRouter.js')

const server = express();

server.use(express.json());

server.use('/api/members', memsRouter)

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
