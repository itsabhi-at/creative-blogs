import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
function Nav() {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className="flex justify-between items-center py-5">
      <Link href="/">
        <button className="text-large font-medium">Creative Minds</button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <Link href="/auth/login">
            <button className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8">
              Login
            </button>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-6">
            <Link href="/post">
              <button className="font-medium bg-cyan-500 text-white rounded-md px-4 py-2">
                Post
              </button>
            </Link>
            <Link href="/profile">
              <img
                className="rounded-full w-12 cursor-pointer"
                src={user.photoURL}
                alt="user-img"
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
