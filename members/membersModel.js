const Db = require('../data/db.config');


module.exports = {
  get,
  getById,
  insert,
  remove,
};

function get() {
    return Db('members')
}

function getById(id) {
    return Db('members').where("id",id)
}

function insert(user){
    return Db('members')
        .insert(user)
        .then(val =>{
            // console.log(val[0])
            return Db("members")
                .where({id:val[0]})
        })
}

function remove(id) {
    return Db('members').where('id', id).del()
}
