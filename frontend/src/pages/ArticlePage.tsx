import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchArticleBySlug, clearCurrentArticle, addClap, addComment } from '../store/slices/articlesSlice';
import { HandThumbUpIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import CommentSection from '../components/articles/CommentSection';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const { currentArticle, loading, error } = useAppSelector(state => state.articles);
  const { user, isAuthenticated } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (slug) {
      dispatch(fetchArticleBySlug(slug));
    }
    return () => {
      dispatch(clearCurrentArticle());
    };
  }, [dispatch, slug]);

  const handleClap = () => {
    if (currentArticle) {
      dispatch(addClap(currentArticle.id));
    }
  };

  const handleAddComment = (content: string) => {
    if (currentArticle && user) {
      const newComment = {
        id: Date.now().toString(),
        content,
        author: {
          id: user.id,
          name: user.name,
          username: user.username,
          avatar: user.avatar,
        },
        createdAt: new Date().toISOString(),
      };
      dispatch(addComment({ articleId: currentArticle.id, comment: newComment }));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h2>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {currentArticle.title}
        </h1>
        
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={currentArticle.author.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'}
            alt={currentArticle.author.name}
            className="h-12 w-12 rounded-full"
          />
          <div>
            <div className="font-medium text-gray-900">{currentArticle.author.name}</div>
            <div className="text-sm text-gray-500">
              {formatDate(currentArticle.publishedAt)} • {currentArticle.readingTime} min read
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {currentArticle.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Featured Image */}
        {currentArticle.featuredImage && (
          <img
            src={currentArticle.featuredImage}
            alt={currentArticle.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
        )}
      </header>

      {/* Article Content */}
      <article className="prose prose-lg max-w-none mb-12">
        <div 
          className="text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: currentArticle.content }}
        />
      </article>

      {/* Article Actions */}
      <div className="border-t border-gray-200 pt-8 mb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleClap}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <HandThumbUpIcon className="h-6 w-6" />
              <span>{currentArticle.claps} claps</span>
            </button>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <ChatBubbleLeftIcon className="h-5 w-5" />
              <span>{currentArticle.comments.length} comments</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="btn-secondary">Share</button>
            <button className="btn-secondary">Bookmark</button>
          </div>
        </div>
      </div>

      {/* Author Bio */}
      <div className="bg-gray-50 rounded-lg p-6 mb-12">
        <div className="flex items-start space-x-4">
          <img
            src={currentArticle.author.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'}
            alt={currentArticle.author.name}
            className="h-16 w-16 rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {currentArticle.author.name}
            </h3>
            {currentArticle.author.bio && (
              <p className="text-gray-600 mb-3">{currentArticle.author.bio}</p>
            )}
            <Link
              to={`/@${currentArticle.author.username}`}
              className="text-sm font-medium text-gray-900 hover:text-gray-700"
            >
              More from {currentArticle.author.name}
            </Link>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <CommentSection
        comments={currentArticle.comments}
        onAddComment={handleAddComment}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
};

export default ArticlePage; 