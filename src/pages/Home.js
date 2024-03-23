import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from("studyBuddies").select();
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
  }, []);

  console.log(supabase);
  return (
    <div className="page home">
      <h2>Home</h2>
      {fetchError && <p>{fetchError}</p>}
      {posts && (
        <div className="posts">
          {posts.map((post) => (
            <p>{post.postTitle}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
