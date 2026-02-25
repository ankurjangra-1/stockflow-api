package Main.Service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import Main.Dto.OrderItemRequest;
import Main.Dto.OrderRequest;
import Main.Entity.CustomerOrder;
import Main.Entity.OrderItem;
import Main.Entity.Product;
import Main.Repository.CustomerOrderRepository;
import Main.Repository.OrderItemRepository;
import Main.Repository.ProductRepository;
import jakarta.transaction.Transactional;

@Service

public class OrderServiceImpl implements OrderService {

	private final ProductRepository productRepository;
	private final CustomerOrderRepository orderRepository;
	private final OrderItemRepository orderItemRepository;

	public OrderServiceImpl(ProductRepository productRepository, CustomerOrderRepository orderRepository,
			OrderItemRepository orderItemRepository) {
		this.productRepository = productRepository;
		this.orderRepository = orderRepository;
		this.orderItemRepository = orderItemRepository;
	}
	@Transactional
	@Override
	public CustomerOrder createOrder(OrderRequest request) {
		CustomerOrder order = new CustomerOrder();
		order.setOrderDate(LocalDateTime.now());

		double total = 0;

		for (OrderItemRequest itemReq : request.getItems()) {

			Product product = productRepository.findById(itemReq.getProductId())
					.orElseThrow(() -> new RuntimeException("Product not found"));

			if (product.getQuantity() < itemReq.getQuantity()) {
				throw new RuntimeException("Insufficient stock for " + product.getName());
			}

			product.setQuantity(product.getQuantity() - itemReq.getQuantity());

			OrderItem item = new OrderItem();
			item.setOrder(order);
			item.setProduct(product);
			item.setQuantity(itemReq.getQuantity());
			item.setPrice(product.getPrice());

			total += product.getPrice() * itemReq.getQuantity();

			orderItemRepository.save(item);
		}

		order.setTotalAmount(total);

		return orderRepository.save(order);

	}

}
