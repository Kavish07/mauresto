package com.mauresto.backend.booking.dto;

import com.mauresto.backend.booking.Booking;
import com.mauresto.backend.booking.BookingStatus;
import com.mauresto.backend.booking.TimeSlot;

import java.time.Instant;
import java.time.LocalDate;

public record BookingResponse(
        Long id,
        String tableId,
        int seats,
        String location,
        String customerName,
        int partySize,
        LocalDate bookingDate,
        TimeSlot timeSlot,
        String timeSlotLabel,
        BookingStatus status,
        Instant createdAt) {

    public static BookingResponse from(Booking booking) {
        return new BookingResponse(
                booking.getId(),
                booking.getTable().getId(),
                booking.getTable().getSeats(),
                booking.getTable().getLocation(),
                booking.getCustomerName(),
                booking.getPartySize(),
                booking.getBookingDate(),
                booking.getTimeSlot(),
                booking.getTimeSlot().getLabel(),
                booking.getStatus(),
                booking.getCreatedAt());
    }
}
