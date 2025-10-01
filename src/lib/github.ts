const normalizeGraphqlRepo = (repo: GraphqlRepo) => ({
  id: repo.id,
  name: repo.name,
  description: repo.description,
  html_url: repo.url,
  homepage: repo.homepageUrl,
  language: repo.primaryLanguage?.name ?? null,
  stargazers_count: repo.stargazerCount,
  forks_count: repo.forkCount,
  topics: repo.repositoryTopics.nodes.map(node => node.topic.name),
  updated_at: repo.updatedAt,
});

const normalizeRestRepo = (repo: RestRepo) => ({
  id: repo.id.toString(),
  name: repo.name,
  description: repo.description,
  html_url: repo.html_url,
  homepage: repo.homepage,
  language: repo.language,
  stargazers_count: repo.stargazers_count,
  forks_count: repo.forks_count,
  topics: repo.topics ?? [],
  updated_at: repo.updated_at,
});

const GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

interface GraphqlRepo {
  id: string;
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  primaryLanguage: { name: string } | null;
  stargazerCount: number;
  forkCount: number;
  repositoryTopics: {
    nodes: Array<{
      topic: {
        name: string;
      };
    }>;
  };
  updatedAt: string;
}

interface RestRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  updated_at: string;
  fork?: boolean;
  archived?: boolean;
}

const fetchPinnedViaGraphql = async (username: string, token: string) => {
  const query = `
    query {
      user(login: "${username}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              id
              name
              description
              url
              homepageUrl
              primaryLanguage { name }
              stargazerCount
              forkCount
              repositoryTopics(first: 8) { nodes { topic { name } } }
              updatedAt
            }
          }
        }
      }
    }
  `;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'cv-portfolio-app',
    },
    body: JSON.stringify({ query }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL error: ${response.status}`);
  }

  const result = await response.json();
  if (!result?.data?.user?.pinnedItems?.nodes?.length) {
    return [];
  }

  return result.data.user.pinnedItems.nodes.map(normalizeGraphqlRepo);
};

const fetchRecentViaRest = async (username: string, token?: string) => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=12`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'User-Agent': 'cv-portfolio-app',
      },
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub REST error: ${response.status}`);
  }

  const repos = (await response.json()) as RestRepo[];
  return repos
    .filter(repo => !repo.fork && !repo.archived)
    .slice(0, 8)
    .map(normalizeRestRepo);
};

export const fetchGithubRepos = async (username: string) => {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (token) {
    try {
      const pinned = await fetchPinnedViaGraphql(username, token);
      if (pinned.length > 0) {
        return pinned;
      }
    } catch (error) {
      console.error('Error fetching GitHub pinned repos via GraphQL:', error);
    }
  }

  try {
    return await fetchRecentViaRest(username, token);
  } catch (error) {
    console.error('Error fetching GitHub repos via REST:', error);
    return [];
  }
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
