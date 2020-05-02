package fr.univlyon1.m1if.m1if13.usersspringboot.controller;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import fr.univlyon1.m1if.m1if13.usersspringboot.DAO.UserDao;
import fr.univlyon1.m1if.m1if13.usersspringboot.model.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class UserRestController {

	@Autowired
	private UserDao users;

	public Set<String> getAllUsers(String host) {
		Set<String> newList = new HashSet<>();

		for ( String user : users.getAll()) {
			newList.add("http://" + host + "/users/" + user);
		}

		return newList;
	}

	@Operation(
		summary = "Get Users",
		description = "Return a list of user's login",
		responses = {
			@ApiResponse(responseCode = "200", description = "A list of users"),
			@ApiResponse(responseCode = "204", description = "There is no user")
		}
	)
	@CrossOrigin(origins = {"http://localhost", "http://localhost:3376", "http://192.168.75.28", "https://192.168.75.28"})
	@GetMapping(path = "/users", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<Set<String>> getUsers(
		@Parameter(description = "The host uri", in = ParameterIn.HEADER) @RequestHeader("host") String host
	) {
		Set<String> userList = getAllUsers(host);
		return userList.isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
				: new ResponseEntity<>(userList, HttpStatus.OK);
	}

	@GetMapping(path = "/users", produces = { MediaType.TEXT_HTML_VALUE })
	public ModelAndView getUsersHtml(@RequestHeader("host") String host) {
		return users.getAll().isEmpty() ? new ModelAndView("error", "error", "No User") 
				: new ModelAndView("users", "users", getAllUsers(host));
	}

	@Operation(
		summary = "Get a User",
		description = "Return a user by his login",
		responses = {
			@ApiResponse(responseCode = "200", description = "The user"),
			@ApiResponse(responseCode = "404", description = "User not found")
		}
	)
	@CrossOrigin(origins = {"http://localhost", "http://localhost:3376", "http://192.168.75.28", "https://192.168.75.28"})
	@GetMapping(path = "/users/{userId}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<User> getUser(
		@Parameter(description = "The login of the user you need to fetch", in = ParameterIn.PATH) @PathVariable("userId") String userId
	) {
		return users.get(userId).isEmpty() ? new ResponseEntity<>(HttpStatus.NOT_FOUND)
				: new ResponseEntity<>(users.get(userId).get(), HttpStatus.OK);
	}

	@CrossOrigin(origins = {"http://localhost", "http://192.168.75.28", "https://192.168.75.28"})
	@GetMapping(path = "/users/{userId}", produces = { MediaType.TEXT_HTML_VALUE })
	public ModelAndView getUserHtml(@PathVariable("userId") String userId) {
		return users.get(userId).isEmpty() ? new ModelAndView("error", "error", "User not found")
				: new ModelAndView("user", "user", users.get(userId).get());
	}

	@Operation(
		summary = "Post a User",
		description = "Add a user to the list",
		responses = {
			@ApiResponse(responseCode = "201", description = "The user has been created"),
			@ApiResponse(responseCode = "400", description = "Login or password blank")
		}
	)
	@CrossOrigin(origins = {"http://localhost", "http://localhost:3376", "http://192.168.75.28", "https://192.168.75.28"})
	@PostMapping(path = "/users", consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE })
	public ResponseEntity<Void> postUsers(
		@Parameter(description = "The login of the user", in = ParameterIn.QUERY ) @RequestParam("login") String login,
		@Parameter(description = "The password of the user", in = ParameterIn.QUERY ) @RequestParam("password") String password
	) {
		if (login.isBlank() || password.isBlank()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		User user = new User(login, password);
		users.save(user);

		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@Operation(
		summary = "Update a User",
		description = "Update a user by his login",
		responses = {
			@ApiResponse(responseCode = "201", description = "The user has been created"),
			@ApiResponse(responseCode = "200", description = "The user has been updated"),
			@ApiResponse(responseCode = "400", description = "Login or password blank")
		}
	)
	@PutMapping(path = "/users/{userId}", consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE } )
	public ResponseEntity<Void> putUser(
		@Parameter(description = "The login of the user you want to update", in = ParameterIn.PATH ) @PathVariable String userId, 
		@Parameter(description = "The new login of the user", in = ParameterIn.QUERY ) @RequestParam("login") String login,
		@Parameter(description = "The new password of the user", in = ParameterIn.QUERY ) @RequestParam("password") String password
	) {
		Optional<User> optionalUser = users.get(userId);

		if (login.isBlank() || password.isBlank()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		if (optionalUser.isEmpty()) {
			User user = new User(login, password);
			users.save(user);
			return new ResponseEntity<>(HttpStatus.CREATED);
		}

		String[] params = {login, password};
		users.update(optionalUser.get(), params);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Operation(
		summary = "Delete a User",
		description = "Delete a user by his login",
		responses = {
			@ApiResponse(responseCode = "200", description = "The user has been deleted"),
		}
	)
	@DeleteMapping(path = "/users/{userId}", consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE })
	public ResponseEntity<Void> deleteUser(
		@Parameter(description = "The user you want to delete", in = ParameterIn.PATH ) @PathVariable String userId
	) {
		Optional<User> optionalUser = users.get(userId); 
		if(optionalUser.isEmpty()) users.delete(optionalUser.get());

		return new ResponseEntity<>(HttpStatus.OK);
	}
}