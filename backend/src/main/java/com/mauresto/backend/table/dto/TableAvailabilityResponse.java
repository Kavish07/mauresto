package com.mauresto.backend.table.dto;

import com.mauresto.backend.table.RestaurantTable;

public record TableAvailabilityResponse(String id, int seats, String location, Boolean available) {

    public static TableAvailabilityResponse withoutAvailability(RestaurantTable table) {
        return new TableAvailabilityResponse(table.getId(), table.getSeats(), table.getLocation(), null);
    }

    public static TableAvailabilityResponse of(RestaurantTable table, boolean available) {
        return new TableAvailabilityResponse(table.getId(), table.getSeats(), table.getLocation(), available);
    }
}
