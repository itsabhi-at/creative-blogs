import { auth } from "../utils/firebase";
import { useRouter } from "next/Router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

function profile() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  const getData = async () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (!user) {
      return route.push("/auth/login");
    }
  };
  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <div>
      <div>Hi, User</div>
      <div>your posts</div>
      <button
        onClick={() => {
          auth.signOut();
        }}
        className="font-medium bg-cyan-500 text-white rounded-md px-4 py-2 mt-4"
      >
        sign out
      </button>
    </div>
  );
}

export default profile;
