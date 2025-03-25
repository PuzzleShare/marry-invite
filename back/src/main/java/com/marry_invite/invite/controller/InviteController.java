package com.marry_invite.invite.controller;

import com.marry_invite.invite.document.block.RootBlock;
import com.marry_invite.invite.dto.response.InviteResponse;
import com.marry_invite.invite.service.InvitesService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class InviteController {
    private final InvitesService invitesService;

    @GetMapping("/api/invite")
    public List<InviteResponse> getInviteList(HttpServletRequest req){
        return invitesService.getInviteList(req);
    }

    @GetMapping("/api/invite/{inviteId}")
    public InviteResponse getInvite(
            HttpServletRequest req,
            @PathVariable String inviteId
    ){
        return invitesService.getInvite(req, inviteId);
    }

    @PostMapping("/api/invite")
    public Map<String, String> createInvite(HttpServletRequest req){
        return invitesService.createInvite(req);
    }

    @PatchMapping("/api/invite/{inviteId}")
    public Map<String, String> modifyInvite(
            HttpServletRequest req,
            @PathVariable String inviteId,
            @RequestBody RootBlock data
    ){
        return invitesService.modifyInvite(req, inviteId, data);
    }

    @DeleteMapping("/api/invite/{inviteId}")
    public Map<String, String> removeInvite(
            HttpServletRequest req,
            @PathVariable String inviteId
    ){
        return invitesService.removeInvite(req, inviteId);
    }
}
