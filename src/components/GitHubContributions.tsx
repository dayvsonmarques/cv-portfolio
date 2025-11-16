'use client';

import React, { useEffect, useState } from 'react';

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

const GitHubContributions = ({ username }: { username: string }) => {
  const [contributions, setContributions] = useState<ContributionsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadContributions = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const response = await fetch(`/api/github/contributions?username=${encodeURIComponent(username)}`, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch contributions');
        }

        const data = await response.json();
        setContributions(data);
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadContributions();
  }, [username]);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !contributions) {
    return null;
  }

  const getColorForLevel = (level: number) => {
    const colors = [
      'bg-gray-100 dark:bg-gray-700',
      'bg-green-200 dark:bg-green-900',
      'bg-green-400 dark:bg-green-700',
      'bg-green-600 dark:bg-green-500',
      'bg-green-800 dark:bg-green-300',
    ];
    return colors[level] || colors[0];
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthLabels: { month: string; weekIndex: number }[] = [];
  
  contributions.weeks.forEach((week, index) => {
    const firstDay = week.days[0];
    if (firstDay) {
      const date = new Date(firstDay.date);
      const day = date.getDate();
      if (day <= 7) {
        monthLabels.push({
          month: months[date.getMonth()],
          weekIndex: index,
        });
      }
    }
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          Contribuições no último ano
        </h3>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {contributions.totalContributions.toLocaleString()} total
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="relative mb-1 text-xs text-gray-600 dark:text-gray-400 h-4" style={{ paddingLeft: '28px' }}>
            {monthLabels.map((label, idx) => (
              <span
                key={idx}
                className="absolute whitespace-nowrap"
                style={{
                  left: `${28 + label.weekIndex * 13}px`,
                }}
              >
                {label.month}
              </span>
            ))}
          </div>

          {/* Contribution grid */}
          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col justify-between text-xs text-gray-600 dark:text-gray-400 pr-2">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Weeks */}
            <div className="flex gap-1">
              {contributions.weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1">
                  {week.days.map((day, dayIdx) => (
                    <div
                      key={dayIdx}
                      className={`w-3 h-3 rounded-sm ${getColorForLevel(day.level)} hover:ring-2 hover:ring-blue-500 transition-all cursor-pointer`}
                      title={`${day.count} contributions on ${new Date(day.date).toLocaleDateString()}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 text-xs text-gray-600 dark:text-gray-400">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getColorForLevel(level)}`}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>

      {contributions.mostActiveDay.count > 0 && (
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Most active day: <span className="font-semibold text-gray-800 dark:text-white">
            {new Date(contributions.mostActiveDay.date).toLocaleDateString()} ({contributions.mostActiveDay.count} contributions)
          </span>
        </div>
      )}
    </div>
  );
};

export default GitHubContributions;
