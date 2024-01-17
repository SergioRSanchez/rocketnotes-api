Ao executar a primeira vez, será criado o banco de dados.

Use o comando `npx knex migrate:make createNotes` para criar a migration de create Notes:

```js
exports.up = knex => knex.schema.createTable("notes", table => {
  table.increments("id");
  table.text("title");
  table.text("description");

  table.integer("user_id").references("id").inTable("users");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("notes");

```
Também deve ser executado `npx knex migrate:make createTags`:
```js
exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id");
  table.text("name").notNullable();

  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
  table.integer("user_id").references("id").inTable("users");
});


exports.down = knex => knex.schema.dropTable("tags");

```
e `npx knex migrate:make createLinks`:
```js
exports.up = knex => knex.schema.createTable("links", table => {
  table.increments("id");
  table.text("url").notNullable();

  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");

  table.timestamp("created_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("links");

```
Para executar essas migration e realmente criar as tabelas no nosso db usamos o `npx knex migrate:latest`, ou então `npm run migrate`.
