package Main.Contoller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Main.Dto.LoginRequest;
import Main.Dto.LoginResponse;
import Main.Service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private final PasswordEncoder passwordEncoder;
	    private final AuthService authService;

	    public AuthController(AuthService authService ,PasswordEncoder passwordEncoder) {
	        this.authService = authService;
	        this.passwordEncoder= passwordEncoder;
	    }

	    @PostMapping("/login")
	 public ResponseEntity<LoginResponse> login(
	            @RequestBody LoginRequest request) {

	        String token = authService.login(request);

	        return ResponseEntity.ok(new LoginResponse(token));
	    }
	   

	}



