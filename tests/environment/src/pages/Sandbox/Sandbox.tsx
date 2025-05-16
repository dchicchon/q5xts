import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import Editor from '@monaco-editor/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Button from '../../components/Button';

import { Drawing } from '../../Drawing';
import { initialCode } from '../../initialCode';
import { emptyCode } from '../../emptyCode';
import Link from '../../components/Link/Link';
import { useStore } from '../../utils/store';

// TODO: Update type definitions for editor to use
// https://stackoverflow.com/questions/43058191/how-to-use-addextralib-in-monaco-with-an-external-type-definition/66948535?answertab=trending#tab-top
// https://stackoverflow.com/questions/63310682/how-to-load-npm-module-type-definition-in-monaco-using-webpack-and-react-create

function Sandbox() {
  const [show, setShow] = useState(true);
  const code = useStore((state) => state.code);
  const setCode = useStore((state) => state.setCode);
  const desktop = useMediaQuery('(min-width:600px)');
  const htmlRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef(null);
  const sketchRef = useRef<Drawing>(null);

  useEffect(() => {
    if (!sketchRef.current) return;
    resetCode();
    runCode();
  });

  useEffect(() => {
    runCode();
  }, [show]);
  const handleMount = (editor) => {
    editorRef.current = editor;
  };

  const runCode = () => {
    if (editorRef.current) {
      const testCode = code + 'return {draw, setup}';
      const fn = new Function(testCode);
      const { draw, setup } = fn();
      if (sketchRef.current) {
        sketchRef.current.dispose();
      }
      sketchRef.current = new Drawing('', htmlRef.current!, draw, setup);
    }
  };

  const toggleShow = () => {
    // when you click this re-run the method?
    setShow((prev) => !prev);
  };

  const clear = () => {
    if (editorRef.current) {
      // @ts-expect-error setValue error here. same as above
      editorRef.current.setValue(emptyCode);
      runCode();
    }
  };

  const resetCode = () => {
    if (!editorRef.current) return;
    // @ts-expect-error setValue error here. same as above
    editorRef.current.setValue(initialCode);
    runCode();
  };

  const handleChange = (val?: string) => {
    setCode(val!);
  };
  return (
    <>
      <Box
        sx={{
          p: 1,
          width: '100%',
          background: '#1f2122',
          zIndex: 100,
          position: 'fixed',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Link title="Home" to="/" />
        <div style={{ display: 'flex', gap: 10 }}>
          <Button onClick={runCode}>play</Button>
          <Button onClick={toggleShow}>{show ? 'hide' : 'show'}</Button>
          <Button onClick={clear}>clear</Button>
          <Button onClick={resetCode}>reset</Button>
        </div>
      </Box>
      <Grid
        sx={{
          height: '100vh',
        }}
        container
      >
        {show && (
          <Grid size={{
            sm: 12
          }}>
            <Editor
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              onMount={handleMount}
              onChange={handleChange}
              theme="vs-dark"
              width={desktop ? '50vw' : '100vw'}
              height={desktop ? '100vh' : '50vh'}
              value={code}
              defaultLanguage="javascript"
              defaultValue="// some comment"
            />
          </Grid>
        )}

        <Grid
          // sx={
          //   desktop
          //     ? {}
          //     : {
          //         height: '50vh',
          //         width: '100%',
          //       }
          // }
          size={6}
          flexGrow={12}
          ref={htmlRef}
          id="sketch"
        ></Grid>
      </Grid>
    </>
  );
}
export default Sandbox;
