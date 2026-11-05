package com.mauresto.backend.order;

import com.mauresto.backend.exception.ResourceNotFoundException;
import com.mauresto.backend.menu.MenuItemService;
import com.mauresto.backend.order.dto.CreateOrderRequest;
import com.mauresto.backend.order.dto.OrderItemRequest;
import com.mauresto.backend.order.dto.OrderResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final MenuItemService menuItemService;

    public OrderService(OrderRepository orderRepository, MenuItemService menuItemService) {
        this.orderRepository = orderRepository;
        this.menuItemService = menuItemService;
    }

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request) {
        Order order = new Order(request.customerName(), request.customerPhone());
        for (OrderItemRequest itemRequest : request.items()) {
            order.addItem(menuItemService.getAvailableMenuItemOrThrow(itemRequest.menuItemId()), itemRequest.quantity());
        }

        Order saved = orderRepository.save(order);
        return OrderResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrderOrThrow(Long id) {
        return OrderResponse.from(findEntityOrThrow(id));
    }

    @Transactional
    public void cancelOrder(Long id) {
        Order order = findEntityOrThrow(id);
        order.cancel();
        orderRepository.save(order);
    }

    private Order findEntityOrThrow(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No order found with id " + id));
    }
}
