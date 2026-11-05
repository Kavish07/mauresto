package com.mauresto.backend.order.dto;

import com.mauresto.backend.order.OrderItem;

import java.math.BigDecimal;

public record OrderItemResponse(
        Long menuItemId,
        String menuItemName,
        int quantity,
        BigDecimal unitPrice,
        BigDecimal subtotal) {

    public static OrderItemResponse from(OrderItem orderItem) {
        return new OrderItemResponse(
                orderItem.getMenuItem().getId(),
                orderItem.getMenuItem().getName(),
                orderItem.getQuantity(),
                orderItem.getUnitPrice(),
                orderItem.getSubtotal());
    }
}
