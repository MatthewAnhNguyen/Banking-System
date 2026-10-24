# Database Schema

```mermaid
erDiagram
    USERS ||--o{ ACCOUNTS : owns
    ACCOUNTS ||--o{ TRANSACTIONS : source_account
    ACCOUNTS ||--o{ TRANSACTIONS : target_account

    USERS {
        BIGINT id PK
        VARCHAR username UK
        VARCHAR email UK
        VARCHAR password
        VARCHAR role
        DATETIME created_at
    }

    ACCOUNTS {
        BIGINT id PK
        VARCHAR account_number UK
        DECIMAL balance
        VARCHAR account_type
        VARCHAR status
        BIGINT user_id FK
        DATETIME created_at
    }

    TRANSACTIONS {
        BIGINT id PK
        VARCHAR transaction_type
        DECIMAL amount
        DATETIME transaction_date
        VARCHAR status
        BIGINT source_account_id FK
        BIGINT target_account_id FK
    }