package fr.univlyon1.m1if.m1if13.usersspringboot.controller;

import java.util.Optional;

import javax.naming.AuthenticationException;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import fr.univlyon1.m1if.m1if13.usersspringboot.DAO.UserDao;
import fr.univlyon1.m1if.m1if13.usersspringboot.model.User;

@RestController
public class OperationController {

    @Autowired
    private UserDao users;

    /**
     * Procédure de login "simple" d'un utilisateur
     * @param login Le login de l'utilisateur. L'utilisateur doit avoir été créé préalablement et son login doit être présent dans le DAO.
     * @param password Le password à vérifier.
     * @return Une ResponseEntity avec le JWT dans le header "Authentication" si le login s'est bien passé, et le code de statut approprié (204, 401 ou 404).
     */
    @Operation(
		summary = "Login",
		description = "Log a user",
		responses = {
			@ApiResponse(responseCode = "204", description = "logged"),
			@ApiResponse(responseCode = "400", description = "JWT Error"),
			@ApiResponse(responseCode = "401", description = "Password incorrect"),
			@ApiResponse(responseCode = "404", description = "User not found")
		}
	)
    @CrossOrigin(origins = {"http://localhost:5500", "http://192.168.75.28", "https://192.168.75.28", "http://192.168.75.28:8080"}, exposedHeaders = "Authentification")
    @PostMapping("/login")
    public ResponseEntity<Void> login(
        @Parameter(description = "The login of the user", in = ParameterIn.QUERY) @RequestParam("login") String login,
        @Parameter(description = "The password of the user", in = ParameterIn.QUERY) @RequestParam("password") String password,
        @Parameter(description = "Origin of the request", in = ParameterIn.HEADER) @RequestHeader("Origin") String origin
    ) {
        Optional<User> optionalUser = users.get(login);

        if(optionalUser.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        User user = optionalUser.get();

        try {
            user.authenticate(password);
            try {
                Algorithm algorithm = Algorithm.HMAC256("secret");
                String token = JWT.create()
                    .withSubject(origin)
                    .withIssuer(login)
                    .sign(algorithm);
                
                HttpHeaders responseHeaders = new HttpHeaders();
                responseHeaders.set("Authentification", token);

                return new ResponseEntity<>(responseHeaders, HttpStatus.NO_CONTENT);
            } catch (JWTCreationException exception){
                //Invalid Signing configuration / Couldn't convert Claims.
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch(AuthenticationException exception) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    /**
     * Réalise la déconnexion
     */
    @Operation(
		summary = "Logout",
		description = "Log out a user by his JWT",
		responses = {
			@ApiResponse(responseCode = "204", description = "Logged out"),
			@ApiResponse(responseCode = "400", description = "JWT Error"),
		}
	)
    @CrossOrigin(origins = {"http://localhost:5500", "http://192.168.75.28", "https://192.168.75.28", "http://192.168.75.28:8080"})
    @DeleteMapping("/logout")
    public ResponseEntity<Void> logout(
        @Parameter(description = "The JWT of the user you want to disconnect", in = ParameterIn.QUERY) @RequestParam("token") String token,
        @Parameter(description = "Origin of the request", in = ParameterIn.HEADER) @RequestHeader("origin") String origin
    ) {
        try {
            DecodedJWT jwt = JWT.decode(token);
            users.get(jwt.getIssuer()).get().disconnect();
        } catch(Exception exception) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Méthode destinée au serveur Node pour valider l'authentification d'un utilisateur.
     * @param token Le token JWT qui se trouve dans le header "Authentication" de la requête
     * @param origin L'origine de la requête (pour la comparer avec celle du client, stockée dans le token JWT)
     * @return Une réponse vide avec un code de statut approprié (204, 400, 401).
     */
    @Operation(
		summary = "Authenticate",
		description = "Verify the authentification of the user",
		responses = {
			@ApiResponse(responseCode = "204", description = "Authenticate"),
			@ApiResponse(responseCode = "400", description = "JWT Error"),
			@ApiResponse(responseCode = "401", description = "Not authenticate"),
		}
	)
    @CrossOrigin(origins = {"http://localhost:5500", "http://192.168.75.28", "https://192.168.75.28", "http://192.168.75.28:8080"}, allowCredentials = "true")
    @GetMapping("/authenticate")!
    public ResponseEntity<Void> authenticate(
        @Parameter(description = "JWT of the token", in = ParameterIn.QUERY) @RequestParam("token") String token,
        @Parameter(description = "Origin of the request", in = ParameterIn.HEADER) @RequestHeader("origin") String origin
    ) {
        try {
            Algorithm algorithm = Algorithm.HMAC256("secret");
            JWTVerifier verifier = JWT.require(algorithm)
                .build(); //Reusable verifier instance
            DecodedJWT jwt = verifier.verify(token);

            if(users.get(jwt.getIssuer()).get().isConnected()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        } catch (JWTVerificationException exception){
            //Invalid signature/claims
            System.out.println(exception);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}