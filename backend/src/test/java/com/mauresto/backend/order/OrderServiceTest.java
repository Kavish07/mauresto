package com.mauresto.backend.order;

import com.mauresto.backend.exception.ResourceNotFoundException;
import com.mauresto.backend.menu.MenuItem;
import com.mauresto.backend.menu.MenuItemService;
import com.mauresto.backend.order.dto.CreateOrderRequest;
import com.mauresto.backend.order.dto.OrderItemRequest;
import com.mauresto.backend.order.dto.OrderResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private MenuItemService menuItemService;

    private OrderService orderService() {
        return new OrderService(orderRepository, menuItemService);
    }

    @Test
    void rejectsOrderForUnavailableOrMissingMenuItem() {
        when(menuItemService.getAvailableMenuItemOrThrow(99L))
                .thenThrow(new ResourceNotFoundException("No menu item found with id 99"));

        CreateOrderRequest request = new CreateOrderRequest(
                "Jane Doe", "+230 5123 4567", List.of(new OrderItemRequest(99L, 2)));

        assertThatThrownBy(() -> orderService().createOrder(request))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void createsConfirmedOrderWithTotalAcrossItems() {
        MenuItem naan = new MenuItem("indian", "Garlic Naan", "desc", new BigDecimal("65"));
        MenuItem lassi = new MenuItem("indian", "Mango Lassi", "desc", new BigDecimal("80"));
        when(menuItemService.getAvailableMenuItemOrThrow(1L)).thenReturn(naan);
        when(menuItemService.getAvailableMenuItemOrThrow(2L)).thenReturn(lassi);
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));

        CreateOrderRequest request = new CreateOrderRequest(
                "Jane Doe", "+230 5123 4567",
                List.of(new OrderItemRequest(1L, 2), new OrderItemRequest(2L, 1)));

        OrderResponse response = orderService().createOrder(request);

        assertThat(response.status()).isEqualTo(OrderStatus.CONFIRMED);
        assertThat(response.items()).hasSize(2);
        assertThat(response.totalAmount()).isEqualByComparingTo("210");
    }
}
