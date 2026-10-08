package com.mauresto.backend.booking;

import com.mauresto.backend.booking.dto.BookingResponse;
import com.mauresto.backend.booking.dto.CreateBookingRequest;
import com.mauresto.backend.exception.BookingConflictException;
import com.mauresto.backend.exception.InvalidPartySizeException;
import com.mauresto.backend.exception.ResourceNotFoundException;
import com.mauresto.backend.table.RestaurantTable;
import com.mauresto.backend.table.TableService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final TableService tableService;

    public BookingService(BookingRepository bookingRepository, TableService tableService) {
        this.bookingRepository = bookingRepository;
        this.tableService = tableService;
    }

    @Transactional
    public BookingResponse createBooking(CreateBookingRequest request) {
        RestaurantTable table = tableService.getTableOrThrow(request.tableId());

        if (request.partySize() > table.getSeats()) {
            throw new InvalidPartySizeException(
                    "Party size " + request.partySize() + " exceeds table " + table.getId()
                            + "'s capacity of " + table.getSeats());
        }

        boolean alreadyBooked = bookingRepository.existsByTable_IdAndBookingDateAndTimeSlotAndStatus(
                table.getId(), request.bookingDate(), request.timeSlot(), BookingStatus.CONFIRMED);
        if (alreadyBooked) {
            throw new BookingConflictException(
                    "Table " + table.getId() + " is already booked for " + request.bookingDate()
                            + " at " + request.timeSlot().getLabel() + ".");
        }

        Booking booking = new Booking(
                table,
                request.customerName(),
                request.customerPhone(),
                request.partySize(),
                request.bookingDate(),
                request.timeSlot());

        Booking saved = bookingRepository.save(booking);
        return BookingResponse.from(saved);
    }

    public List<BookingResponse> findBookings(LocalDate date, String customerPhone) {
        List<Booking> bookings;
        if (date != null && customerPhone != null) {
            bookings = bookingRepository.findByBookingDateAndCustomerPhone(date, customerPhone);
        } else if (date != null) {
            bookings = bookingRepository.findByBookingDate(date);
        } else if (customerPhone != null) {
            bookings = bookingRepository.findByCustomerPhone(customerPhone);
        } else {
            bookings = bookingRepository.findAll();
        }
        return bookings.stream().map(BookingResponse::from).toList();
    }

    public BookingResponse getBookingOrThrow(Long id) {
        return BookingResponse.from(findEntityOrThrow(id));
    }

    @Transactional
    public void cancelBooking(Long id) {
        Booking booking = findEntityOrThrow(id);
        booking.cancel();
        bookingRepository.save(booking);
    }

    private Booking findEntityOrThrow(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No booking found with id " + id));
    }
}
