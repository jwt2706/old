import React, { useEffect, useMemo, useState } from "react";
import { FaExternalLinkAlt, FaBook } from "react-icons/fa";

interface Repo {
  id: number;
  name: string;
  description: string;
  has_pages: boolean;
  owner: {
    login: string;
  };
  created_at: string;
}

interface HuggingFaceRepo {
  name: string;
  repo: string;
}

const Sidebar: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(window.innerWidth > 640);

  const externalRepos = useMemo(() => {
    return [
      "FRC2706/MergeData",
      "read-me-35/read-me-35.github.io",
    ];
  }, []);

  const huggingfaceRepos: HuggingFaceRepo[] = [
    {
      name: "Food Classification 86M",
      repo: "jwt2706/google-vit-base-patch16-224-in21k-finetuned-food-classification-86M-v0.1",
    },
  ];

  useEffect(() => {
    const fetchData = async (repo: string) => {
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Repo = await response.json();
        return data;
      } catch (error) {
        setError(error as Error);
      }
    };
  
    const fetchUserRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/jwt2706/repos");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Repo[] = await response.json();
        return data.filter((repo) => repo.description && repo.description.includes("[!website]"));
      } catch (error) {
        setError(error as Error);
      }
    };

    const fetchAllRepos = async () => {
      setLoading(true);
      try {
        const userRepos = await fetchUserRepos();
        let externalReposData: (Repo | undefined)[] = [];
        if (Array.isArray(externalRepos)) {
          externalReposData = await Promise.all(externalRepos.map(fetchData));
        }
        return [...(userRepos as Repo[]), ...externalReposData];
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRepos().then((repos) => {
      if (repos) {
        const definedRepos = repos.filter((repo): repo is Repo => Boolean(repo));
        definedRepos.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setRepos(definedRepos);
      }
    });
  }, [externalRepos]);

  return (
    <div>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-0 left-0 m-4 z-20 text-white border border-white hover:bg-white hover:text-black font-bold px-2 py-1 rounded-md"
      >
        {isVisible ? "Hide" : "Show"}
      </button>
      <aside
        className={`fixed left-0 top-0 z-10 h-screen w-64 bg-gray-800 bg-opacity-90 sm:bg-opacity-50 text-white p-6 transition-all duration-500 shadow-lg overflow-y-auto ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <br />
        <h2 className="text-2xl mt-4 text-center">Featured Projects</h2>
        <h6 className="text-center mb-4 text-sm text-gray-400">
          See docs (and demo if available)
        </h6>
        {loading ? (
          <p>Fetching repos...</p>
        ) : error ? (
          <p>There was a problem fetching the repos... D:</p>
        ) : (
          <>
            <ul className="list-none list-inside">
              {repos.map((repo) => (
                <li
                  key={repo.id}
                  className="mb-2 px-4 py-3 hover:bg-gray-700 rounded border border-gray-500 border-opacity-50"
                  title={repo.description.replace("[!website]", "")}
                >
                  <span className="block text-left">{repo.name}</span>
                  <span className="block text-sm mb-2 text-gray-400 truncate">
                    {repo.description.replace("[!website]", "")}
                  </span>
                  <div className="flex space-x-2">
                    {repo.has_pages && (
                      <a
                        href={`https://${repo.owner.login}.github.io/${repo.name}`}
                        className="text-blue-400 transition-transform duration-200 transform hover:scale-150"
                        aria-label="External link to project"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}
                    <a
                      href={`https://github.com/${repo.owner.login}/${repo.name}/`}
                      className="text-blue-400 transition-transform duration-200 transform hover:scale-150"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="See repository"
                      aria-label="External link to project repository and documentation"
                    >
                      <FaBook />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            <hr className="my-4" />
            <h2 className="text-2xl mt-4 text-center">Hugging Face</h2>
            <h6 className="text-center mb-4 text-sm text-gray-400">
              ML training & finetuning
            </h6>
            <ul className="list-none list-inside">
              {huggingfaceRepos.map((repoObj) => (
                <li
                  key={repoObj.repo}
                  className="mb-2 px-4 py-3 hover:bg-gray-700 rounded border border-gray-500 border-opacity-50"
                >
                  <span className="block text-left mb-2">{repoObj.name}</span>
                  <a
                    href={`https://huggingface.co/${repoObj.repo}`}
                    className="text-blue-400 transition-transform duration-200 transform hover:scale-150"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="See model on Hugging Face"
                    aria-label="External link to Hugging Face repository"
                  >
                    <FaBook />
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>
    </div>
  );
}

export default Sidebar;
