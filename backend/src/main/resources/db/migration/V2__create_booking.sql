CREATE TABLE booking (
    id             BIGSERIAL    PRIMARY KEY,
    table_id       VARCHAR(10)  NOT NULL REFERENCES restaurant_table(id),
    customer_name  VARCHAR(120) NOT NULL,
    customer_phone VARCHAR(30)  NOT NULL,
    party_size     INTEGER      NOT NULL CHECK (party_size > 0),
    booking_date   DATE         NOT NULL,
    time_slot      VARCHAR(20)  NOT NULL,
    status         VARCHAR(20)  NOT NULL DEFAULT 'CONFIRMED',
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX uq_booking_table_date_slot_active
    ON booking (table_id, booking_date, time_slot)
    WHERE status = 'CONFIRMED';

CREATE INDEX idx_booking_date_slot ON booking (booking_date, time_slot);
