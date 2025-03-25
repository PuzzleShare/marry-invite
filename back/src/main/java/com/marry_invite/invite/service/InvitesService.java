package com.marry_invite.invite.service;

import com.marry_invite.invite.document.block.RootBlock;
import com.marry_invite.invite.dto.response.InviteResponse;
import com.marry_invite.invite.repository.InvitesRepository;
import com.marry_invite.users.provider.JWTProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class InvitesService {
    private final InvitesRepository invitesRepository;
    private final JWTProvider jwtProvider;

    public List<InviteResponse> getInviteList(HttpServletRequest req){
        return null;
    }

    public InviteResponse getInvite(
            HttpServletRequest req,
            String inviteId
    ){
        return null;
    }

    public Map<String, String> createInvite(HttpServletRequest req){
        return null;
    }

    public Map<String, String> modifyInvite(
            HttpServletRequest req,
            String inviteId,
            RootBlock data
    ){
        return null;
    }

    public Map<String, String> removeInvite(
            HttpServletRequest req,
            String inviteId
    ){
        return null;
    }
}
