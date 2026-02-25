package Main.Service;

import Main.Dto.OrderRequest;
import Main.Entity.CustomerOrder;

public interface OrderService {
	 CustomerOrder createOrder(OrderRequest request);
}
