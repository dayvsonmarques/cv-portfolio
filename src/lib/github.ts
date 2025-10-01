export const fetchGithubRepos = async (username: string) => {
  const response = await fetch(`/api/github/pinned?username=${encodeURIComponent(username)}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch pinned repositories: ${response.status}`);
  }

  const data = (await response.json()) as GithubRepo[] | { error: string };

  if (Array.isArray(data)) {
    return data;
  }

  throw new Error(data.error ?? 'Failed to fetch pinned repositories');
};

export interface GithubRepo {
  id: string;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
}
