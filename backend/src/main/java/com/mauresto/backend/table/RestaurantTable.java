package com.mauresto.backend.table;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "restaurant_table")
public class RestaurantTable {

    @Id
    private String id;

    @Column(nullable = false)
    private int seats;

    @Column(nullable = false)
    private String location;

    protected RestaurantTable() {
    }

    public RestaurantTable(String id, int seats, String location) {
        this.id = id;
        this.seats = seats;
        this.location = location;
    }

    public String getId() {
        return id;
    }

    public int getSeats() {
        return seats;
    }

    public String getLocation() {
        return location;
    }
}
