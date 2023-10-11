import Repos from "./Repos";
const UserProfile = ({ userData }) => {
  return (
    <>
      <div className="my-16 border-2 border-orange-500 bg-white rounded-lg p-8 text-black">
        <div className="flex gap-5">
          <img
            className="w-24 h-24 rounded-full"
            src={userData.avatar_url}
            alt={userData.name}
          />
          <button className="bg-orange-500 text-white rounded px-1 inline-block">
            <a
              className=""
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Profile
            </a>
          </button>
        </div>

        <div className="ml-8 self-start text-black mt-3">
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

          <h2 className="text-2xl font-bold mt-4 text-black">
            {userData.name}
          </h2>
          <p className="text-md font-bold text-orange-500">{userData.bio}</p>

          <div className="mt-2 text-black">
            <p className="text-md text-black">
              <span className="font-bold mr-1">Company:</span>
              {userData.company || "Not Specified"}
            </p>
            <p className="text-md text-black">
              <span className="font-bold text-black mr-1">Location:</span>
              {userData.location || "Not Specified"}
            </p>
            <p className="text-md">
              <span className="font-bold text-black mr-1">
                Blog / Website:
              </span>
              {userData.blog ? (
                <a
                  href={userData.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {userData.blog}
                </a>
              ) : (
                "Not Specified"
              )}
            </p>
            <p className="text-md text-black">
              <span className="font-bold text-black mr-1">
                Member Since:
              </span>
              {new Date(userData.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <Repos reposUrl={userData.repos_url} />
    </>
  );
};

export default UserProfile;
