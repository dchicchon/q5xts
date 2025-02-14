import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Drawing } from './Drawing';
import { initialCode } from './initialCode';
import Grid from '@mui/material/Grid2';
import { useMediaQuery } from '@mui/material';

import './App.css';

function App() {
  const desktop = useMediaQuery('(min-width:600px)');
  const [hover, setHover] = useState(false);
  const htmlRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef(null);
  const sketchRef = useRef<Drawing>(null);

  useEffect(() => {
    if (!sketchRef.current) return;
    let copyCode = initialCode.slice();
    copyCode += 'return {draw, setup}';
    const fn = new Function(copyCode);
    const { draw, setup } = fn();
    sketchRef.current = new Drawing('', htmlRef.current!, draw, setup);
  }, []);

  const handleMount = (editor) => {
    console.log('mounting');
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

  if (desktop) {
    return (
      <Grid
        container
        sx={{
          height: '90vh',
        }}
        // style={{
        //   height: '100vh',
        //   display: 'flex',
        //   flexDirection: 'row',
        // }}
      >
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
            height="100vh"
            value={initialCode}
            defaultLanguage="javascript"
            defaultValue="// some comment"
          />
        </Grid>
        <Grid
          size={6}
          style={
            {
              // width: '60vw',
            }
          }
          ref={htmlRef}
          id="sketch"
        ></Grid>
      </Grid>
    );
  }
  return (
    <Grid
      container
      sx={{
        height: '90vh',
      }}
    >
      <Grid>
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
          options={{
            minimap: { enabled: false },
          }}
          width="100vw"
          onMount={handleMount}
          theme="vs-dark"
          height="50vh"
          value={initialCode}
          defaultLanguage="javascript"
          defaultValue="// some comment"
        />
      </Grid>
      <Grid sx={{ height: '50vh', width: '100%' }} ref={htmlRef} id="sketch"></Grid>
    </Grid>
  );
}

export default App;
