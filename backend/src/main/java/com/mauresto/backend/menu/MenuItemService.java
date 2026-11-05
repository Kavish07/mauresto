package com.mauresto.backend.menu;

import com.mauresto.backend.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;

    public MenuItemService(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    public MenuItem getAvailableMenuItemOrThrow(Long id) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No menu item found with id " + id));
        if (!menuItem.isAvailable()) {
            throw new ResourceNotFoundException("No menu item found with id " + id);
        }
        return menuItem;
    }
}
