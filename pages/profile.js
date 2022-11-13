import { auth, db } from "../utils/firebase";
import { useRouter } from "next/Router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Message from "../components/Message";
import { BiTrash } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import { async } from "@firebase/util";
import Link from "next/link";

function profile() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [Posts, setPosts] = useState([]);

  const getData = async () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (!user) {
      return route.push("/auth/login");
    }
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    return unsubscribe;
  };
  //** delete post */
  const deletePost = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };
  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <div>
      <div>Hi,User</div>
      <div>
        {Posts.map((post) => (
          <Message key={post.id} {...post}>
            <div className="flex gap-4 items-center mt-8">
              <button
                onClick={() => deletePost(post.id)}
                className="flex gap-2 text-red-600 items-center justify-center border rounded-md shadow-md py-2 px-4"
              >
                <BiTrash className="text-2xl" /> Delete
              </button>
              <Link href={{ pathname: "/post", query: post }}>
                <button className="flex gap-2 text-teal-600 items-center justify-center border rounded-md shadow-md py-2 px-4">
                  <TbEdit className="text-2xl" /> Edit
                </button>
              </Link>
            </div>
          </Message>
        ))}
      </div>
      <button
        onClick={() => {
          auth.signOut();
        }}
        className="font-medium bg-cyan-500 text-white rounded-md px-4 py-2 my-4"
      >
        sign out
      </button>
    </div>
  );
}

export default profile;
