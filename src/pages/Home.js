import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";

//components
import PostCard from "../Components/PostCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [posts, setPosts] = useState(null);
  //const posts = [{ title: "hello" }, { title: "world" }];

    useEffect(() => {
      const fetchPosts = async () => {
        const { data, error } = await supabase
          .from("studyBuddies")
          .select().order('id', {ascending: true});
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
    }, [posts]);

    console.log(supabase);
  return (
    <div className="page home">
      <h2>Active Posts</h2>
      {fetchError && <p>{fetchError}</p>}
      {posts && (
        <div className="posts">
          {/* order by course-dpt or time*/}
          <div className = "post-grid">
            {posts.map(post => (
              // <p>{post.postTitle}</p>
              <PostCard key = {post.id} post={post}/>
            ))}
          </div>
        </div>
      )}
      <p></p>
    </div>
  );
};

export default Home;
