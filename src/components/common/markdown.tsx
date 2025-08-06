import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MarkdownViewerProps {
    content: string;
    className?: string;
    maxHeight?: string;
}

export function Markdown({ content, className = "", maxHeight }: MarkdownViewerProps) {
    const markdownContent = (
        <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-2xl font-semibold mb-4 mt-8 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-xl font-medium mb-3 mt-6 text-gray-800 dark:text-gray-200">
                            {children}
                        </h3>
                    ),
                    p: ({ children }) => (
                        <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                            {children}
                        </p>
                    ),
                    strong: ({ children }) => (
                        <strong className="font-bold text-gray-900 dark:text-gray-100">
                            {children}
                        </strong>
                    ),
                    em: ({ children }) => (
                        <em className="italic text-gray-700 dark:text-gray-300">
                            {children}
                        </em>
                    ),
                    ul: ({ children }) => (
                        <ul className="list-disc pl-6 mb-4 space-y-1">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal pl-6 mb-4 space-y-1">
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => (
                        <li className="mb-1 text-gray-700 dark:text-gray-300">
                            {children}
                        </li>
                    ),
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-2 underline-offset-2 hover:decoration-blue-600 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {children}
                        </a>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 bg-blue-50 dark:bg-blue-900/20 py-2 rounded-r-lg">
                            <div className="text-gray-700 dark:text-gray-300">
                                {children}
                            </div>
                        </blockquote>
                    ),
                    hr: () => (
                        <hr className="border-gray-300 dark:border-gray-600 my-8 border-t-2" />
                    ),
                    table: ({ children }) => (
                        <div className="overflow-x-auto my-6">
                            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-sm">
                                {children}
                            </table>
                        </div>
                    ),
                    thead: ({ children }) => (
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            {children}
                        </thead>
                    ),
                    tbody: ({ children }) => (
                        <tbody className="bg-white dark:bg-gray-900">
                            {children}
                        </tbody>
                    ),
                    tr: ({ children }) => (
                        <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            {children}
                        </tr>
                    ),
                    th: ({ children }) => (
                        <th className="border-r border-gray-200 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100 last:border-r-0">
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="border-r border-gray-200 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300 last:border-r-0">
                            {children}
                        </td>
                    ),
                    del: ({ children }) => (
                        <del className="line-through text-gray-500 dark:text-gray-400">
                            {children}
                        </del>
                    ),
                    code(props) {
                        /* eslint-disable @typescript-eslint/no-unused-vars */
                        const { ref, node, className, children, style, ...safeProps } = props;
                        /* eslint-enable @typescript-eslint/no-unused-vars */

                        const match = /language-(\w+)/.exec(className || '');
                        const inline = 'inline' in props && props.inline;
                        const language = match?.[1] || '';

                        return !inline && match ? (
                            <div className="my-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
                                <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 uppercase tracking-wider">
                                    {language}
                                </div>
                                <SyntaxHighlighter
                                    language={language}
                                    style={oneLight}
                                    PreTag="div"
                                    customStyle={{
                                        margin: 0,
                                        borderRadius: 0,
                                        background: 'transparent',
                                        fontSize: '14px',
                                        lineHeight: '1.6',
                                        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                                        fontWeight: '600',
                                        padding: '16px',
                                        overflow: 'auto',
                                        textShadow: 'none',
                                        WebkitFontSmoothing: 'antialiased',
                                        MozOsxFontSmoothing: 'grayscale'
                                    }}
                                    codeTagProps={{
                                        style: {
                                            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                                            fontSize: '14px',
                                            lineHeight: '1.6'
                                        }
                                    }}
                                    {...safeProps}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            </div>
                        ) : (
                            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 font-medium" {...props}>
                                {children}
                            </code>
                        );
                    }

                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );

    // Return with or without scroll area based on maxHeight
    if (maxHeight) {
        return (
            <Card className="w-full shadow-sm border border-gray-200 dark:border-gray-700">
                <CardContent className="p-0">
                    <ScrollArea className={maxHeight}>
                        <div className="p-6">
                            {markdownContent}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full shadow-sm border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
                {markdownContent}
            </CardContent>
        </Card>
    );
}
