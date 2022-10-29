import Nav from "../components/Nav";

function Layout({ children }) {
  return (
    <div className="mx-6 md-mx-auto font-poppins">
      <Nav />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
