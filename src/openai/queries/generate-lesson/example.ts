import { GeneratedLessonContent } from "./schema";

export const generatedLessonExample = {
    content: `
# 📘 Lesson: React Hooks - Common Hooks

## 🧠 Introduction

React Hooks allow functional components to manage state, perform side effects, and use other React features without writing class components. Since React 16.8, hooks have become the standard for handling stateful logic in a more concise and readable way.

This lesson focuses on the most commonly used React hooks:
- \`useState\`
- \`useEffect\`
- \`useRef\`
- \`useMemo\`

---

## 📌 Key Concepts

### 1. \`useState\`
Enables state management in functional components.

\`\`\`tsx
const [count, setCount] = useState(0);
\`\`\`

- \`count\`: current state value  
- \`setCount\`: function to update the value

### 2. \`useEffect\`
Performs side effects like fetching data, updating the DOM, or subscribing to services.

\`\`\`tsx
useEffect(() => {
  console.log("Component mounted");
}, []);
\`\`\`

- Second argument: dependency array  
- Runs after render unless empty (runs once)

### 3. \`useRef\`
Holds mutable values that persist across renders and don’t trigger re-renders.

\`\`\`tsx
const inputRef = useRef(null);

<input ref={inputRef} />
\`\`\`

### 4. \`useMemo\`
Caches the result of expensive calculations between renders.

\`\`\`tsx
const expensiveValue = useMemo(() => computeHeavyThing(input), [input]);
\`\`\`

---

## 💻 Practical Example

\`\`\`tsx
import React, { useState, useEffect, useRef, useMemo } from "react";

function ExampleComponent({ items }) {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    document.title = \`Clicked \${count} times\`;
  }, [count]);

  const filteredItems = useMemo(() => {
    return items.filter(item => item.includes("a"));
  }, [items]);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
      <ul>
        {filteredItems.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
\`\`\`

---

## 🧪 Tasks

### Task 1:
Build a counter component with two buttons: increment and reset. Use \`useState\` for state and \`useEffect\` to log updates to the console.

### Task 2:
Create an input field that auto-focuses on mount using \`useRef\`.

---

## 📚 Summary

- **\`useState\`** is for managing local state.  
- **\`useEffect\`** handles side effects.  
- **\`useRef\`** manages references and mutable values.  
- **\`useMemo\`** optimizes performance by memoizing values.

| Hook        | Purpose                        | Triggers Re-render         | Typical Use Case                            |
| ----------- | ------------------------------ | -------------------------- | ------------------------------------------- |
| \`useState\`  | Manage local state             | ✅ Yes                      | Counter, toggles, form inputs               |
| \`useEffect\` | Run side effects after render  | ❌ No (but can trigger one) | Data fetching, DOM updates, subscriptions   |
| \`useRef\`    | Persist values between renders | ❌ No                       | DOM refs, storing timers or previous values |
| \`useMemo\`   | Memoize expensive computations | ❌ No                       | Performance optimization on derived values  |


---

## 📚 References

**Additional Reading:**
- [React Hooks Documentation](https://react.dev/reference/react) - Official React hooks reference
- [Overreacted Blog by Dan Abramov](https://overreacted.io/) - Deep dives into React concepts
- "Learning React" by Alex Banks & Eve Porcello - Chapter 6: React Hooks

**Related Topics to Explore:**
- **Custom Hooks** - Creating reusable stateful logic
- **useReducer Hook** - Managing complex state with reducer patterns  
- **React Performance Optimization** - Using React.memo, useCallback, and useMemo
- **Testing React Hooks** - Unit testing with React Testing Library

**Practice Resources:**
- [React Hooks CodeSandbox Examples](https://codesandbox.io/s/react-hooks-examples)
- [Kent C. Dodds' Epic React Workshop](https://epicreact.dev/)
    `,
    quiz: [
        {
            question: "Which hook is used to manage local state in a function component?",
            options: [
                "useEffect",
                "useState",
                "useMemo",
                "useRef"
            ],
            correctAnswerIdx: 1
        },
        {
            question: "When does useEffect run if given an empty dependency array?",
            options: [
                "On every re-render",
                "Only when the component updates",
                "Only once, after the initial render",
                "Never"
            ],
            correctAnswerIdx: 2
        },
        {
            question: "Which hook would you use to persist a DOM element reference?",
            options: [
                "useState",
                "useMemo",
                "useCallback",
                "useRef"
            ],
            correctAnswerIdx: 3
        },
        {
            question: "What is the main purpose of useMemo?",
            options: [
                "To manage DOM references",
                "To avoid unnecessary recalculations between renders",
                "To track previous state values",
                "To fetch data on mount"
            ],
            correctAnswerIdx: 1
        }
    ],
} satisfies GeneratedLessonContent;

export const generatedLessonExampleJSON = JSON.stringify(generatedLessonExample);
