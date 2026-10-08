package com.mauresto.backend.table;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TableRepository extends JpaRepository<RestaurantTable, String> {

    List<RestaurantTable> findBySeats(int seats);
}
