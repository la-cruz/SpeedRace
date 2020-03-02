package fr.univlyon1.m1if.m1if13.usersspringboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import fr.univlyon1.m1if.m1if13.usersspringboot.config.BeanConfig;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;


@SpringBootApplication
@OpenAPIDefinition(
	info = @Info(
                    title = "User API - M1IF13",
                    version = "1.0",
                    description = "API built and used for the M1IF13 courses"
        )
)
public class UsersspringbootApplication {

	public static void main(String[] args) {

		AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(BeanConfig.class);

		SpringApplication.run(UsersspringbootApplication.class, args);
	}

}
