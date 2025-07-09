-- V1__initial_schema.sql

INSERT INTO roles (name) VALUES ('ROLE_USER') ON CONFLICT (name) DO NOTHING;
INSERT INTO roles (name) VALUES ('ROLE_ADMIN') ON CONFLICT (name) DO NOTHING;

INSERT INTO users (username, password) VALUES ('admin', '$2b$12$qKj/3xcjjAhKrzOYi06WmuOXIkyDwKWqqWiu9UFW88lXoPiHEON.W') ON CONFLICT (username) DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.username = 'admin' AND r.name = 'ROLE_ADMIN'
ON CONFLICT (user_id, role_id) DO NOTHING;
