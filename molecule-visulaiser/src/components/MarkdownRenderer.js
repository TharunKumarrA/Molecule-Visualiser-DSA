import React from 'react';
import { marked } from 'marked';

const MarkdownRenderer = ({ content }) => {
  const htmlContent = marked(content);

  return (
    <div className="max-w-4xl mx-auto">
      <div
        className="markdown-container"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default MarkdownRenderer;