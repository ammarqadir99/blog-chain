import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchArticles } from '../store/slices/articlesSlice';
import ArticleCard from '../components/articles/ArticleCard';
import TrendingArticles from '../components/articles/TrendingArticles';
import TagCloud from '../components/articles/TagCloud';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, loading, error } = useAppSelector(state => state.articles);

  useEffect(() => {
    dispatch(fetchArticles(1));
  }, [dispatch]);

  if (loading && articles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border-b border-gray-200 pb-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error loading articles</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Latest Stories</h1>
            <p className="text-gray-600">Discover the latest articles from our community</p>
          </div>
          
          <div className="space-y-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            <TrendingArticles />
            <TagCloud />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 