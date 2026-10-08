CREATE TABLE restaurant_table (
    id       VARCHAR(10)  PRIMARY KEY,
    seats    INTEGER      NOT NULL CHECK (seats > 0),
    location VARCHAR(100) NOT NULL
);
