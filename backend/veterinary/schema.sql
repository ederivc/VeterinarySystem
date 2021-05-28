-- DROP TABLE IF EXISTS User;
-- DROP TABLE IF EXISTS Appointment;

CREATE TABLE User (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    phone VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Guest(
  guest_id INTEGER PRIMARY KEY AUTOINCREMENT,
  guest_lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
)

-- CREATE TABLE Appointment (
--   appointment_id INTEGER PRIMARY KEY AUTOINCREMENT,
--   user_id INTEGER NOT NULL,
--   appointment_date DATETIME,
--   FOREIGN KEY (user_id) REFERENCES User(user_id)
-- );

CREATE TABLE Appointment (
  appointment_id INTEGER PRIMARY KEY AUTOINCREMENT,
  appointment_date DATETIME,
);

CREATE TABLE AppointmentUser (
  appointment_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  descripcion VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES User(user_id),
  FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id)
);



-- INSERT INTO User (email, password, first_name, last_name, phone) VALUES ("user", "pass", "first", "last", "3432434")