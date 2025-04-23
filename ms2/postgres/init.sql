DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ms_db') THEN
    PERFORM pg_terminate_backend(pg_stat_activity.pid) 
    FROM pg_stat_activity 
    WHERE datname = 'ms_db' AND pid <> pg_backend_pid();
    EXECUTE 'CREATE DATABASE ms_db';
  END IF;
END $$;

CREATE USER debezium WITH PASSWORD 'debezium';

GRANT CONNECT ON DATABASE ms_db TO debezium;
GRANT USAGE ON SCHEMA public TO debezium;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO debezium;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT ON TABLES TO debezium;

ALTER ROLE debezium WITH REPLICATION;

GRANT CREATE ON DATABASE ms_db TO debezium;

ALTER ROLE debezium WITH SUPERUSER;
