import { auth, db } from "../utils/firebase";
import { useRouter } from "next/Router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

function post() {
  const [post, setPost] = useState({ description: " " });
  return (
    <div>
      <form
        action=""
        className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto"
      >
        <h1 className="text-2xl font-bold">create a new post</h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost(e.target.value)}
            className="bg-gray-800 h-48 w-full text-white rounded-lg p-2"
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <p>0/300</p>
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