require('dotenv').config()
const server = require('./server.js');

const port = process.env.PORT || 5003;
server.listen(port, () =>{ console.log(`/*server up on port ${port}*/`)})