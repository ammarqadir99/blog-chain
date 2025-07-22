import React, { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { Comment } from '../../store/slices/articlesSlice';
import { UserCircleIcon } from '@heroicons/react/24/outline';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
  isAuthenticated: boolean;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onAddComment,
  isAuthenticated,
}) => {
  const [newComment, setNewComment] = useState('');
  const { user } = useAppSelector(state => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="border-t border-gray-200 pt-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Comments ({comments.length})
      </h3>

      {/* Add Comment Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex space-x-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
              alt={user?.name}
              className="h-10 w-10 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            Please{' '}
            <a href="/login" className="text-black font-medium hover:underline">
              sign in
            </a>{' '}
            to leave a comment.
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <img
              src={comment.author.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
              alt={comment.author.name}
              className="h-10 w-10 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-medium text-gray-900">
                  {comment.author.name}
                </span>
                <span className="text-sm text-gray-500">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p className="text-gray-800">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <UserCircleIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
};

export default CommentSection; 