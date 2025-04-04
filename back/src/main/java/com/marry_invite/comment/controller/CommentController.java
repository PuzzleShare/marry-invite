package com.marry_invite.comment.controller;

import com.marry_invite.comment.dto.request.CommentRequest;
import com.marry_invite.comment.dto.response.CommentResponse;
import com.marry_invite.comment.service.CommentsService;
import com.marry_invite.common.dto.response.ResponseMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommentController {
    private final CommentsService commentsService;

    @PostMapping("/api/{inviteId}/comment")
    public ResponseMessage saveComment(
            @PathVariable String inviteId,
            @RequestBody CommentRequest data
    ){
        return commentsService.saveComments(inviteId, data);
    }

    @GetMapping("/api/{inviteId}/comment")
    public List<CommentResponse> getCommentList(@PathVariable String inviteId){
        return commentsService.getCommentList(inviteId);
    }

    @PutMapping("/api/comment/{commentId}")
    public ResponseMessage modifyComment(
            @PathVariable String commentId,
            @RequestBody CommentRequest data
    ){
        return commentsService.modifyComment(commentId, data);
    }

    @DeleteMapping("/api/comment/{commentId}")
    public ResponseMessage deleteComment(
            @PathVariable String commentId,
            @RequestBody String pw
    ){
        return commentsService.deleteComment(commentId, pw);
    }
}
