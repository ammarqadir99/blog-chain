# MediumClone - A Modern Blogging Platform

A full-featured Medium-like blogging platform built with React, TypeScript, and modern web technologies.

## 🚀 Features

### Core Features
- **Responsive Design**: Mobile-first design that works on all devices
- **User Authentication**: Sign up, login, logout with JWT tokens
- **Rich Text Editor**: TipTap-based editor with formatting options
- **Article Management**: Create, edit, and publish articles
- **Social Features**: Like/clap articles and add comments
- **Tag System**: Categorize articles with tags
- **User Profiles**: Customizable profiles with bio and social links
- **Dark Mode**: Toggle between light and dark themes

### Technical Features
- **React 18+**: Latest React with functional components and hooks
- **TypeScript**: Full type safety throughout the application
- **Redux Toolkit**: State management with RTK Query
- **React Router**: Client-side routing
- **TailwindCSS**: Utility-first CSS framework
- **TipTap**: Modern rich text editor
- **React Hook Form**: Form handling with validation
- **Yup**: Schema validation

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: TailwindCSS
- **Rich Text Editor**: TipTap
- **Forms**: React Hook Form + Yup
- **Icons**: Heroicons
- **UI Components**: Headless UI

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── articles/       # Article-related components
│   ├── auth/          # Authentication components
│   └── layout/        # Layout components
├── pages/             # Page components
├── store/             # Redux store configuration
│   ├── slices/        # Redux slices
│   └── hooks.ts       # TypeScript hooks
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## 🎨 Design System

The application uses a clean, Medium-inspired design with:

- **Typography**: Inter font family for modern readability
- **Colors**: Neutral grays with black accents
- **Spacing**: Consistent spacing using TailwindCSS utilities
- **Components**: Reusable components with consistent styling

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🔐 Authentication

The app includes a complete authentication system:
- User registration with validation
- Login with email/password
- JWT token management
- Protected routes
- User profile management

## ✍️ Rich Text Editor

The TipTap-based editor supports:
- **Text Formatting**: Bold, italic, headings
- **Lists**: Bullet and numbered lists
- **Links**: Add and edit links
- **Images**: Insert images via URL
- **Quotes**: Blockquote formatting
- **Real-time Preview**: See changes as you type

## 🏷️ Tag System

Articles can be tagged with multiple categories:
- Add/remove tags during article creation
- Filter articles by tags
- Popular tags sidebar
- Tag-based navigation

## 💬 Social Features

- **Claps/Likes**: Like articles with a clap system
- **Comments**: Add comments to articles
- **User Profiles**: View author information
- **Social Links**: Connect social media profiles

## 🎯 Key Components

### ArticleCard
Displays article previews with:
- Author information
- Reading time
- Clap count
- Comment count
- Tags
- Featured images

### CommentSection
Handles article comments with:
- Comment form for authenticated users
- Comment list with author info
- Timestamp formatting
- Real-time updates

### EditorPage
Full-featured article editor with:
- Rich text formatting toolbar
- Title and excerpt fields
- Tag management
- Featured image upload
- Preview functionality

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy!

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=your-api-url
REACT_APP_APP_NAME=MediumClone
```

### TailwindCSS Configuration
The app uses a custom TailwindCSS configuration with:
- Custom color palette
- Typography plugin
- Forms plugin
- Responsive breakpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by Medium's clean design
- Built with modern React best practices
- Uses excellent open-source libraries

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code examples

---

**Happy Blogging! 🚀**
