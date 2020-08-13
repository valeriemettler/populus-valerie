require('dotenv').config();
const { Client } = require('pg');

async function removeTypes () {
  const client = new Client();
  await client.connect();

  await client.query('DROP TYPE IF EXISTS vehicle_type_options;');
  await client.query('DROP TYPE IF EXISTS propulsion_type_options;');
  await client.query('DROP TYPE IF EXISTS event_type_options;');
  await client.query('DROP TYPE IF EXISTS event_reason_type_options;');

  await client.end();
}
removeTypes();
