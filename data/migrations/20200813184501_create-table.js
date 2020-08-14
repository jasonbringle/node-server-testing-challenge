const { table } = require("console");

exports.up = function(knex) {
  return knex.schema.createTable('members', tbl=> {
    tbl.increments()
    tbl.text('name', 128)
        .notNullable
        .unique
    tbl.text('hair_color', 128)
        .notNullable
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('members')
};
