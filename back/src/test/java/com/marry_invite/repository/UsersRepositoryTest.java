package com.marry_invite.repository;

import com.marry_invite.users.document.Users;
import com.marry_invite.users.repository.UsersRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Rollback(value = false)
public class UsersRepositoryTest {

    @Autowired
    private UsersRepository usersRepository;
    @Test
    @DisplayName("document save test")
    public void userSaveTest(){
        Users users = Users.builder()
                .email("minjagot@naver.com")
                .name("손")
                .provider("NAVER")
                .profileImg("img path")
                .build();
        Users saved = usersRepository.save(users);
        assertThat(saved).isNotNull();
        System.out.println(saved);
    }
}
