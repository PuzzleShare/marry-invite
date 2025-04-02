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
import io.netty.util.internal.StringUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentsService {
    private final CommentsRepository commentsRepository;
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
                .orElseThrow(() -> new DocumentNotFoundException("해당 게시글을 찾을 수 없습니다."));
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
                .orElseThrow(() -> new DocumentNotFoundException("해당 게시글을 찾을 수 없습니다."));
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
}
