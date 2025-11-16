import { NextRequest, NextResponse } from "next/server";

interface GraphQLWeek {
  contributionDays: Array<{
    date: string;
    contributionCount: number;
    contributionLevel: string;
  }>;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionWeek {
  days: ContributionDay[];
}

interface ContributionsData {
  totalContributions: number;
  weeks: ContributionWeek[];
  firstContribution: string;
  mostActiveDay: {
    date: string;
    count: number;
  };
}

const GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

async function fetchContributionsViaGraphql(username: string, token: string): Promise<ContributionsData> {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "cv-portfolio-app",
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL error: ${response.status}`);
  }

  const result = await response.json();
  const calendar = result?.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) {
    throw new Error("No contribution data found");
  }

  const weeks = calendar.weeks.map((week: GraphQLWeek) => ({
    days: week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: day.contributionLevel === "NONE" ? 0 :
             day.contributionLevel === "FIRST_QUARTILE" ? 1 :
             day.contributionLevel === "SECOND_QUARTILE" ? 2 :
             day.contributionLevel === "THIRD_QUARTILE" ? 3 : 4,
    })),
  }));

  // Find most active day
  let mostActiveDay = { date: "", count: 0 };
  let firstContribution = "";

  weeks.forEach((week: ContributionWeek) => {
    week.days.forEach((day) => {
      if (day.count > mostActiveDay.count) {
        mostActiveDay = { date: day.date, count: day.count };
      }
      if (day.count > 0 && (!firstContribution || day.date < firstContribution)) {
        firstContribution = day.date;
      }
    });
  });

  return {
    totalContributions: calendar.totalContributions,
    weeks,
    firstContribution,
    mostActiveDay,
  };
}

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Missing username parameter" }, { status: 400 });
  }

  const token = process.env.GITHUB_GRAPHQL_TOKEN
    ?? process.env.GITHUB_TOKEN
    ?? process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "GitHub token required for contributions data" },
      { status: 401 }
    );
  }

  try {
    const contributions = await fetchContributionsViaGraphql(username, token);
    return NextResponse.json(contributions, { status: 200 });
  } catch (error) {
    console.error("[api/github/contributions] Fetch failed", error);
    return NextResponse.json(
      { error: "Unable to fetch contribution data" },
      { status: 500 }
    );
  }
}
