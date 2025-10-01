'use client';

import React, { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { fetchGithubRepos, type GithubRepo } from '@/lib/github';

const GitHubProjects = () => {
  const { t } = useApp();
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<'fetch' | 'empty' | ''>('');

  useEffect(() => {
    const loadRepos = async () => {
      try {
        setIsLoading(true);
        setError('');
        const data = await fetchGithubRepos('dayvsonmarques');
        setRepos(data);
        if (!data.length) {
          setError('empty');
        }
      } catch (err) {
        setError('fetch');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadRepos();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="w-full px-4 mx-auto max-w-[calc(100%-60px)]">
          <div className="text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96"></div>
              <span className="mt-4 text-gray-500 dark:text-gray-400">{t('projects.github.loading')}</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error === 'fetch') {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="w-full px-4 mx-auto max-w-[calc(100%-60px)]">
          <div className="text-center text-red-600 dark:text-red-400">
            {t('projects.github.error')}
          </div>
        </div>
      </section>
    );
  }

  if (error === 'empty') {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="w-full px-4 mx-auto max-w-[calc(100%-60px)]">
          <div className="text-center text-gray-600 dark:text-gray-300">
            {t('projects.github.noPinned')}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="w-full px-4 mx-auto max-w-[calc(100%-60px)]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-display font-bold text-gray-800 dark:text-white mb-4">{t('projects.title')}</h2>
            <div className="w-24 h-1 bg-gray-700 dark:bg-gray-300 mx-auto mb-4"></div>
          </div>

        </div>

        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {repo.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 h-20 overflow-hidden">
                  {repo.description || t('projects.github.noDescription')}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.topics?.slice(0, 4).map((topic) => (
                    <span
                      key={topic}
                      className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  {repo.language && (
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                      <span>{repo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>{repo.forks_count}</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-4">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                  >
                    {t('projects.github.viewCode')}
                  </a>
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
                    >
                      {t('projects.github.liveDemo')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/dayvsonmarques"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            {t('projects.github.viewMore')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default GitHubProjects;
