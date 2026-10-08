package com.mauresto.backend.table;

import com.mauresto.backend.booking.BookingRepository;
import com.mauresto.backend.booking.BookingStatus;
import com.mauresto.backend.booking.TimeSlot;
import com.mauresto.backend.exception.ResourceNotFoundException;
import com.mauresto.backend.table.dto.TableAvailabilityResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TableService {

    private final TableRepository tableRepository;
    private final BookingRepository bookingRepository;

    public TableService(TableRepository tableRepository, BookingRepository bookingRepository) {
        this.tableRepository = tableRepository;
        this.bookingRepository = bookingRepository;
    }

    public List<TableAvailabilityResponse> findTables(Integer seats, LocalDate date, TimeSlot timeSlot) {
        List<RestaurantTable> tables = seats != null
                ? tableRepository.findBySeats(seats)
                : tableRepository.findAll();

        if (date == null || timeSlot == null) {
            return tables.stream()
                    .map(TableAvailabilityResponse::withoutAvailability)
                    .toList();
        }

        Set<String> tableIds = tables.stream().map(RestaurantTable::getId).collect(Collectors.toSet());
        Set<String> bookedTableIds = bookingRepository
                .findByTable_IdInAndBookingDateAndTimeSlotAndStatus(tableIds, date, timeSlot, BookingStatus.CONFIRMED)
                .stream()
                .map(booking -> booking.getTable().getId())
                .collect(Collectors.toSet());

        return tables.stream()
                .map(table -> TableAvailabilityResponse.of(table, !bookedTableIds.contains(table.getId())))
                .toList();
    }

    public RestaurantTable getTableOrThrow(String tableId) {
        return tableRepository.findById(tableId)
                .orElseThrow(() -> new ResourceNotFoundException("No table found with id " + tableId));
    }
}
