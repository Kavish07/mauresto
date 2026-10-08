package com.mauresto.backend.booking;

import com.mauresto.backend.table.RestaurantTable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "table_id", nullable = false)
    private RestaurantTable table;

    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @Column(name = "customer_phone", nullable = false)
    private String customerPhone;

    @Column(name = "party_size", nullable = false)
    private int partySize;

    @Column(name = "booking_date", nullable = false)
    private LocalDate bookingDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "time_slot", nullable = false)
    private TimeSlot timeSlot;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status = BookingStatus.CONFIRMED;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    protected Booking() {
    }

    public Booking(RestaurantTable table, String customerName, String customerPhone,
                    int partySize, LocalDate bookingDate, TimeSlot timeSlot) {
        this.table = table;
        this.customerName = customerName;
        this.customerPhone = customerPhone;
        this.partySize = partySize;
        this.bookingDate = bookingDate;
        this.timeSlot = timeSlot;
        this.status = BookingStatus.CONFIRMED;
    }

    public Long getId() {
        return id;
    }

    public RestaurantTable getTable() {
        return table;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public int getPartySize() {
        return partySize;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public TimeSlot getTimeSlot() {
        return timeSlot;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void cancel() {
        this.status = BookingStatus.CANCELLED;
    }
}
