import React, { useEffect, useState } from 'react'
import './Comments.css'
import DisplayComments from './DisplayComments';
import {useDispatch, useSelector} from 'react-redux';
import {postComment} from '../../actions/comments.js'

function Comments({videoId,isSubscribed}) {
    const [commentText,setCommentText] = useState("");


    const CurrentUser = useSelector(state => state?.currentUserReducer);
 const commentsList = useSelector(s=> s.commentReducer);

//     const commentsList =[
//  {
//     _id:1,
//     commentBody: "hello",
//     userCommented: "abc",
//  },
//    {
//     _id:2,
//     commentBody: "hii",
//     userCommented: "xyz",
//    },
// ]
   

  const dispatch = useDispatch();


  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (CurrentUser) {
      if(isSubscribed){
        if (!commentText) {
          alert("Plz Type your comment ! ");
        } else {
          const commentData =  {
            videoId: videoId,
            userId: CurrentUser?.result._id,
            commentBody: commentText,
            userCommented: CurrentUser?.result.name};
            dispatch(postComment(commentData));
  
          setCommentText("");
        }
      }
      else{
        alert("You need to Subscribe to add a commnet")
      }
    }else{
      alert("Plz login to post your commnet !")
    }
  };

  return (
    <>
      <form className="comments_sub_form_comments" onSubmit={handleOnSubmit}>
        <input
          type="text"
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="add comment..."
          value={commentText}
          className="comment_ibox"
        />
        <input type="submit" value="add" className="comment_add_btn_comments" />
      </form> 
      <div className="display_comment_container">
      {commentsList?.data
        ?.filter((q) => videoId === q?.videoId)
        .reverse()
        .map((m) => {
          return (
            <DisplayComments
              cId={m._id}
              userId={m.userId}
              commentBody={m.commentBody}
              commentOn={m.commentOn}
              userCommented={m.userCommented}
            />
          );
        })}
    </div>
    </>

  );
}

export default Comments;