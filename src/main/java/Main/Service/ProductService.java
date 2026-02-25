package Main.Service;

import java.util.List;

import org.springframework.data.domain.Page;

import Main.Entity.Product;

public interface ProductService {
	

	    Product createProduct(Product product);

	    List<Product> getAllProducts();

	    Product getProductById(Long id);

	    Product updateProduct(Long id, Product product);

	    void deleteProduct(Long id);
	    Page<Product> getAllProducts(int page, int size);
	    List<Product> searchProduct(String name);
	   

}
