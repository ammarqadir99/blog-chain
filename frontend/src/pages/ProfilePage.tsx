import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { updateProfile } from '../store/slices/authSlice';
import { Link } from 'react-router-dom';
import { PencilIcon } from '@heroicons/react/24/outline';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { articles } = useAppSelector(state => state.articles);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    twitter: user?.socialLinks?.twitter || '',
    github: user?.socialLinks?.github || '',
    website: user?.socialLinks?.website || '',
  });

  const userArticles = articles.filter(article => article.author.id === user?.id);

  const handleSave = () => {
    dispatch(updateProfile({
      name: formData.name,
      bio: formData.bio,
      socialLinks: {
        twitter: formData.twitter,
        github: formData.github,
        website: formData.website,
      },
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      bio: user?.bio || '',
      twitter: user?.socialLinks?.twitter || '',
      github: user?.socialLinks?.github || '',
      website: user?.socialLinks?.website || '',
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-6">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face'}
              alt={user.name}
              className="h-24 w-24 rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
              <p className="text-gray-600">@{user.username}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <PencilIcon className="h-4 w-4" />
            <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Bio</h3>
          {isEditing ? (
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              rows={3}
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-gray-700">{user.bio || 'No bio yet.'}</p>
          )}
        </div>

        {/* Social Links */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
              {isEditing ? (
                <input
                  type="url"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="https://twitter.com/username"
                />
              ) : (
                <p className="text-gray-700">
                  {user.socialLinks?.twitter ? (
                    <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {user.socialLinks.twitter}
                    </a>
                  ) : (
                    'Not provided'
                  )}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
              {isEditing ? (
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="https://github.com/username"
                />
              ) : (
                <p className="text-gray-700">
                  {user.socialLinks?.github ? (
                    <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {user.socialLinks.github}
                    </a>
                  ) : (
                    'Not provided'
                  )}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              {isEditing ? (
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="https://yourwebsite.com"
                />
              ) : (
                <p className="text-gray-700">
                  {user.socialLinks?.website ? (
                    <a href={user.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {user.socialLinks.website}
                    </a>
                  ) : (
                    'Not provided'
                  )}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Edit Actions */}
        {isEditing && (
          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              className="btn-primary"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Published Stories */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Published Stories</h2>
          <Link to="/editor" className="btn-primary">
            Write New Story
          </Link>
        </div>

        {userArticles.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No stories yet</h3>
            <p className="text-gray-600 mb-6">Start writing your first story to share with the world.</p>
            <Link to="/editor" className="btn-primary">
              Write Your First Story
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {userArticles.map((article) => (
              <div key={article.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link to={`/article/${article.slug}`} className="block group">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors mb-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                    </Link>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{article.readingTime} min read</span>
                      <span>•</span>
                      <span>{article.claps} claps</span>
                      <span>•</span>
                      <span>{article.comments.length} comments</span>
                    </div>
                  </div>
                  <Link
                    to={`/editor/${article.slug}`}
                    className="ml-4 px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage; 