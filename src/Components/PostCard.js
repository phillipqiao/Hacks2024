import { Link } from 'react-router-dom'
import supabase from "../config/supabaseClient"

const PostCard = ({ post, onDelete }) => {

    const handleDelete = async () => {
        
        const { data, error } = await supabase
          .from('studyBuddies')
          .delete()
          .eq('id', post.id)
        
        if (error) {
          console.log(error)
        }
        if (data) {
          console.log(data)
          onDelete(post.id)
        }
    }

    return (
       <div className = "post-card">
        <h3>{post.postTitle}</h3>
        <p>{post.contactInfo}</p>
        <p>{post.description}</p>
        <div className = "course-name">{post.courseDpt}{post.courseCode}</div>
        <div className="buttons">
        <Link to={"/" + post.id}>
          <i className="material-icons">edit</i>
        </Link>
            <i className="material-icons" onClick={handleDelete}>delete</i>
      </div>
       </div> 
    )
}

export default PostCard