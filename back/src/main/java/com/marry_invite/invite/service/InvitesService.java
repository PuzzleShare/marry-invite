package com.marry_invite.invite.service;

import com.marry_invite.common.error.DocumentNotFoundException;
import com.marry_invite.invite.document.Invites;
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
        String userId = jwtProvider.getSubset(req);
        return invitesRepository.findAllByUserId(userId).stream()
                .map(InviteResponse::of)
                .toList();
    }

    public InviteResponse getInvite(
            HttpServletRequest req,
            String inviteId
    ){
        Invites invites = invitesRepository.findByInviteId(inviteId)
                .orElseThrow(() -> new DocumentNotFoundException("청첩장을 찾을 수 없습니다."));
        return InviteResponse.of(invites);
    }

    public Map<String, String> createInvite(HttpServletRequest req){
        String userId = jwtProvider.getSubset(req);
        Invites invites = Invites.defaultInvites(userId);
        Invites saved = invitesRepository.save(invites);
        return Map.of("inviteId", saved.getInviteId());
    }

    public Map<String, String> modifyInvite(
            HttpServletRequest req,
            String inviteId,
            RootBlock data
    ){
        String userId = jwtProvider.getSubset(req);
        Invites invites = invitesRepository.findByInviteId(inviteId)
                .orElseThrow(() -> new DocumentNotFoundException("청첩장을 찾을 수 없습니다."));
        if (!invites.getUserId().equals(userId)) {
            return Map.of("message", "다른 유저의 청첩장은 수정 할 수 없습니다.");
        }
        invites.setData(data);
        return Map.of("success", "true");
    }

    public Map<String, String> removeInvite(
            HttpServletRequest req,
            String inviteId
    ){
        String userId = jwtProvider.getSubset(req);
        Invites invites = invitesRepository.findByInviteId(inviteId)
                .orElseThrow(() -> new DocumentNotFoundException("청첩장을 찾을 수 없습니다."));
        if (!invites.getUserId().equals(userId)) {
            return Map.of("message", "다른 유저의 청첩장은 삭제 할 수 없습니다.");
        }
        invitesRepository.delete(invites);
        return Map.of("success", "true");
    }
}
