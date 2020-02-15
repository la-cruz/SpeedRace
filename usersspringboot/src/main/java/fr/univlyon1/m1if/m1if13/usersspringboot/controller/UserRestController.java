package fr.univlyon1.m1if.m1if13.usersspringboot.controller;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.univlyon1.m1if.m1if13.usersspringboot.DAO.UserDao;
import fr.univlyon1.m1if.m1if13.usersspringboot.model.User;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class UserRestController {

	@Autowired
	private UserDao users;

	@GetMapping("/users")
	public ResponseEntity<Set<String>> getUsers() {
		return users.getAll().isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
				: new ResponseEntity<>(users.getAll(), HttpStatus.OK);
	}

	@PostMapping("/users")
	public ResponseEntity<Void> postUsers(@RequestParam("login") String login,
			@RequestParam("password") String password) {
		if (login.isBlank() || password.isBlank()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		User user = new User(login, password);
		users.save(user);

		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@PutMapping("/users/{userId}")
	public ResponseEntity<Void> putUser(@PathVariable String userId, 
										@RequestParam("login") String login,
										@RequestParam("password") String password) {

		Optional<User> optionalUser = users.get(userId);

		if (optionalUser.isEmpty() && !login.isBlank() && !password.isBlank()) {
			User user = new User(login, password);
			users.save(user);
			return new ResponseEntity<>(HttpStatus.CREATED);
		}

		String[] params = {login, password};
		users.update(optionalUser.get(), params);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@DeleteMapping("/users/{userId}")
	public ResponseEntity<Void> deleteUser(@PathVariable String userId) {
		Optional<User> optionalUser = users.get(userId); 
		if(optionalUser.isEmpty()) users.delete(optionalUser.get());

		return new ResponseEntity<>(HttpStatus.OK);
	}
}