# SBS Dashboard - Python ETL Pipeline

## Technology Stack
- **Python 3.10+**
- **Pandas**
- **SQLAlchemy**
- **psycopg2**
- **requests**
- **schedule**

## Project Structure
```
backend/python/
├── etl/
│   ├── __init__.py
│   ├── extract.py
│   ├── transform.py
│   └── load.py
├── config/
│   └── database.py
├── main.py
└── requirements.txt
```

## Data Sources
- **BCRP API** - Central Reserve Bank of Peru
- **SBS Reports** - Superintendencia de Banca, Seguros y AFP
- **Local CSV files**

## ETL Process
1. **Extract**: Fetch data from APIs and files
2. **Transform**: Clean, validate, and process data
3. **Load**: Insert into PostgreSQL database

## Run ETL
```bash
pip install -r requirements.txt
python main.py
```

## Scheduling
Use `schedule` library for automated data updates:
- Daily at 06:00 AM - FX rates
- Monthly at 01st - Payment data
- Quarterly - Institution reports