require('dotenv').config();
const { Client } = require('pg');
const fs = require("fs");

const loadData = () => {
  const args = process.argv.slice(2);
  const inputFile = args[0];
  console.log(`Loading data from ${inputFile}`);
  
  fs.readFile(inputFile, function (err, data) {
    if (err) {
      return console.error(err);
    };

    const parsedData = JSON.parse(data);

    const insertStatementText = `
      INSERT INTO status_changes
      (
        provider_id,
        provider_name,
        device_id,
        vehicle_id,
        vehicle_type,
        propulsion_type,
        event_type,
        event_type_reason,
        event_time,
        publication_time,
        event_location,
        battery_pct,
        associated_trips
      ) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
    `;

    (async () => {
      const client = new Client();
      await client.connect();

      for (let i = 0; i < parsedData.length; i++) {
        const item = parsedData[i];
        await client.query(insertStatementText, [
          item.provider_id,
          item.provider_name,
          item.device_id,
          item.vehicle_id,
          item.vehicle_type,
          item.propulsion_type,
          item.event_type,
          item.event_type_reason,
          item.event_time,
          item.publication_time,
          item.event_location,
          item.battery_pct,
          item.associated_trips
        ]);
      }

      await client.end();
    })();
  });
};
loadData();

