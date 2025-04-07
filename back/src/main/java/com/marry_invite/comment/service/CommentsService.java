package com.marry_invite.comment.service;

import com.marry_invite.comment.document.Comments;
import com.marry_invite.comment.dto.request.CommentRequest;
import com.marry_invite.comment.dto.response.CommentResponse;
import com.marry_invite.comment.exception.DataNotAllowException;
import com.marry_invite.comment.exception.PwNotMatchException;
import com.marry_invite.comment.repository.CommentsRepository;
import com.marry_invite.common.dto.response.ResponseMessage;
import com.marry_invite.common.dto.response.SuccessResponse;
import com.marry_invite.common.exception.DocumentNotFoundException;
import com.marry_invite.invite.document.Invites;
import com.marry_invite.invite.repository.InvitesRepository;
import com.marry_invite.users.provider.JWTProvider;
import io.netty.util.internal.StringUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentsService {
    private final CommentsRepository commentsRepository;
    private final InvitesRepository invitesRepository;
    private final JWTProvider jwtProvider;
    public ResponseMessage saveComments(
            String inviteId,
            CommentRequest data
    ){
        validateDate(data);

        Comments comments = Comments.of(data, inviteId);
        commentsRepository.save(comments);
        return SuccessResponse.DEFAULT;
    }

    public List<CommentResponse> getCommentList(String inviteId){
        return commentsRepository.findAllByInviteId(inviteId)
                .stream().map(CommentResponse::of)
                .toList();
    }

    public ResponseMessage modifyComment(
            String commentId,
            CommentRequest data
    ){
        validateDate(data);

        Comments comments = commentsRepository.findById(commentId)
                .orElseThrow(DocumentNotFoundException::new);
        if (!comments.getPw().equals(data.pw())){
            throw  new PwNotMatchException();
        }
        comments.setName(data.name());
        comments.setText(data.text());
        // mongoDB는 더티체킹을 안해주는 듯
        // 그래서 일부러 save로 변경사항을 저장
        commentsRepository.save(comments);
        return SuccessResponse.DEFAULT;
    }

    public ResponseMessage deleteComment(
            String commentId,
            String pw
    ){
        Comments comments = commentsRepository.findById(commentId)
                .orElseThrow(DocumentNotFoundException::new);
        if (!comments.getPw().equals(pw)){
            throw  new PwNotMatchException();
        }
        commentsRepository.delete(comments);
        return SuccessResponse.DEFAULT;
    }

    private void validateDate(CommentRequest data){
        if (StringUtil.isNullOrEmpty(data.text()) || data.text().replace(" ", "").isEmpty()){
            throw new DataNotAllowException("글을 입력해주세요");
        }
        if (StringUtil.isNullOrEmpty(data.name()) || data.name().replace(" ", "").isEmpty()){
            throw new DataNotAllowException("이름을 입력해주세요");
        }
        if (StringUtil.isNullOrEmpty(data.pw()) || data.pw().replace(" ", "").isEmpty()){
            throw new DataNotAllowException("비밀번호를 입력해주세요");
        }
    }

    public ResponseMessage deleteCommentByAdmin(
            String commentId,
            HttpServletRequest request
    ){
        String userId = jwtProvider.getSubset(request);
        Comments comments = commentsRepository.findById(commentId)
                .orElseThrow(() -> new DocumentNotFoundException("방문록을 찾을 수 없습니다."));
        Invites invites = invitesRepository.findByInviteId(comments.getInviteId())
                .orElseThrow(() -> new DocumentNotFoundException("청첩장을 찾을 수 없습니다."));

        if (!invites.getUserId().equals(userId)){
            throw new AccessDeniedException("다른 유저의 청첩장은 수정 할 수 없습니다.");
        }

        commentsRepository.delete(comments);

        return SuccessResponse.DEFAULT;
    }
}
