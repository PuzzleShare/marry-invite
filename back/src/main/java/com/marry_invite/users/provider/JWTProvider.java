package com.marry_invite.users.provider;

import com.marry_invite.users.document.Users;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class JWTProvider {
    @Value("${jwt.secret-key}")
    private String secretKey;
    private SecretKey signKey;
    @PostConstruct
    private void init(){
        signKey = Keys.hmacShaKeyFor(secretKey.getBytes());
    }
    public static final long ACCESS_MAX_AGE = 30L;
    public static final long REFRESH_MAX_AGE = 60*60*24L;

    public String createAccessToken(Users user){
        return createToken(user.getId(), ACCESS_MAX_AGE);
    }
    public String createRefreshToken(Users user){
        return createToken(user.getId(), REFRESH_MAX_AGE);
    }
    public String createAccessToken(String id){
        return createToken(id, ACCESS_MAX_AGE);
    }
    public String createRefreshToken(String id){
        return createToken(id, REFRESH_MAX_AGE);
    }

    private String createToken(String userId, Long time){
        Claims claims = Jwts.claims().setSubject(userId);
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + time))
                .signWith(signKey, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     *
     * @param token
     * @return int 0 ~ 5, 0 is valid but, else is exception
     */
    public int validateToken(String token){
        try {
            Jwts.parserBuilder()
                    .setSigningKey(signKey)
                    .build()
                    .parseClaimsJws(token);
        } catch (ExpiredJwtException e) {
            return 1;
        } catch (UnsupportedJwtException e) {
            return 2;
        } catch (MalformedJwtException e) {
            return 3;
        } catch (SignatureException e) {
            return 4;
        } catch (IllegalArgumentException e) {
            return 5;
        }
        return 0;
    }

    public String getSubset(String token){
        return Jwts.parserBuilder()
                .setSigningKey(signKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
