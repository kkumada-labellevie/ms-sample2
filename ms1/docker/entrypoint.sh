#!/bin/sh

echo "Waiting for PostgreSQL..."
until nc -z ms1-postgres 5432; do
  sleep 2
done

echo "Running migration..."
npm run drizzle:migrate

echo "Registering Debezium PostgreSQL Connector..."
curl -X POST -H "Content-Type: application/json" \
--data '{
  "name": "postgres-connector-ms1",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "tasks.max": "1",
    "database.hostname": "ms1-postgres",
    "database.port": "5432",
    "database.user": "debezium",
    "database.password": "debezium",
    "database.dbname": "ms_db",
    "database.server.name": "dbserver1",
    "slot.name": "debezium_slot1",
    "publication.name": "debezium_publication1",
    "plugin.name": "pgoutput",
    "topic.prefix": "dbserver1",
    "database.history.kafka.bootstrap.servers": "broker1:9092,broker2:9093",
    "database.history.kafka.topic": "dbhistory-ms1.fulfillment",
    "schema.history.internal.kafka.bootstrap.servers": "broker1:9092,broker2:9093",
    "schema.history.internal.kafka.topic": "schema-changes-ms1.postgres",
    "include.schema.changes": "true"
  }
}' \
http://debezium:8083/connectors || echo "Connector postgres-connector-ms1 already exists or failed"

echo "Starting NestJS app..."
npm run start:dev
