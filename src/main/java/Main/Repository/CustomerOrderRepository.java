package Main.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Main.Entity.CustomerOrder;

public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Long> {}


