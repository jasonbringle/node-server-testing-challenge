const Db = require('../data/db.config');


module.exports = {
  get,
  insert,
  remove,
};

function get() {
    return Db('members')
}

function insert(user){
    return Db('members')
        .insert(user)
        .then(val =>{
            return Db("members")
                .where({id:val[0]})
        })
}

function remove(id) {
    return Db('members').where('id', id).del()
}
