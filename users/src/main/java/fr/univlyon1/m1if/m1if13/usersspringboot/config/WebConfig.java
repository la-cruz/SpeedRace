package fr.univlyon1.m1if.m1if13.usersspringboot.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        configurer
            .favorPathExtension(true)
            .defaultContentType(MediaType.APPLICATION_JSON)
            .parameterName("mediaType")
            .favorParameter(true)
            .ignoreAcceptHeader(true)
            .mediaType(MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_XML)
            .mediaType(MediaType.TEXT_HTML_VALUE, MediaType.TEXT_HTML);
    }
}