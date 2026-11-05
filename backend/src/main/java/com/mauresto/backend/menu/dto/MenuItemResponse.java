package com.mauresto.backend.menu.dto;

import com.mauresto.backend.menu.MenuItem;

import java.math.BigDecimal;

public record MenuItemResponse(
        Long id,
        String category,
        String name,
        String description,
        BigDecimal price) {

    public static MenuItemResponse from(MenuItem menuItem) {
        return new MenuItemResponse(
                menuItem.getId(),
                menuItem.getCategory(),
                menuItem.getName(),
                menuItem.getDescription(),
                menuItem.getPrice());
    }
}
