
# time-format-like-instagram

Time-Formate-Like-Instagram is very useful liberary for displaying date in form of duration.

## Exapmple:

### Out put will look like this.
```
last post 4 hour ago.
last post 1 day ago.
posted now.
```

# 🕰️ TimeUtils: Powerful Date Formatting & Manipulation

## 🌟 Why TimeUtils?

Tired of dealing with complex date formatting? TimeUtils provides a simple, intuitive way to work with dates in JavaScript/TypeScript!

### 📦 Installation
```bash
npm install @yourscope/time-utils
# or
yarn add @yourscope/time-utils
```

## 🔧 Key Features

### 1. Human-Readable Time Ago
```typescript
import { timeAgo } from 'time-utils';

timeAgo(new Date('2023-01-01'))  
// Returns: "1 year ago"

// Customize output
timeAgo(new Date('2023-01-01'), { 
  maxUnits: 2,  // Show up to 2 units
  language: 'es'  // Spanish language
})
// Returns: "1 año 5 meses atrás"
```

### 2. Flexible Date Formatting
```typescript
import { formatDate } from 'time-utils';

formatDate(new Date(), 'DD/MM/YYYY')  
// Returns: "15/03/2024"

formatDate(new Date(), 'YYYY-MM-DD HH:mm')
// Returns: "2024-03-15 14:30"
```

### 3. Utility Functions
```typescript
import { utilities } from 'time-utils';

utilities.isPast(new Date('2023-01-01'))  // true
utilities.isFuture(new Date('2025-01-01'))  // true
utilities.daysBetween(new Date('2024-01-01'), new Date('2024-02-01'))  // 31
```

## 🌈 Features
- 🌍 Multi-language support
- 🔍 Flexible formatting options
- 🚀 TypeScript ready
- 📦 Lightweight and dependency-free
- 🛡️ Robust error handling

## 🤝 Contributing
- Open issues on GitHub
- Submit pull requests
- Spread the word!

## 📜 License
MIT License

## 💖 Made with ❤️ for Developers
Simplifying date handling, one moment at a time!
