DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Appointment;
DROP TABLE IF EXISTS AppointmentUser;
DROP TABLE IF EXISTS AppointmentGuest;
DROP TABLE IF EXISTS Admin;
DROP TABLE IF EXISTS Guest;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Animal;
DROP TABLE IF EXISTS Pedidos;
DROP TABLE IF EXISTS Token;

CREATE TABLE User (
    user_id VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    phone VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(150) NOT NULL,
    active INTEGER NOT NULL
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
  guest_id VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL,
  guest_name VARCHAR(255) NOT NULL,
  guest_lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL
);

CREATE TABLE Appointment (
  appointment_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  appointment_date DATETIME
);

-- INSERT INTO Appointment (appointment_date) VALUES ("2021-05-29 09:30 am");

CREATE TABLE Token (
  user_id VARCHAR(255) NOT NULL PRIMARY KEY UNIQUE,
  token TEXT,
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE AppointmentUser (
  appointment_id VARCHAR(255) NOT NULL PRIMARY KEY UNIQUE,
  user_id VARCHAR(255) NOT NULL,
  user_name VARCHAR(100),
  user_email VARCHAR(100),
  descripcion VARCHAR(100),
  appointment_date DATETIME NOT NULL,
  approved INTEGER,
  FOREIGN KEY (user_id) REFERENCES User(user_id),
  FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id)
);

-- INSERT INTO AppointmentUser (user_id, descripcion, appointment_date) VALUES (10, 10, 2021-05-29 09:30);

CREATE TABLE AppointmentGuest(
  appointment_id VARCHAR(255) NOT NULL PRIMARY KEY UNIQUE,
  guest_id VARCHAR(255) NOT NULL,
  guest_name VARCHAR(100),
  guest_email VARCHAR(100),
  appointment_date DATETIME NOT NULL,
  descripcion VARCHAR(100),
  approved INTEGER,
  FOREIGN KEY (guest_id) REFERENCES Guest(guest_id),
  FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id)
);

CREATE TABLE Products(
  product_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  cantidad INTEGER NOT NULL,
  price REAL NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  img VARCHAR(255) NOT NULL,
  marca VARCHAR(255) NOT NULL
);

CREATE TABLE Animal(
  animal_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  nombre_animal VARCHAR(255) NOT NULL UNIQUE,
  descripcion VARCHAR(255) NOT NULL UNIQUE,
  precio REAL,
  edad INTEGER,
  img VARCHAR(255) NOT NULL,
  tipo VARCHAR(255)
);

CREATE TABLE Pedidos(
  pedido_id VARCHAR(255) NOT NULL PRIMARY KEY UNIQUE,
  user_id VARCHAR(255) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  codigo_postal VARCHAR(255),
  date TEXT NOT NULL,
  products TEXT NOT NULL,
  status TEXT NOT NULL,
  total TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(user_id)
)

-- INSERT INTO Products (name, cantidad, price, descripcion) VALUES ("prod1", 20, 50.99, "Descripcion");


-- INSERT INTO User (user_id, email, password, first_name, last_name, phone, status) VALUES ("AD0901", "admin@mail.com", "pass", "Nombre", "Apellido", "13211434", "Administrador");