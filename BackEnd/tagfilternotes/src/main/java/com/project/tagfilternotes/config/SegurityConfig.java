package com.project.tagfilternotes.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
@EnableWebSecurity
public class SegurityConfig {
    

@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{

    httpSecurity.cors( cors -> cors.configurationSource(corsConfigurationSource()))
    .csrf(csrf -> csrf.disable())
    .authorizeHttpRequests(authorize ->authorize.anyRequest().permitAll())
    .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    return httpSecurity.build();
}


@Bean
public CorsConfigurationSource corsConfigurationSource(){
    CorsConfiguration configurationApi = new CorsConfiguration();

    configurationApi.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
    configurationApi.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE"));
    configurationApi.setAllowedHeaders(Arrays.asList("Authorization","content-type"));


    UrlBasedCorsConfigurationSource sourceApi = new UrlBasedCorsConfigurationSource();
    sourceApi.registerCorsConfiguration("/**", configurationApi);

    return sourceApi;
} 

}
