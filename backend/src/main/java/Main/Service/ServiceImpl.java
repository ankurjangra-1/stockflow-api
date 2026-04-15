package Main.Service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import Main.Entity.Product;
import Main.Repository.ProductRepository;

@Service
public class ServiceImpl implements ProductService{

	private ProductRepository productRepository ;
	
	  public ServiceImpl(ProductRepository productRepository) {
	        this.productRepository = productRepository;
	    }
	  
	@Override
	public Product createProduct(Product product) {
		
		return productRepository.save(product);
	}

	@Override
	public List<Product> getAllProducts() {
		
		return productRepository.findAll();
	}

	@Override
	public Product getProductById(Long id) {
		
		return productRepository.findById(id)
				 .orElseThrow(() -> new RuntimeException("Product not found"));
	}

	@Override
	public Product updateProduct(Long id, Product product) {
	
		  Product existing = getProductById(id);

	        existing.setName(product.getName());
	        existing.setPrice(product.getPrice());
	        existing.setQuantity(product.getQuantity());

	        return productRepository.save(existing);
	}

	@Override
	public void deleteProduct(Long id) {
		 productRepository.deleteById(id);
		
	}

	@Override
	public Page<Product> getAllProducts(int page, int size) {
		return productRepository.findAll(PageRequest.of(page, size));
		
	}

	@Override
	public List<Product> searchProduct(String name) {
		  return productRepository.findByNameContainingIgnoreCase(name);
	}

	

}
