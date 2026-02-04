export const mockSnippets = [
  {
    id: 'snippet-1',
    title: 'Debounced Search Input (React)',
    language: 'JavaScript',
    description: 'Avoid spamming your API by debouncing keystrokes in a search field.',
    code: `const useDebouncedValue = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
};`,
    tags: ['react', 'hooks', 'performance'],
  },
  {
    id: 'snippet-2',
    title: 'TypeScript Utility: Optional Keys',
    language: 'TypeScript',
    description: 'Transform some keys of a type into optional while keeping others required.',
    code: `type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface User {
  id: string;
  name: string;
  email: string;
}

type UserDraft = WithOptional<User, 'id'>;`,
    tags: ['typescript', 'utility-types'],
  },
  {
    id: 'snippet-3',
    title: 'Fetch JSON with AbortController',
    language: 'JavaScript',
    description: 'Cleanly cancel in-flight requests when components unmount.',
    code: `export const fetchJson = async (url, options = {}) => {
  const controller = new AbortController();
  const { signal } = controller;

  const promise = fetch(url, { ...options, signal }).then((res) => {
    if (!res.ok) throw new Error('Request failed');
    return res.json();
  });

  return { promise, cancel: () => controller.abort() };
};`,
    tags: ['fetch', 'abortcontroller'],
  },
  {
    id: 'snippet-4',
    title: 'Python: Memoized Fibonacci',
    language: 'Python',
    description: 'Classic Fibonacci with memoization using lru_cache.',
    code: `from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n: int) -> int:
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)`,
    tags: ['python', 'algorithms', 'memoization'],
  },
]


