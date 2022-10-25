import Link from "next/link";
function Nav() {
  return (
    <nav className="flex justify-between items-center py-5">
      <Link href="/">
        <button className="text-large font-medium">Creative Minds</button>
      </Link>
      <ul className="flex items-center gap-10">
        <Link href="/auth/login">
          <button className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8">
            Login
          </button>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
