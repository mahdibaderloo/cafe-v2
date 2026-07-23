package org.cafe.app.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private Long expirationTime;

    // ✅ کلید مخفی
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    // ✅ تولید توکن از UserDetails
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", userDetails.getAuthorities().iterator().next().getAuthority());
        return generateToken(claims, userDetails.getUsername());
    }

    // ✅ تولید توکن با claims و subject
    public String generateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .claims(claims)          // ✅ جدید
                .subject(subject)        // ✅ جدید
                .issuedAt(new Date())    // ✅ جدید
                .expiration(new Date(System.currentTimeMillis() + expirationTime))  // ✅ جدید
                .signWith(getSigningKey())
                .compact();
    }

    // ✅ استخراج username از توکن
    public String extractUsername(String token) {
        try {
            return extractClaim(token, Claims::getSubject);
        } catch (JwtException e) {
            return null;
        }
    }

    // ✅ استخراج email (همون username)
    public String extractEmail(String token) {
        return extractUsername(token);
    }

    // ✅ استخراج یک Claim خاص
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // ✅ استخراج تاریخ انقضا
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // ✅ بررسی انقضای توکن
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // ✅ بررسی اعتبار توکن با UserDetails
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // ✅ بررسی اعتبار توکن
    public boolean validateToken(String token) {
        try {
            extractAllClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    // ✅ استخراج همه Claims
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())   // ✅ جدید
                .build()
                .parseSignedClaims(token)      // ✅ جدید
                .getPayload();                 // ✅ جدید
    }

    // ✅ متد قدیمی برای سازگاری (اختیاری)
    public String getUsernameFromJwtToken(String token) {
        return extractUsername(token);
    }
}