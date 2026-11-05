package com.mauresto.backend.order.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record CreateOrderRequest(
        @NotBlank String customerName,
        @NotBlank String customerPhone,
        @NotEmpty @Valid List<OrderItemRequest> items) {
}
