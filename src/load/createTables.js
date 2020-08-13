require('dotenv').config();
const { Client } = require('pg');

const check = `CHECK (
  (
      event_type = 'available' 
      AND (
        event_type_reason = 'rebalance_drop_off' 
        OR event_type_reason = 'service_start' 
        OR event_type_reason = 'user_drop_off' 
        OR event_type_reason = 'maintenance_drop_off' 
        OR event_type_reason = 'agency_drop_off'
      )
    ) OR (
      event_type = 'reserved' 
      AND (
        event_type_reason = 'user_pick_up'
      )
    ) OR (
      event_type = 'unavailable' 
      AND (
        event_type_reason = 'maintenance'
        OR event_type_reason = 'low_battery'
      )
    ) OR (
      event_type = 'removed'
      AND (
        event_type_reason = 'service_end'
        OR event_type_reason = 'rebalance_pick_up'
        OR event_type_reason = 'maintenance_pick_up'
        OR event_type_reason = 'agency_pick_up'
      )
    )  
  )
`;

const createTableText = `
  CREATE TABLE status_changes (
    id SERIAL PRIMARY KEY,
    provider_id UUID NOT NULL,
    provider_name TEXT NOT NULL,
    device_id UUID NOT NULL,
    vehicle_id TEXT NOT NULL,
    vehicle_type vehicle_type_options NOT NULL,
    propulsion_type propulsion_type_options ARRAY NOT NULL,
    event_type event_type_options NOT NULL,
    event_type_reason event_reason_type_options NOT NULL,
    ${check},
    event_time BIGINT NOT NULL,
    publication_time BIGINT,
    event_location JSONB NOT NULL,
    battery_pct FLOAT8
    CHECK (battery_pct >= 0 AND battery_pct <= 1),
    associated_trips UUID ARRAY
  );
`;

const createTables = async () => {
  const client = new Client();
  await client.connect();
  await client.query(createTableText);
  await client.end();
}
createTables();

