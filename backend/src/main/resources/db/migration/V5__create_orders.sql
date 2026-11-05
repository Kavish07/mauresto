CREATE TABLE orders (
    id             BIGSERIAL    PRIMARY KEY,
    customer_name  VARCHAR(120) NOT NULL,
    customer_phone VARCHAR(30)  NOT NULL,
    status         VARCHAR(20)  NOT NULL DEFAULT 'CONFIRMED',
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE TABLE order_item (
    id           BIGSERIAL     PRIMARY KEY,
    order_id     BIGINT        NOT NULL REFERENCES orders(id),
    menu_item_id BIGINT        NOT NULL REFERENCES menu_item(id),
    quantity     INTEGER       NOT NULL CHECK (quantity > 0),
    unit_price   NUMERIC(10,2) NOT NULL
);

CREATE INDEX idx_order_item_order ON order_item (order_id);
