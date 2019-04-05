
exports.up = function(knex) {
  return knex.schema.createTable('projects', function(tbl) {
      tbl.increments();
      tbl.string('name', 128).notNullable().unique();
      tbl.text('description');
      tbl.integer('complete');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('projects')
};
