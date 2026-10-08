package com.mauresto.backend.booking;

import java.time.LocalTime;

public enum TimeSlot {

    LUNCH_12("12:00 Lunch", LocalTime.of(12, 0), LocalTime.of(14, 0)),
    LUNCH_14("14:00 Lunch", LocalTime.of(14, 0), LocalTime.of(16, 0)),
    DINNER_18("18:00 Dinner", LocalTime.of(18, 0), LocalTime.of(20, 0)),
    DINNER_20("20:00 Dinner", LocalTime.of(20, 0), LocalTime.of(22, 0));

    private final String label;
    private final LocalTime start;
    private final LocalTime end;

    TimeSlot(String label, LocalTime start, LocalTime end) {
        this.label = label;
        this.start = start;
        this.end = end;
    }

    public String getLabel() {
        return label;
    }

    public LocalTime getStart() {
        return start;
    }

    public LocalTime getEnd() {
        return end;
    }
}
