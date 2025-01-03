package com.eazybytes.accounts;

import com.eazybytes.accounts.dto.AccountsContactInfoDto;
import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
/*
 * @ComponentScans({@ComponentScan("com.eazybytes.accounts.controller")})
 * @EnableJpaRepositories("com.eazybytes.accounts.repository")
 * @EntityScan("com.eazybytes.model")
 * */
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
@EnableFeignClients
@EnableConfigurationProperties(value = {AccountsContactInfoDto.class})
@OpenAPIDefinition(
		info = @Info(
				title = "Accounts microservice API documentation",
				description = "Accounts microservice API documentation",
				version = "v1",
				contact = @Contact(
						name = "Bhargav Nikumbh",
						email = "abd@gmail.com",
						url = "https://google.com"
				),
				license = @License(
						name = "Apache 2.0",
						url = "https://google.com"
				)
		),
		externalDocs = @ExternalDocumentation(
				description = "This is external documentation",
				url = "https://google.com"
		)
)
public class AccountsApplication {

	public static void main(String[] args) {
		SpringApplication.run(AccountsApplication.class, args);
	}

	// Global CORS Configuration
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:3000", "https://financial-management-system-db.vercel.app") // Allow local dev and Vercel
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow specific HTTP methods
						.allowedHeaders("*") // Allow all headers
						.allowCredentials(true) // Allow credentials if needed
						.maxAge(3600); // Cache pre-flight response for 1 hour
			}
		};
	}
}
