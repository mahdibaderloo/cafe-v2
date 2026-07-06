package org.cafe.app.repository;

import org.cafe.app.dto.UserDto;
import org.cafe.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    UserDto findByEmailAndPassword(String email, String password);
}
