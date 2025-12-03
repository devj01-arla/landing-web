-- Script SQL para crear las tablas manualmente en PostgreSQL
-- Este script puede ejecutarse directamente en tu base de datos PostgreSQL
-- Útil cuando necesitas crear las tablas sin usar Prisma Migrate

-- Tabla de clientes
CREATE TABLE IF NOT EXISTS tbl_clientes (
  id SERIAL PRIMARY KEY,
  empresa VARCHAR(255) NOT NULL,
  correo VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  activo INTEGER NOT NULL DEFAULT 0, -- 0 = inactivo, 1 = activo
  fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_modificacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_correo ON tbl_clientes(correo);
CREATE INDEX IF NOT EXISTS idx_empresa ON tbl_clientes(empresa);

-- Trigger para actualizar fecha_modificacion automáticamente
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_modificacion = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tbl_clientes_modtime BEFORE UPDATE ON tbl_clientes
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Tabla de tokens de verificación de email
CREATE TABLE IF NOT EXISTS tbl_email_verification_tokens (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES tbl_clientes(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_token ON tbl_email_verification_tokens(token);
CREATE INDEX IF NOT EXISTS idx_cliente_id ON tbl_email_verification_tokens(cliente_id);

-- Tabla de tokens de reset de contraseña
CREATE TABLE IF NOT EXISTS tbl_password_reset_tokens (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES tbl_clientes(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_token ON tbl_password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_cliente_id ON tbl_password_reset_tokens(cliente_id);

