package Main.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Main.Entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}