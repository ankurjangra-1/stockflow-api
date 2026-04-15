package Main.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String name;

	    private String role; 
	    @Column(unique = true)
	    private String email;

	    private String password;

	    
	    public Long getId() {
	        return id;
	    }

	    public void setId(Long Id) {
	        this.id = Id;
	    }
	    
	    public String getRole() {
	        return role;
	    }

	    public void setRole(String Role) {
	        this.role = Role;
	    }
	   
	    public String getEmail() {
	        return email;
	    }

	    public void setEmail(String Email) {
	        this.email = Email;
	    }
	    
	    public String getPassword() {
	    	return password;
	    }
	    public void setPassword(String Password) {
	    	this.password=Password;
	    }
	    
	}

