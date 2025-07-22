import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  tags: string[];
  author: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    bio?: string;
  };
  publishedAt: string;
  readingTime: number;
  claps: number;
  comments: Comment[];
  featuredImage?: string;
}

interface ArticlesState {
  articles: Article[];
  currentArticle: Article | null;
  trendingArticles: Article[];
  userArticles: Article[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
}

const initialState: ArticlesState = {
  articles: [],
  currentArticle: null,
  trendingArticles: [],
  userArticles: [],
  loading: false,
  error: null,
  currentPage: 1,
  hasMore: true,
};

// Mock data for initial articles
const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of Web Development in 2024',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    excerpt: 'Exploring the latest trends and technologies that will shape web development in the coming year.',
    slug: 'future-of-web-development-2024',
    tags: ['Web Development', 'Technology', 'Trends'],
    author: {
      id: '1',
      name: 'John Doe',
      username: 'johndoe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Software developer and writer',
    },
    publishedAt: '2024-01-15T10:00:00Z',
    readingTime: 5,
    claps: 124,
    comments: [],
    featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
  },
  {
    id: '2',
    title: 'Building Scalable React Applications',
    content: 'React has become the go-to framework for building modern web applications...',
    excerpt: 'Learn the best practices for building scalable and maintainable React applications.',
    slug: 'building-scalable-react-applications',
    tags: ['React', 'JavaScript', 'Frontend'],
    author: {
      id: '2',
      name: 'Jane Smith',
      username: 'janesmith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Frontend architect and React expert',
    },
    publishedAt: '2024-01-14T14:30:00Z',
    readingTime: 8,
    claps: 89,
    comments: [],
    featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
  },
  {
    id: '3',
    title: 'The Art of Clean Code',
    content: 'Writing clean, readable code is an art that every developer should master...',
    excerpt: 'Discover the principles and practices that lead to clean, maintainable code.',
    slug: 'art-of-clean-code',
    tags: ['Programming', 'Best Practices', 'Code Quality'],
    author: {
      id: '3',
      name: 'Mike Johnson',
      username: 'mikejohnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Senior software engineer and coding mentor',
    },
    publishedAt: '2024-01-13T09:15:00Z',
    readingTime: 6,
    claps: 156,
    comments: [],
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
  },
];

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (page: number = 1) => {
    // Mock API call - replace with actual API
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      articles: mockArticles,
      hasMore: false,
    };
  }
);

export const fetchArticleBySlug = createAsyncThunk(
  'articles/fetchArticleBySlug',
  async (slug: string) => {
    // Mock API call - replace with actual API
    await new Promise(resolve => setTimeout(resolve, 500));
    const article = mockArticles.find(a => a.slug === slug);
    if (!article) throw new Error('Article not found');
    return article;
  }
);

export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async (articleData: Omit<Article, 'id' | 'author' | 'publishedAt' | 'claps' | 'comments'>) => {
    // Mock API call - replace with actual API
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newArticle: Article = {
      ...articleData,
      id: Date.now().toString(),
      author: {
        id: '1',
        name: 'John Doe',
        username: 'johndoe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      },
      publishedAt: new Date().toISOString(),
      claps: 0,
      comments: [],
    };
    return newArticle;
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    ...initialState,
    articles: mockArticles,
    trendingArticles: mockArticles.slice(0, 3),
  },
  reducers: {
    addClap: (state, action: PayloadAction<string>) => {
      const article = state.articles.find(a => a.id === action.payload);
      if (article) {
        article.claps += 1;
      }
      if (state.currentArticle?.id === action.payload) {
        state.currentArticle.claps += 1;
      }
    },
    addComment: (state, action: PayloadAction<{ articleId: string; comment: Comment }>) => {
      const article = state.articles.find(a => a.id === action.payload.articleId);
      if (article) {
        article.comments.push(action.payload.comment);
      }
      if (state.currentArticle?.id === action.payload.articleId) {
        state.currentArticle.comments.push(action.payload.comment);
      }
    },
    clearCurrentArticle: (state) => {
      state.currentArticle = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.articles) {
          state.articles = action.payload.articles;
        }
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch articles';
      })
      .addCase(fetchArticleBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticleBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentArticle = action.payload;
      })
      .addCase(fetchArticleBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch article';
      })
      .addCase(createArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.articles.unshift(action.payload);
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create article';
      });
  },
});

export const { addClap, addComment, clearCurrentArticle, setLoading } = articlesSlice.actions;
export default articlesSlice.reducer; 