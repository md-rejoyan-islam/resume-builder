## Fields

| Field Name | Type     | Description               |
| ---------- | -------- | ------------------------- |
| name       | string   | Tenant's name             |
| created_at | datetime | Tenant creation timestamp |
| updated_at | datetime | Last update timestamp     |

## Routes

| Method | Endpoint               | Description                                          | Access     |
| ------ | ---------------------- | ---------------------------------------------------- | ---------- |
| GET    | /tenants?search&fields | List all tenants with optional search and pagination | Admin only |
| POST   | /tenants               | Create a new tenant                                  | Admin User |
| GET    | /tenants/{id}?fields   | Retrieve a specific tenant's details                 | Admin only |
| PUT    | /tenants/{id}          | Update a specific tenant's details                   | Admin User |
| DELETE | /tenants/{id}          | Delete a specific tenant                             | Admin User |
