import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";

//components
import PostCard from "../Components/PostCard"
// search




// before search
const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [posts, setPosts] = useState(null);
  const [orderBy, setOrderBy] = useState('created_at')
  //const posts = [{ title: "hello" }, { title: "world" }];


  const handleDelete = (id) => {
    setPosts(prevPosts => {
      return prevPosts.filter(post => post.id !== id)
    })

  }

    useEffect(() => {
      const fetchPosts = async () => {
        const { data, error } = await supabase
          .from("studyBuddies")
          .select()
          .order(orderBy, {ascending: false})

        if (error) {
          setFetchError("Could not fetch the posts");
          setPosts(null);
          console.log(error);
        }
        if (data) {
          setPosts(data);
          setFetchError(null);
        }
      };

      fetchPosts();
    }, [orderBy]);

    console.log(supabase);
  return (
    <div className="page home">
      <h2>Active Posts</h2>
      {fetchError && <p>{fetchError}</p>}
      {posts && (
        <div className="posts">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('courseDpt')}>Subject </button>

          </div>
          <div className = "post-grid">
            {posts.map(post => (
              // <p>{post.postTitle}</p>
              <PostCard 
              key={post.id} 
              post={post} 
              onDelete={handleDelete}/>
            ))}
          </div>
        </div>
      )}
      <p></p>
    </div>
  );
};

export default Home;
