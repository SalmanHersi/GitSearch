

const UserProfile = ({ userData }) => {
  return (
    <>
      <div className="my-16 border-2 border-blue-500 rounded-lg p-8">
        <div className="flex gap-5">
          <img
            className="w-24 h-24 rounded-full"
            src={userData.avatar_url}
            alt={userData.name}
          />
          <button className="bg-blue-500 text-white py-1 px-4 rounded">
            <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </button>
        </div>

        <div className="ml-8 self-start">
          <div className="flex gap-4">
            <span className="text-orange text-sm">
              Public Repos: {userData.public_repos}
            </span>
            <span className="text-pink text-sm">
              Public Gists: {userData.public_gists}
            </span>
            <span className="text-cyan text-sm">
              Followers: {userData.followers}
            </span>
            <span className="text-purple text-sm">
              Following: {userData.following}
            </span>
          </div>

          <h2 className="text-2xl font-bold mt-4 text-blue-400">
            {userData.name}
          </h2>
          <p className="text-md font-bold text-blue-500">
            {userData.bio}
          </p>

          <div className="mt-2">
            <p className="text-md">
              <span className="font-bold text-blue-200 mr-1">Company:</span>
              {userData.company || "Not Specified"}
            </p>
            <p className="text-md">
              <span className="font-bold text-blue-200 mr-1">Location:</span>
              {userData.location || "Not Specified"}
            </p>
            <p className="text-md">
              <span className="font-bold text-blue-200 mr-1">Blog / Website:</span>
              {userData.blog ? (
                <a href={userData.blog} target="_blank" rel="noopener noreferrer">
                  {userData.blog}
                </a>
              ) : (
                "Not Specified"
              )}
            </p>
            <p className="text-md">
              <span className="font-bold text-blue-200 mr-1">Member Since:</span>
              {new Date(userData.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>


    </>
  );
};

export default UserProfile;
