const { Pool } = require('pg');
const faker = require('faker');

const pool = new Pool({
  host: 'localhost',
  database: 'lib_mng_sys',
  user: 'postgres',
  password: '123456',
});

async function seedBooks() {
  for (let i = 0; i < 10; i++) {
    const title = faker.commerce.productName();
    const author = faker.name.findName();
    const isbn = faker.random.alphaNumeric(13);
    const available_quantity = faker.datatype.number({ min: 1, max: 20 });
    const shelf_location = faker.random.alphaNumeric(10);

    await pool.query(
      'INSERT INTO books (title, author, isbn, available_quantity, shelf_location) VALUES ($1, $2, $3, $4, $5)',
      [title, author, isbn, available_quantity, shelf_location]
    );
  }
}

async function seedBorrowers() {
  for (let i = 0; i < 10; i++) {
    const name = faker.name.findName();
    const email = faker.internet.email();

    await pool.query('INSERT INTO borrowers (name, email) VALUES ($1, $2)', [
      name,
      email,
    ]);
  }
}

async function seed() {
  try {
    await seedBooks();
    await seedBorrowers();
    console.log('Seeding completed!');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    pool.end();
  }
}

seed();
