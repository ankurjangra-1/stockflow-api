package Main.Service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Main.Dto.LoginRequest;
import Main.Entity.User;
import Main.Repository.UserRepository;
import Main.Security.JwtUtil;

@Service
public class AuthServiceImpl implements AuthService{
	private final JwtUtil jwtUtil;
	private final UserRepository userRepository;
	 private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder= passwordEncoder;
        this.jwtUtil=jwtUtil;
    }
	@Override
	public String login(LoginRequest request) {
      
		
		User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

		if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        
		return jwtUtil.generateToken(user.getEmail(), user.getRole());
	}

}
