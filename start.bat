MD c:\data
MD c:\data\db
@echo storage: > config.conf
@echo.  dbPath: "C:/data/db" >> config.conf
@timeout /t 1
@start mongod --config config.conf
@timeout /t 3
@start npm install
@timeout /t 5
@start nodemon