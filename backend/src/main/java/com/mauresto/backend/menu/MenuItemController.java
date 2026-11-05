package com.mauresto.backend.menu;

import com.mauresto.backend.menu.dto.MenuItemResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/menu-items")
public class MenuItemController {

    private final MenuItemRepository menuItemRepository;

    public MenuItemController(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    @GetMapping
    public List<MenuItemResponse> getMenuItems() {
        return menuItemRepository.findByAvailableTrue().stream()
                .map(MenuItemResponse::from)
                .toList();
    }
}
