import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { addClap } from '../../store/slices/articlesSlice';
import { Article } from '../../store/slices/articlesSlice';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const dispatch = useAppDispatch();

  const handleClap = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addClap(article.id));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="article-card">
      <div className="flex items-start space-x-4">
        {/* Author Info */}
        <div className="flex-shrink-0">
          <img
            src={article.author.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
            alt={article.author.name}
            className="h-10 w-10 rounded-full"
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <span className="font-medium text-gray-900">{article.author.name}</span>
            <span>•</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span>{article.readingTime} min read</span>
          </div>
          
          <Link to={`/article/${article.slug}`} className="block group">
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors mb-2 line-clamp-2">
              {article.title}
            </h2>
            <p className="text-gray-600 mb-3 line-clamp-3">
              {article.excerpt}
            </p>
          </Link>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleClap}
              className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <HandThumbUpIcon className="h-5 w-5" />
              <span className="text-sm">{article.claps}</span>
            </button>
            
            <div className="text-sm text-gray-500">
              {article.comments.length} comments
            </div>
          </div>
        </div>
        
        {/* Featured Image */}
        {article.featuredImage && (
          <div className="flex-shrink-0 ml-4">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="h-24 w-32 object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </article>
  );
};

export default ArticleCard; 