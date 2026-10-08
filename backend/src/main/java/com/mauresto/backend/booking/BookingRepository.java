package com.mauresto.backend.booking;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    boolean existsByTable_IdAndBookingDateAndTimeSlotAndStatus(
            String tableId, LocalDate bookingDate, TimeSlot timeSlot, BookingStatus status);

    List<Booking> findByTable_IdInAndBookingDateAndTimeSlotAndStatus(
            Set<String> tableIds, LocalDate bookingDate, TimeSlot timeSlot, BookingStatus status);

    List<Booking> findByBookingDateAndCustomerPhone(LocalDate bookingDate, String customerPhone);

    List<Booking> findByBookingDate(LocalDate bookingDate);

    List<Booking> findByCustomerPhone(String customerPhone);
}
