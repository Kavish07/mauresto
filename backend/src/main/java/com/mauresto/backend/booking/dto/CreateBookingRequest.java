package com.mauresto.backend.booking.dto;

import com.mauresto.backend.booking.TimeSlot;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

public record CreateBookingRequest(
        @NotBlank String tableId,
        @NotBlank String customerName,
        @NotBlank String customerPhone,
        @Positive int partySize,
        @NotNull @FutureOrPresent LocalDate bookingDate,
        @NotNull TimeSlot timeSlot) {
}
