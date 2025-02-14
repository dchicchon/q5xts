import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Drawing } from './Drawing';
import { initialCode } from './initialCode';

import './App.css';

function App() {
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
    sketchRef.current = new Drawing('', htmlRef.current, draw, setup);
  }, []);

  // const handleChange = (code: string, event: object) => {
  //   try {
  //     code += '\n return {draw, setup}';
  //     const fn = new Function(code);
  //     const { draw, setup } = fn();

  //     if (timeRef.current) {
  //       clearTimeout(timeRef.current);
  //     }
  //     const timeId = setTimeout(() => {
  //       if (sketchRef.current) {
  //         sketchRef.current.dispose();
  //       }
  //       sketchRef.current = new Drawing('', htmlRef.current, draw, setup);
  //     }, 2000);
  //     timeRef.current = timeId;
  //   } catch (err) {
  //     console.log('unable to parse fn declaration');
  //   }
  // };

  const handleMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const runCode = (e) => {
    if (editorRef.current) {
      console.log('run code');
      let code = editorRef.current.getValue();
      code += 'return {draw, setup}';
      const fn = new Function(code);
      const { draw, setup } = fn();
      if (sketchRef.current) {
        sketchRef.current.dispose();
      }
      sketchRef.current = new Drawing('', htmlRef.current, draw, setup);
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
          }}
        >
          <h2>q5xts tester</h2>
          <button style={{}} onClick={runCode}>
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
