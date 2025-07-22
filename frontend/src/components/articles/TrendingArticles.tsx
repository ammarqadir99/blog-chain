import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { Article } from '../../store/slices/articlesSlice';

const TrendingArticles: React.FC = () => {
  const { trendingArticles } = useAppSelector(state => state.articles);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending</h3>
      <div className="space-y-4">
        {trendingArticles.map((article, index) => (
          <div key={article.id} className="flex items-start space-x-3">
            <span className="text-2xl font-bold text-gray-300 flex-shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 min-w-0">
              <Link
                to={`/article/${article.slug}`}
                className="block group"
              >
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 mb-1">
                  {article.title}
                </h4>
              </Link>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>{article.author.name}</span>
                <span>•</span>
                <span>{formatDate(article.publishedAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingArticles; 