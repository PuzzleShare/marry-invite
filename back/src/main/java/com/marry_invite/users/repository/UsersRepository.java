package com.marry_invite.users.repository;

import com.marry_invite.users.document.Users;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UsersRepository extends MongoRepository<Users, String> {
    Optional<Users> getUsersByEmailAndProvider(String email, String provider);
}
