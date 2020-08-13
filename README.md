# Load Status Changes

## Set up
1. `cp .env-template .env`
2. Create database and user if needed 
```
CREATE DATABASE populus;
CREATE USER populus WITH PASSWORD 'secret';
GRANT ALL PRIVILEGES ON DATABASE populus TO populus;
```
3. Add database name, username, password and other connection details to .env

# Run 
```
nvm use 
npm install
npm run start
```

For subsequent runs
```
npm run loadData status-changes-[TIMESTAMP].json
```
 