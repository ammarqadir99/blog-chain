import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setSelectedTag } from '../../store/slices/uiSlice';

const TagCloud: React.FC = () => {
  const dispatch = useAppDispatch();

  const popularTags = [
    'Technology',
    'Programming',
    'Web Development',
    'React',
    'JavaScript',
    'Python',
    'Design',
    'Productivity',
    'Career',
    'Startups',
    'AI',
    'Machine Learning',
  ];

  const handleTagClick = (tag: string) => {
    dispatch(setSelectedTag(tag));
    // You can add navigation logic here to filter articles by tag
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tags</h3>
      <div className="flex flex-wrap gap-2">
        {popularTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="tag hover:bg-gray-200 transition-colors cursor-pointer"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagCloud; 