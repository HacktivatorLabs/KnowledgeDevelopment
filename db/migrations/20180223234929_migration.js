
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('cards',
      (table) => {
          table.increments('id').primary()
          table.string('title')
          table.string('description')
          table.string('url')
          table.string('status')
          table.foreign('user_id')
            .references('users.id')
          table.foreign('taxon_id')
            .references('taxonomy.id')
      }),

    knex.schema.createTableIfNotExists('users',
      (table) => {
          table.increments('id').primary()
          table.string('username')
      }),

    knex.schema.createTableIfNotExists('taxonomy',
      (table) => {
          table.increments('id').primary()
          table.string('subject')
          table.integer('parent_id')
      }),

    knex.schema.createTableIfNotExists('library',
      (table) => {
          table.increments('id').primary()
          table.foreign('card_id')
            .references('cards.id')
          table.foreign('taxon_id')
            .references('taxonomy.id')
      })
  ])
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('cards'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('taxonomy'),
    knex.schema.dropTable('library')
  ])
};
