# Tool Calls Implementation for RJ Tabiano Portfolio Chat

## Overview

This implementation uses Google Gemini's function calling capabilities to create a unified chat endpoint that can intelligently provide context about RJ Tabiano based on user requests.

## How It Works

### 1. Single Chat Endpoint
Instead of having separate endpoints for different types of information, we now have one intelligent chat endpoint:
```
POST /chat/send
```

### 2. Dynamic Context Injection
When a user asks about specific aspects of RJ's background, the AI automatically:
1. Recognizes the need for specific information
2. Calls the `getPersonalContext` function
3. Retrieves the relevant data
4. Provides a comprehensive response

### 3. Example Usage

**User asks:** "Tell me about your projects"
**AI automatically:**
- Calls `getPersonalContext` with `type: "projects"`
- Retrieves project information
- Provides detailed response about RJ's projects

**User asks:** "What are your skills?"
**AI automatically:**
- Calls `getPersonalContext` with `type: "skills"`
- Retrieves skills information
- Provides comprehensive skills overview

## Benefits

### For Frontend:
- **Simpler integration** - Only one endpoint to manage
- **Natural conversation flow** - No need to pre-determine what information to fetch
- **Better UX** - Users can ask naturally without knowing specific endpoints

### For Backend:
- **Reduced complexity** - Fewer endpoints to maintain
- **Intelligent routing** - AI decides what context is needed
- **Scalable** - Easy to add new context types

## API Response Format

```json
{
  "reply": "I have several exciting projects...",
  "systemPromptType": "default",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "contextUsed": ["projects"]
}
```

## Available Context Types

- `about` - General information about RJ
- `skills` - Technical and soft skills
- `experience` - Work experience and internships
- `projects` - Portfolio projects
- `education` - Academic background
- `interests` - Personal interests
- `personality` - Communication style and values

## Migration Path

The old endpoints are still available for backward compatibility:
- `GET /about` - Still works
- `GET /info/:type` - Still works

But they're now optional since the chat endpoint handles everything intelligently.

## Frontend Integration

```javascript
// Simple chat request
const response = await fetch('/chat/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [{ role: 'user', content: 'Tell me about your projects' }],
    systemPromptType: 'portfolio'
  })
});

const data = await response.json();
console.log(data.reply); // AI response with project details
console.log(data.contextUsed); // ['projects'] - shows what context was used
```

## Why This Approach is Better

1. **User Experience**: Natural conversation without technical knowledge
2. **Maintainability**: Single endpoint, easier to manage
3. **Intelligence**: AI decides what information is relevant
4. **Scalability**: Easy to add new context types
5. **Performance**: Only fetches needed information
6. **Flexibility**: Works with any system prompt type 