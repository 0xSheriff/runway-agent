import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function DocsPage() {
  const filePath = path.join(process.cwd(), 'docs.md');
  const content = fs.readFileSync(filePath, 'utf-8');

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white px-6 py-12 max-w-3xl mx-auto font-sans">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => <h1 className="text-3xl font-bold mt-8 mb-4 font-mono" {...props} />,
          h2: (props) => <h2 className="text-xl font-bold mt-8 mb-3 font-mono border-b border-gray-800 pb-2" {...props} />,
          h3: (props) => <h3 className="text-lg font-semibold mt-6 mb-2" {...props} />,
          p: (props) => <p className="text-gray-300 leading-relaxed mb-4" {...props} />,
          ul: (props) => <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1" {...props} />,
          li: (props) => <li {...props} />,
          table: (props) => <table className="w-full border-collapse mb-6 text-sm" {...props} />,
          th: (props) => <th className="border border-gray-800 px-3 py-2 text-left bg-gray-900 font-mono" {...props} />,
          td: (props) => <td className="border border-gray-800 px-3 py-2 text-gray-300" {...props} />,
          code: (props) => <code className="font-mono text-amber-400 bg-gray-900 px-1 py-0.5 rounded text-sm" {...props} />,
          pre: (props) => <pre className="bg-gray-900 p-4 rounded overflow-x-auto mb-4" {...props} />,
          a: (props) => <a className="text-amber-400 underline" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
