# Peruvian Payment Analytics - Backend Architecture

## Technology Stack
- **Java 17+**
- **Spring Boot 3.x**
- **Spring Data JPA**
- **PostgreSQL 14+**
- **Maven**

## Project Structure
```
backend/java/
├── src/
│   ├── main/
│   │   ├── java/com/sbs/dashboard/
│   │   │   ├── controller/
│   │   │   ├── service/
│   │   │   ├── repository/
│   │   │   ├── model/
│   │   │   └── config/
│   │   └── resources/
│   │       └── application.yml
```

## API Endpoints

### Payment System
- `GET /api/v1/payments/overview` - Payment system overview
- `GET /api/v1/payments/trends` - Monthly payment trends
- `GET /api/v1/payments/anomalies` - Anomaly detection

### Institutions
- `GET /api/v1/institutions` - List all institutions
- `GET /api/v1/institutions/{id}/metrics` - Institution metrics
- `GET /api/v1/institutions/market-share` - Market share analysis

### FX Market
- `GET /api/v1/fx/current` - Current exchange rate
- `GET /api/v1/fx/historical` - Historical data
- `GET /api/v1/fx/volatility` - Volatility analysis

## Database Schema

### tables
- `payments` - Payment transactions
- `institutions` - Financial institutions
- `fx_rates` - Exchange rates
- `users` - Application users

## Run Application
```bash
mvn clean install
mvn spring-boot:run
```