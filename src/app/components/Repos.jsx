import { useEffect, useState } from "react";

const Repos = ({ reposUrl }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const res = await fetch(reposUrl);
        const data = await res.json();
        if (res.status !== 200) {
          throw new Error(data.message || "Failed to fetch repositories");
        }
        setRepos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [reposUrl]);

  return (
    <>
      <h1 className="text-center text-blue-400 font-bold text-3xl mt-4">
        Browse repos
      </h1>
      {loading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}

      {repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .map((repo, idx) => {
          if (idx > 4 && !showMore) return null;
          return (
            <div
              key={repo.id}
              className="bg-blue-200 hover:bg-blue-300 my-4 px-10 py-4 flex justify-between items-center rounded-lg transition-all ease-in-out duration-300"
            >
              <div className="flex flex-col">
                <a
                  href={repo.html_url}
                  className="font-bold text-md text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
                <span className="text-whatsapp text-xs text-center mt-1">
                  Language: {repo.language || "None"}
                </span>
              </div>

              <div className="flex ml-6 gap-4">
                <span className="text-orange text-sm flex-1 text-center">
                  Stars: {repo.stargazers_count}
                </span>
                <span className="text-pink text-sm flex-1 text-center">
                  Forks: {repo.forks_count}
                </span>
                <span className="text-cyan text-sm flex-1 text-center">
                  Watchers: {repo.watchers_count}
                </span>
              </div>
            </div>
          );
        })}

      {showMore && (
        <div className="flex justify-center my-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowMore(false)}
          >
            Show Less
          </button>
        </div>
      )}

      {!showMore && repos.length > 5 && ( //Don't show button if there is less
        <div className="flex justify-center my-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowMore(true)}
          >
            Show More
          </button>
        </div>
      )}
    </>
  );
};

export default Repos;
