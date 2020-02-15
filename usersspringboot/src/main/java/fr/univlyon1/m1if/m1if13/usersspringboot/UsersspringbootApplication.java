package fr.univlyon1.m1if.m1if13.usersspringboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import fr.univlyon1.m1if.m1if13.usersspringboot.config.AppConfig;


@SpringBootApplication
public class UsersspringbootApplication {

	public static void main(String[] args) {

		AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

		SpringApplication.run(UsersspringbootApplication.class, args);
	}

}
