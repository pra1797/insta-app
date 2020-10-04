import React, {useState, useEffect} from 'react';
import './post.css';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import { db } from './firebase';
import firebase from 'firebase';

function Post({postId, user, username, caption, imageUrl }) {
	const [comments,setComments] = useState([]);
	const [comment,setComment] = useState('');
	useEffect(() => {
		let unsubscribe;
		if (postId) {
			unsubscribe = db
			.collection('posts')
			.doc(postId)
			.collection('comments')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => {
				setComments(snapshot.docs.map((doc) => doc.data()));
			});
		}
		return () => {
			unsubscribe();
		};
	}, [postId]);

	const postComment = (event) => {
		event.preventDefault();
		db.collection("posts").doc(postId).collection("comments").add({
			text: comment,
			username: user.displayName,
			timestamp:firebase.firestore.FieldValue.serverTimestamp()
		})
		 setComment('');
	}


	return (
		<div className = "post">
			<div className = "post__header">
				<Avatar 
				className = "post__avatar"
				alt = "P"
				src = "/images/profile.jpg"
				/>
				<h3 className = "username">{username}</h3>
			</div>
		
			<img className = "post__image" src= {imageUrl} alt = ""/> 
			
	<h4 className = "post__caption"><strong>{username}</strong> {caption}</h4>

		{
			<div className = "post__comment">
				{comments.map((comment) => (
					<p>
						<strong>{comment.username}</strong> {comment.text}
					</p>
				))}
			</div>
		}
		{user && (
			<form className = "post__commentBox">
				<input 
				className = "post__input"
				type = "text"
				placeholder = "Add a comment..."
				value = {comment}
				onChange={(e) => setComment(e.target.value)}
				/>
				<Button className = "post__button"
				color = "primary"
				disabled = {!comment}
				type = "submit"
				onClick = {postComment}
				>
					Post
				</Button>
			</form>

		)}
		</div>
	)
}
export default Post
