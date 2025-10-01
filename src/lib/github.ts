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

const normalizeCommunityPinnedRepo = (repo: CommunityPinnedRepo) => ({
  id: `${repo.owner}/${repo.repo}`,
  name: repo.repo,
  description: repo.description ?? null,
  html_url: repo.link,
  homepage: repo.website ?? null,
  language: repo.language ?? null,
  stargazers_count: repo.stars ?? 0,
  forks_count: repo.forks ?? 0,
  topics: repo.topics ?? [],
  updated_at: repo.updatedAt ?? new Date().toISOString(),
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

interface CommunityPinnedRepo {
  repo: string;
  owner: string;
  link: string;
  description?: string | null;
  website?: string | null;
  language?: string | null;
  stars?: number;
  forks?: number;
  topics?: string[];
  updatedAt?: string;
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

const COMMUNITY_PINNED_ENDPOINT = 'https://gh-pinned-repos.egoist.dev/';

const fetchPinnedViaCommunityApi = async (username: string) => {
  const response = await fetch(`${COMMUNITY_PINNED_ENDPOINT}?username=${encodeURIComponent(username)}`, {
    headers: {
      'User-Agent': 'cv-portfolio-app',
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Community pinned repos error: ${response.status}`);
  }

  const data = (await response.json()) as CommunityPinnedRepo[];
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  return data.slice(0, 6).map(normalizeCommunityPinnedRepo);
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
    return await fetchPinnedViaCommunityApi(username);
  } catch (error) {
    console.error('Error fetching GitHub pinned repos via community API:', error);
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
