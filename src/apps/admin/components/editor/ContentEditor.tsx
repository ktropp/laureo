import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import IframeContent from './IframeContent';
import {BlockJson} from "../../blocks/blockDefinitions";

export default function ContentEditor({blocks}: {blocks: BlockJson[]}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    try {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument;

      if (iframeDoc) {
        // Reset the document
        iframeDoc.open();
        iframeDoc.write('<!DOCTYPE html><html><head></head><body></body></html>');
        iframeDoc.close();

        // Add styles to iframe
        iframeDoc.head.innerHTML = `
          <link href="/fe-theme.css" rel="stylesheet">
          <style>
            body { margin: 0; }
          </style>
        `;

        setIframeLoaded(true);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load iframe');
    }
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <iframe
      ref={iframeRef}
      title="Themed Content"
      className="w-full h-full border-none"
    >
      {iframeLoaded && iframeRef.current?.contentDocument &&
        createPortal(
          <IframeContent content={blocks} />,
          iframeRef.current.contentDocument.body
        )}
    </iframe>
  );
}
