CREATE TABLE menu_item (
    id          BIGSERIAL     PRIMARY KEY,
    category    VARCHAR(40)   NOT NULL,
    name        VARCHAR(120)  NOT NULL,
    description VARCHAR(500)  NOT NULL,
    price       NUMERIC(10,2) NOT NULL CHECK (price > 0),
    available   BOOLEAN       NOT NULL DEFAULT TRUE
);

CREATE INDEX idx_menu_item_category ON menu_item (category);
