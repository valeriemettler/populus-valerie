require('dotenv').config();
const { Client } = require('pg');

async function removeTables () {
  const client = new Client();
  await client.connect();
  await client.query('DROP TABLE IF EXISTS status_changes;');
  await client.end();
}
removeTables();
