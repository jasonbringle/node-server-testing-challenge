
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('members').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('members').insert([
        {id: 1, name: 'Jim', hair_color: 'brown'},
        {id: 2, name: 'Brad', hair_color: 'blue'},
        {id: 3, name: 'Jewel', hair_color: 'blond'}
      ]);
    });
};
