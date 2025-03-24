package com.marry_invite.common.config;

import com.marry_invite.users.filter.CookieToAuthorizationFilter;
import com.marry_invite.users.filter.TokenRefreshFilter;
import com.marry_invite.users.handler.OAuth2AuthenticationFailureHandler;
import com.marry_invite.users.handler.OAuth2AuthenticationsSuccessHandler;
import com.marry_invite.users.service.CustomOAuth2UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.savedrequest.RequestCacheAwareFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
    private final OAuth2AuthenticationsSuccessHandler oAuth2AuthenticationsSuccessHandler;
    private final CookieToAuthorizationFilter cookieToAuthorizationFilter;
    private final TokenRefreshFilter tokenRefreshFilter;
    private final CorsConfigurationSource corsConfigurationSource;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .httpBasic(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .sessionManagement(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/api/test/**").permitAll()
                                .anyRequest().authenticated()
                ).oauth2Login(oAuth2LoginConf ->
                        oAuth2LoginConf.userInfoEndpoint(userInfoEndpointConfig ->
                                        userInfoEndpointConfig.userService(customOAuth2UserService)
                                ).successHandler(oAuth2AuthenticationsSuccessHandler)
                                .failureHandler(oAuth2AuthenticationFailureHandler)
                ).logout(config ->
                        config.logoutUrl("/api/logout")
                                .deleteCookies("JSESSIONID", "accessToken", "refreshToken")
                                .logoutSuccessHandler((req, rsp, auth) -> rsp.setStatus(HttpServletResponse.SC_NO_CONTENT)) // 204 응답
                )// 같이 BasicAuthenticationFilter 전에 동작하도록 되어있지만 tokenRefreshFilter 가 먼저 실행됨
                .addFilterBefore(tokenRefreshFilter, BasicAuthenticationFilter.class)
                .addFilterBefore(cookieToAuthorizationFilter, BasicAuthenticationFilter.class);
        return http.build();
    }
}
