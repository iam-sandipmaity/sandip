# Search Functionality

## Overview
The search feature allows users to quickly find content across your entire portfolio including:
- Static pages (Home, About, Projects, Blog, Reads, Contact)
- Blog posts (with tags)
- Projects (with tags)

## Features

### 🔍 **Smart Search**
- Searches through titles, descriptions, and tags
- Real-time results as you type
- Highlights matching content type (page/post/project)

### ⌨️ **Keyboard Shortcuts**
- **Cmd/Ctrl + K**: Open search modal from anywhere
- **↑/↓ Arrow Keys**: Navigate through results
- **Enter**: Open selected result
- **Esc**: Close search modal

### 🎨 **Visual Design**
- Beautiful modal overlay with backdrop blur
- Color-coded result types:
  - **Teal**: Blog posts
  - **Purple**: Projects
  - **Gray**: Static pages
- Smooth animations and transitions
- Keyboard navigation highlighting

## How It Works

### Components
1. **SearchModal.tsx** - The main search UI component
2. **search.ts** - Search utility functions

### Search Flow
1. User opens search (button click or Cmd/Ctrl+K)
2. Types query into input field
3. Search utility filters all content in real-time
4. Results displayed with type badges
5. User selects result (click or Enter key)
6. Navigates to selected page/post/project

## Customization

### Adding More Searchable Content
Edit `lib/search.ts` to add more static pages:

```typescript
const staticPages: SearchResult[] = [
    // Add your custom pages here
    { type: 'page', title: 'Your Page', description: 'Description', url: '/your-page' },
];
```

### Changing Search Algorithm
Modify the `searchContent` function in `lib/search.ts` to implement:
- Fuzzy matching
- Weighted results
- Advanced filtering

### Styling
All styles use Tailwind CSS classes and can be customized in `SearchModal.tsx`:
- Modal background: `bg-mid-dark border border-surface`
- Result highlighting: `bg-surface border-l-2 border-accent-teal`
- Type badges: Color-coded by content type

## Usage Tips

1. **Quick Navigation**: Press Cmd/Ctrl+K from anywhere to instantly search
2. **Tag Search**: Type tag names to find all posts/projects with that tag
3. **Keyboard Only**: Entire search can be used without a mouse
4. **Mobile Friendly**: Works on mobile devices with touch interaction

## Future Enhancements

Potential improvements:
- [ ] Recent searches history
- [ ] Search suggestions/autocomplete
- [ ] Advanced filters (by date, type, tags)
- [ ] Search analytics
- [ ] Fuzzy matching for typos
- [ ] Search result previews
