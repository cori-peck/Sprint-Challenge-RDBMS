
exports.up = function(knex) {
  return knex.schema.createTable('actions', function(tbl) {
      tbl.increments();
      tbl.string('action_description', 300).notNullable();
      tbl.text('notes');
      tbl.integer('complete');
      tbl
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('actions')
};
