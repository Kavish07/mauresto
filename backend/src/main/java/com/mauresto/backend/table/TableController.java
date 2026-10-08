package com.mauresto.backend.table;

import com.mauresto.backend.booking.TimeSlot;
import com.mauresto.backend.table.dto.TableAvailabilityResponse;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tables")
public class TableController {

    private final TableService tableService;

    public TableController(TableService tableService) {
        this.tableService = tableService;
    }

    @GetMapping
    public List<TableAvailabilityResponse> getTables(
            @RequestParam(required = false) Integer seats,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) TimeSlot timeSlot) {
        return tableService.findTables(seats, date, timeSlot);
    }

    @GetMapping("/{id}")
    public TableAvailabilityResponse getTable(@PathVariable String id) {
        RestaurantTable table = tableService.getTableOrThrow(id);
        return TableAvailabilityResponse.withoutAvailability(table);
    }
}
