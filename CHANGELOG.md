# Changelog

## [0.0.3-alpha] - 2025-06-26
### Added
- New `HashPassword()` method to `PasswordUtil` for hashing plain text passwords
- New standardized response methods for HTTP status:
  - `202 Accepted`
  - `503 Service Unavailable`
- Added `joi` as a new validation dependency for DTOs
- Added `HelloWorld` module as functional example:
  - `hello_world.dto.js` for input validation using Joi
  - `hello_world.service.js` for business logic
  - `hello_world.repository.js` for data access layer (dummy)
  - `hello_world.model.js` as base model structure (dummy)
- Added new `GET /hello` and `GET /set-name?name=...` routes as sample endpoints

### Changed
- Updated `HelloWorldController` with two new methods: `SetName()` and `GetHello()`
- Updated `hello_world.route.js` to include new routes
- Renamed controller, route, and util file (`*_[FOLDER NAME].js` to `*.[FOLDER NAME].js`)

### Fixed
- N/A

## [0.0.2-alpha] - 2025-02-26
### Added
- Standardized response handling (`response_utils.js`)
- Installed dependencies: `bcrypt`, `crypto-js`, `dotenv`, `express`, `mysql2`, `sequelize`
- Added environment variable: `ENCRYPT_KEY` & `APP_HOST` (stored in `.env.example`)
- Password comparison utility (`password_util.js`)
- AES encryption & decryption utility (`encryption_util.js`)
- HTTP status utility (`http_status_util.js`)
- API response documentation added to `README.md`
- Created `app.js` with a basic Express server and route (`/`)
- Created `server.js` to initialize and start the server
- Implemented `ResponseUtil` in `app.js`
- Created `HelloWorldController` to manage responses separately
- Added `hello_world_route.js` to modularize routing
- Introduced `SetupNotFoundHandler()` (`app.js`) to return 404 responses
- Add database connection `database/index.js`
- Implement `ConnectDatabase()` function in `server.js` for automatic DB sync
- Add error handling for database connection

### Changed
- N/A

### Fixed
- N/A

## [0.0.1-alpha] - 2025-02-24
### Added
- Initial project setup

### Changed
- N/A

### Fixed
- N/A