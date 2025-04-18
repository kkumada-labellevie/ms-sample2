#!/bin/sh

echo "Waiting for MySQL..."
until nc -z ms1-mysql 3306; do
  sleep 2
done

echo "Running migration..."
npm run drizzle:migrate

echo "Registering Debezium MySQL Connector..."
curl -X POST -H "Content-Type: application/json" \
--data '{
  "name": "mysql-connector-ms1",
  "config": {
    "connector.class": "io.debezium.connector.mysql.MySqlConnector",
    "tasks.max": "1",
    "database.hostname": "ms1-mysql",
    "database.port": "3306",
    "database.user": "debezium",
    "database.password": "debezium",
    "database.server.id": "184054",
    "database.allowPublicKeyRetrieval": "true",
    "database.server.name": "dbserver1",
    "database.include.list": "ms_db",
    "topic.prefix": "dbserver1",
    "database.history.kafka.bootstrap.servers": "broker1:9092,broker2:9093",
    "database.history.kafka.topic": "dbhistory-ms1.fullfillment",
    "schema.history.internal.kafka.bootstrap.servers": "broker1:9092,broker2:9093",
    "schema.history.internal.kafka.topic": "schema-changes-ms1.mysql",
    "include.schema.changes": "true"
  }
}' \
http://debezium:8083/connectors || echo "Connector mysql-connector-ms1 already exists or failed"

echo "Starting NestJS app..."
npm run start:dev
