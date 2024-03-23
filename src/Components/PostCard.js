const PostCard = ({ post }) => {
    return (
       <div className = "post-card">
        <h3>{post.postTitle}</h3>
        <p>{post.contactInfo}</p>
        <p>{post.description}</p>
        <div className = "course-name">{post.courseDpt}{post.courseCode}</div>
       </div> 
    )
}

export default PostCard