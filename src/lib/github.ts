export const fetchGithubRepos = async (username: string) => {
  try {
    // First, fetch user's pinned repositories using the GraphQL API
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
                primaryLanguage {
                  name
                }
                stargazerCount
                forkCount
                repositoryTopics(first: 4) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
                updatedAt
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repos');
    }

    const data = await response.json();
    
    interface GithubRepo {
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
    
    // Transform the data to match our interface
    return data.data.user.pinnedItems.nodes.map((repo: GithubRepo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.url,
      homepage: repo.homepageUrl,
      language: repo.primaryLanguage?.name,
      stargazers_count: repo.stargazerCount,
      forks_count: repo.forkCount,
      topics: repo.repositoryTopics.nodes.map((topic) => topic.topic.name),
      updated_at: repo.updatedAt,
    }));
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
};

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
}
