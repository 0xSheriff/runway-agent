import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';

export default function DocsPage() {
  const filePath = path.join(process.cwd(), 'docs.md');
  const content = fs.readFileSync(filePath, 'utf-8');

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white px-6 py-12 max-w-3xl mx-auto font-sans">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
