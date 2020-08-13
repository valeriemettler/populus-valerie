require('dotenv').config();
const { Client } = require('pg');

const vehicleEnumTypeText = `
CREATE TYPE vehicle_type_options 
AS ENUM ('bicycle', 'scooter');
`;

const propulsionEnumTypeText = `
CREATE TYPE propulsion_type_options 
AS ENUM ('human', 'electric_assist', 'electric', 'combustion');
`;

const eventEnumTypeText = `
CREATE TYPE event_type_options 
AS ENUM ('available', 'reserved', 'unavailable', 'removed');
`;

const eventReasonEnumTypeText = `
CREATE TYPE event_reason_type_options 
AS ENUM (
	'service_start', 'user_drop_off', 'rebalance_drop_off', 'maintenance_drop_off', 'agency_drop_off', 'user_pick_up', 'maintenance', 'low_battery', 'service_end', 'rebalance_pick_up', 'maintenance_pick_up', 'agency_pick_up'
	);
`;

const createTypes = async () => {
  const client = new Client();
  await client.connect();
 
  await client.query(vehicleEnumTypeText);
  await client.query(propulsionEnumTypeText);
  await client.query(eventEnumTypeText);
  await client.query(eventReasonEnumTypeText);

  await client.end();
}
createTypes();
