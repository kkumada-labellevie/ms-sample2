# 起動メモ (後でDockerで設定する)
## Kafka起動
`cd ms-sample/kafka`  
`docker compose up`  
## ms1起動
`cd ms-sample/ms1`  
`docker compose up --build`  
`docker exec -it ms1-app sh`  
`npm run drizzle:migrate`  
`exit`  
`docker exec -it ms1-mysql sh`  
`mysql -u root -proot`  
`USE ms_db;`  
`SHOW TABLES;`  
`CREATE USER 'debezium'@'%' IDENTIFIED BY 'debezium';`  
`SELECT user, host FROM mysql.user WHERE user = 'debezium';`  
`GRANT SELECT, RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT, LOCK TABLES ON *.* TO 'debezium'@'%';`  
`FLUSH PRIVILEGES;`  
`exit`  
`exit`  
## ms1DBとDebeziumの連携
```
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
    "database.allowPublicKeyRetrieval":"true",
    "database.server.name": "dbserver1",
    "database.include.list": "ms_db",
    "topic.prefix": "dbserver1",
    "database.history.kafka.bootstrap.servers": "broker1:9092,broker2:9093",
    "database.history.kafka.topic": "dbhistory-ms1.fullfillment",
    "schema.history.internal.kafka.bootstrap.servers": "kafka:9092,broker2:9093",
    "schema.history.internal.kafka.topic": "schema-changes-ms1.mysql",
    "include.schema.changes": "true"
  }
}' \
http://localhost:8083/connectors
```
## ms2起動
`cd ms-sample/ms2`  
`docker compose up --build`  
`docker exec -it ms2-app sh`  
`npm run drizzle:migrate`  
`exit`  
`docker exec -it ms2-mysql sh`  
`mysql -u root -proot`  
`USE ms_db;`  
`SHOW TABLES;`  
`CREATE USER 'debezium'@'%' IDENTIFIED BY 'debezium';`  
`SELECT user, host FROM mysql.user WHERE user = 'debezium';`  
`GRANT SELECT, RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT, LOCK TABLES ON *.* TO 'debezium'@'%';`  
`FLUSH PRIVILEGES;`  
`exit`  
`exit`  
## ms2DBとDebeziumの連携
```
curl -X POST -H "Content-Type: application/json" \
--data '{
  "name": "mysql-connector-ms2",
    "config": {
    "connector.class": "io.debezium.connector.mysql.MySqlConnector",
    "tasks.max": "1",
    "database.hostname": "ms2-mysql",
    "database.port": "3306",
    "database.user": "debezium",
    "database.password": "debezium",
    "database.server.id": "184055",
    "database.allowPublicKeyRetrieval":"true",
    "database.server.name": "dbserver2",
    "database.include.list": "ms_db",
    "topic.prefix": "dbserver2",
    "database.history.kafka.bootstrap.servers": "broker1:9092,broker2:9093",
    "database.history.kafka.topic": "dbhistory-ms2.fullfillment",
    "schema.history.internal.kafka.bootstrap.servers": "kafka:9092,broker2:9093",
    "schema.history.internal.kafka.topic": "schema-changes-ms2.mysql",
    "include.schema.changes": "true"
  }
}' \
http://localhost:8083/connectors
```
## bff起動
`cd ms-sample/bff`  
`docker compose up --build`  
## URL
### Kafka UI
http://localhost:8080/
### Debezium
http://localhost:8083/connectors  
http://localhost:8083/connectors/mysql-connector-ms1/status  
http://localhost:8083/connectors/mysql-connector-ms2/status  
### ms1
http://localhost:3333/
### ms2
http://localhost:3334/
### bff
http://localhost:3000/
