-- SBS Dashboard - PostgreSQL Schema
-- Drop tables if they exist
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS institutions CASCADE;
DROP TABLE IF EXISTS fx_rates CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'analyst',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Institutions table
CREATE TABLE institutions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) CHECK (type IN ('bank', 'mfi', 'coop', 'wallet')),
    color VARCHAR(7) NOT NULL, -- Hex color code
    market_share DECIMAL(5,2),
    growth DECIMAL(5,2),
    is_outlier BOOLEAN DEFAULT FALSE,
    operations BIGINT,
    amount DECIMAL(15,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    month VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    cce DECIMAL(10,2),
    yape DECIMAL(10,2),
    plin DECIMAL(10,2),
    other DECIMAL(10,2),
    total_operations INTEGER,
    total_amount DECIMAL(15,2),
    avg_ticket DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FX rates table
CREATE TABLE fx_rates (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    rate DECIMAL(10,4) NOT NULL,
    ma20 DECIMAL(10,4),
    ma50 DECIMAL(10,4),
    bollinger_upper DECIMAL(10,4),
    bollinger_lower DECIMAL(10,4),
    is_anomaly BOOLEAN DEFAULT FALSE,
    event VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_payments_date ON payments(date);
CREATE INDEX idx_fx_rates_date ON fx_rates(date);
CREATE INDEX idx_institutions_type ON institutions(type);

-- Sample data insertion
INSERT INTO institutions (name, type, color, market_share, growth, is_outlier, operations, amount)
VALUES 
    ('BCP', 'bank', '#FF6D01', 32.5, 4.2, FALSE, 1250000, 8500000000),
    ('BBVA', 'bank', '#004C9E', 18.3, 2.8, FALSE, 980000, 5200000000),
    ('Interbank', 'bank', '#00A650', 12.1, 3.5, FALSE, 650000, 3100000000),
    ('Scotiabank', 'bank', '#C8102E', 9.8, -0.5, FALSE, 420000, 2500000000),
    ('BanBif', 'bank', '#FF8C00', 6.2, 1.2, FALSE, 280000, 1600000000),
    ('Banco de la Nación', 'bank', '#005CA9', 8.5, 5.1, TRUE, 350000, 2200000000);