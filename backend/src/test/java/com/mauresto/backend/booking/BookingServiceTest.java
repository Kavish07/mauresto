package com.mauresto.backend.booking;

import com.mauresto.backend.booking.dto.BookingResponse;
import com.mauresto.backend.booking.dto.CreateBookingRequest;
import com.mauresto.backend.exception.BookingConflictException;
import com.mauresto.backend.exception.InvalidPartySizeException;
import com.mauresto.backend.table.RestaurantTable;
import com.mauresto.backend.table.TableService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BookingServiceTest {

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private TableService tableService;

    private BookingService bookingService() {
        return new BookingService(bookingRepository, tableService);
    }

    private static CreateBookingRequest requestFor(String tableId, int partySize) {
        return new CreateBookingRequest(
                tableId, "Jane Doe", "+230 5123 4567", partySize,
                LocalDate.now().plusDays(1), TimeSlot.DINNER_18);
    }

    @Test
    void rejectsPartySizeLargerThanTableCapacity() {
        RestaurantTable table = new RestaurantTable("T04", 4, "Main hall");
        when(tableService.getTableOrThrow("T04")).thenReturn(table);

        assertThatThrownBy(() -> bookingService().createBooking(requestFor("T04", 6)))
                .isInstanceOf(InvalidPartySizeException.class);
    }

    @Test
    void rejectsDuplicateBookingForSameTableDateAndSlot() {
        RestaurantTable table = new RestaurantTable("T04", 4, "Main hall");
        when(tableService.getTableOrThrow("T04")).thenReturn(table);
        when(bookingRepository.existsByTable_IdAndBookingDateAndTimeSlotAndStatus(
                "T04", LocalDate.now().plusDays(1), TimeSlot.DINNER_18, BookingStatus.CONFIRMED))
                .thenReturn(true);

        assertThatThrownBy(() -> bookingService().createBooking(requestFor("T04", 2)))
                .isInstanceOf(BookingConflictException.class);
    }

    @Test
    void createsConfirmedBookingWhenValidAndAvailable() {
        RestaurantTable table = new RestaurantTable("T04", 4, "Main hall");
        when(tableService.getTableOrThrow("T04")).thenReturn(table);
        when(bookingRepository.existsByTable_IdAndBookingDateAndTimeSlotAndStatus(
                any(), any(), any(), any()))
                .thenReturn(false);
        when(bookingRepository.save(any(Booking.class))).thenAnswer(invocation -> invocation.getArgument(0));

        BookingResponse response = bookingService().createBooking(requestFor("T04", 2));

        assertThat(response.status()).isEqualTo(BookingStatus.CONFIRMED);
        assertThat(response.tableId()).isEqualTo("T04");
        assertThat(response.partySize()).isEqualTo(2);
    }
}
