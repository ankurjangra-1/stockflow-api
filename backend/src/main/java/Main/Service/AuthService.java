package Main.Service;

import Main.Dto.LoginRequest;

public interface AuthService {

	String login(LoginRequest request);
}
