require('dotenv').config();
const { Client } = require('pg');

async function showData () {
  const client = new Client();
  await client.connect();
  const res = await client.query('SELECT * FROM status_changes');
  console.log(res.rows);
  await client.end();
}
showData();
