import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Drawing } from './Drawing';
import { initialCode } from './initialCode';

import './App.css';

function App() {
  const [hover, setHover] = useState(false);
  const htmlRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef(null);
  const sketchRef = useRef<Drawing>(null);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!sketchRef.current) return;
    let copyCode = initialCode.slice();
    copyCode += 'return {draw, setup}';
    const fn = new Function(copyCode);
    const { draw, setup } = fn();
    sketchRef.current = new Drawing('', htmlRef.current!, draw, setup);
  }, []);

  const handleMount = (editor) => {
    editorRef.current = editor;
  };

  const runCode = (e) => {
    if (editorRef.current) {
      //@ts-expect-error not sure what type to set for editorRef
      let code = editorRef.current.getValue();
      code += 'return {draw, setup}';
      const fn = new Function(code);
      const { draw, setup } = fn();
      if (sketchRef.current) {
        sketchRef.current.dispose();
      }
      sketchRef.current = new Drawing('', htmlRef.current!, draw, setup);
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <h2>q5xts sandbox</h2>
          <button
            onMouseEnter={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
            style={{
              cursor: 'pointer',
              border: '1px solid',
              color: 'white',
              borderRadius: 5,
              background: hover ? 'rgb(53, 64, 68)' : 'rgb(30, 33, 34)',
              padding: 10,
              fontFamily: 'monospace',
            }}
            onClick={runCode}
          >
            Play
          </button>
        </div>
        <Editor
          onMount={handleMount}
          theme="vs-dark"
          width="40vw"
          value={initialCode}
          defaultLanguage="javascript"
          defaultValue="// some comment"
        />
      </div>
      <div
        style={{
          width: '60vw',
        }}
        ref={htmlRef}
        id="sketch"
      ></div>
    </div>
  );
}

export default App;
