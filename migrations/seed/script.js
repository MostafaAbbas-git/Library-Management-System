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

async function seedBorrowings() {
  const books = await pool.query('SELECT id FROM books');
  const borrowers = await pool.query('SELECT id FROM borrowers');

  for (let i = 0; i < 10; i++) {
    const bookId =
      books.rows[faker.datatype.number({ min: 0, max: books.rows.length - 1 })]
        .id;
    const borrowerId =
      borrowers.rows[
        faker.datatype.number({ min: 0, max: borrowers.rows.length - 1 })
      ].id;
    const checkoutDate = faker.date.past(1);
    const dueDate = faker.date.future(1, checkoutDate);

    await pool.query(
      'INSERT INTO borrowings (book_id, borrower_id, checkout_date, due_date) VALUES ($1, $2, $3, $4)',
      [bookId, borrowerId, checkoutDate, dueDate]
    );
  }
}

async function seed() {
  try {
    await seedBooks();
    await seedBorrowers();
    await seedBorrowings();
    console.log('Seeding completed!');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    pool.end();
  }
}

seed();
