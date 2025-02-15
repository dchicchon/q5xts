import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import Grid from '@mui/material/Grid2';

import { Drawing } from './Drawing';
import { useMediaQuery } from '@mui/material';
import { initialCode } from './initialCode';
import Button from './components/Button';

import './App.css';

function App() {
  const desktop = useMediaQuery('(min-width:600px)');
  const htmlRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef(null);
  const sketchRef = useRef<Drawing>(null);

  useEffect(() => {
    if (!sketchRef.current) return;
    resetCode();
  }, []);

  const handleMount = (editor) => {
    editorRef.current = editor;
  };

  const runCode = () => {
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

  const resetCode = () => {
    let copyCode = initialCode.slice();
    copyCode += 'return {draw, setup}';
    const fn = new Function(copyCode);
    const { draw, setup } = fn();
    if (sketchRef.current) {
      sketchRef.current.dispose();
    }
    sketchRef.current = new Drawing('', htmlRef.current!, draw, setup);
  };

  return (
    <Grid container>
      <Grid
        size={{
          sm: 12,
          md: 6,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <a
            style={{
              color: 'white',
            }}
            href="https://github.com/dchicchon/q5xts"
          >
            Github
          </a>
          <h2>q5xts sandbox</h2>

          <div style={{ display: 'flex', gap: 5 }}>
            <Button onClick={runCode}>play</Button>
            <Button onClick={resetCode}>reset</Button>
          </div>
        </div>
        <Editor
          options={{
            minimap: {
              enabled: false,
            },
          }}
          onMount={handleMount}
          theme="vs-dark"
          width={desktop ? '50vw' : '100vw'}
          height={desktop ? '100vh' : '50vh'}
          value={initialCode}
          defaultLanguage="javascript"
          defaultValue="// some comment"
        />
      </Grid>
      <Grid
        sx={
          desktop
            ? {}
            : {
                height: '50vh',
                width: '100%',
              }
        }
        size={6}
        ref={htmlRef}
        id="sketch"
      ></Grid>
    </Grid>
  );
}

export default App;
