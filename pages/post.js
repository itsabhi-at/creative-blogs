import { auth, db } from "../utils/firebase";
import { useRouter } from "next/Router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

function post() {
  const [post, setPost] = useState({ description: " " });
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  // submit post
  const submitPost = async (e) => {
    e.preventDefault();

    if (!post.description) {
      toast.error("Description Not Available!!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      return;
    }
    if (post.description.length > 300) {
      toast.error("Description too long!!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      return;
    }
    // make a new collection
    const collectionRef = new collection(db, "posts");
    await addDoc(collectionRef, {
      ...post,
      timestamp: serverTimestamp(),
      user: user.uid,
      avatar: user.photoURL,
      username: user.displayName,
    });
    setPost({ ...post, description: "" });
    return route.push("/");
  };
  return (
    <div>
      <form
        onSubmit={submitPost}
        action=""
        className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto"
      >
        <h1 className="text-2xl font-bold">create a new post</h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="bg-gray-800 h-48 w-full text-white rounded-lg p-2"
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <p
            className={`text-cyan-600 font-medium text-sm ${
              post.description.length > 300 ? "text-red-500" : ""
            }`}
          >
            {post.description.length}/300
          </p>
        </div>

        <button
          className="font-medium bg-cyan-500 text-white rounded-md px-4 py-2 w-full"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default post;
