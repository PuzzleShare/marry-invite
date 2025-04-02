package com.marry_invite.comment.repository;

import com.marry_invite.comment.document.Comments;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CommentsRepository extends MongoRepository<Comments, String> {
    List<Comments> findAllByInviteId(String inviteId);
}
