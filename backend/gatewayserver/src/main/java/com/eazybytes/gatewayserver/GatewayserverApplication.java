package com.eazybytes.gatewayserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@SpringBootApplication
public class GatewayserverApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayserverApplication.class, args);
	}

	@Bean
	public RouteLocator eazyBankRouteConfig(RouteLocatorBuilder routeLocatorBuilder){
		return routeLocatorBuilder.routes()
				.route(p->
					p.path("/eazybanks/accounts/**")
					.filters(f->f.rewritePath("/eazybanks/accounts/(?<segment>.*)","/${segment}")
							.addResponseHeader("X-Response-Time", LocalDateTime.now().toString())
					)
					.uri("lb://ACCOUNTS"))
				.route(p->
						p.path("/eazybanks/loans/**")
								.filters(f->f.rewritePath("/eazybanks/loans/(?<segment>.*)","/${segment}")
										.addResponseHeader("X-Response-Time", LocalDateTime.now().toString())
								)
								.uri("lb://LOANS"))
				.route(p->
						p.path("/eazybanks/cards/**")
								.filters(f->f.rewritePath("/eazybanks/cards/(?<segment>.*)","/${segment}")
										.addResponseHeader("X-Response-Time", LocalDateTime.now().toString())
								)
								.uri("lb://CARDS")).build();
	}

}
