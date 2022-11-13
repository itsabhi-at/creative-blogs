function Message({ children, avatar, description, username }) {
  return (
    <div className="bg-white p-8 px-4 border-b-2 rounded-lg shadow-lg mb-3">
      <div className="flex items-center mb-3 border-b-2 pb-3">
        <img
          className="rounded-full w-8 cursor-pointer mr-3"
          src={avatar}
          alt={username}
        />
        <h2>{username}</h2>
      </div>
      <div>
        <p>{description}</p>
      </div>

      {children}
    </div>
  );
}

export default Message;
