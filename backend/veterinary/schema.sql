DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Appointment;
DROP TABLE IF EXISTS AppointmentUser;
DROP TABLE IF EXISTS AppointmentGuest;
DROP TABLE IF EXISTS Admin;
DROP TABLE IF EXISTS Guest;
-- DROP TABLE IF EXISTS Guest;
-- DROP TABLE IF EXISTS Admin;

CREATE TABLE User (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    phone VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(150) NOT NULL
    -- FOREIGN KEY (user_id) REFERENCES AppointmentUser(user_id)
);

-- INSERT INTO User (email, password, first_name, last_name, phone) VALUES ("user", "pass", "first", "last", "3432434")

CREATE TABLE Admin (
    admin_id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    phone VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(150) NOT NULL
);

CREATE TABLE Guest (
  guest_id INTEGER PRIMARY KEY AUTOINCREMENT,
  guest_name VARCHAR(255) NOT NULL,
  guest_lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
    status VARCHAR(150) NOT NULL
);

CREATE TABLE Appointment (
  appointment_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  appointment_date DATETIME
);

-- INSERT INTO Appointment (appointment_date) VALUES (2021-05-29 09:30);

CREATE TABLE AppointmentUser (
  appointment_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  descripcion VARCHAR(100),
  appointment_date DATETIME NOT NULL UNIQUE,
  FOREIGN KEY (user_id) REFERENCES User(user_id),
  FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id)
);

-- INSERT INTO AppointmentUser (user_id, descripcion, appointment_date) VALUES (10, 10, 2021-05-29 09:30);

CREATE TABLE AppointmentGuest(
  appointment_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  guest_id INTEGER NOT NULL,
  appointment_date DATETIME NOT NULL UNIQUE,
  descripcion VARCHAR(100),
  FOREIGN KEY (guest_id) REFERENCES Guest(guest_id),
  FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id)
);

-- CREATE TABLE Appointment (
--   appointment_id INTEGER PRIMARY KEY AUTOINCREMENT,
--   user_id INTEGER NOT NULL,
--   appointment_date DATETIME,
--   FOREIGN KEY (user_id) REFERENCES User(user_id)
-- );


-- INSERT INTO User (email, password, first_name, last_name, phone) VALUES ("user", "pass", "first", "last", "3432434")