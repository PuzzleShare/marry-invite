package com.marry_invite.invite.repository;

import com.marry_invite.invite.document.Invites;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface InvitesRepository extends MongoRepository<Invites, String> {
    List<Invites> findAllByUserId(String userId);
    Optional<Invites> findByInviteId(String inviteId);
}
