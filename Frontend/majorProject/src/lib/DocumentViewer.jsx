import React from 'react';

export default function DocumentViewer({ url }) {
  return (
    <div>
      <iframe
        src={url}
        width="100%"
        height="500px"
        title="Document Viewer"
      />
      <a href={url} target="_blank" rel="noopener noreferrer">
        Open Document
      </a>
    </div>
  );
}