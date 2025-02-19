import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { NumberField } from '@base-ui-components/react/number-field';

import { Color, Q5 } from '../../../../../src';
import Link from '../../components/Link/Link';

// @ts-expect-error error checking css module fix later
import styles from './ColorTester.module.css';

function CursorGrowIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="26"
      height="14"
      viewBox="0 0 24 14"
      fill="black"
      stroke="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  );
}

function ColorTester() {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(100);
  const [blue, setBlue] = useState(100);
  const [fontColor, setFontColor] = useState('white');

  const elmRef = useRef(null);

  useEffect(() => {
    let sketch: Q5;
    if (elmRef.current) {
      sketch = new Q5();
      const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
      const newColor = luminance < 150 ? 'white' : 'black';
      setFontColor(newColor);
      const color = new Color(red, green, blue, 1);
      sketch.background(color);
    }
    return () => {
      if (sketch) {
        sketch.dispose();
      }
    };
  }, [red, green, blue]);

  const copyColor = () => {
    try {
      navigator.clipboard.writeText(`new Color(${red},${green},${blue}, 1)`);
      // show message to user?
    } catch {}
  };

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'absolute',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          left: 20,
        }}
      >
        <Link to="/" color={fontColor} title="Home" />
      </Box>
      <Box>
        <Typography
          onClick={copyColor}
          sx={{
            cursor: 'pointer',
            fontFamily: 'monospace',
            color: fontColor,
          }}
          variant="h4"
        >
          new Color(
        </Typography>
        <NumberField.Root
          style={{
            color: fontColor,
          }}
          id={'red'}
          value={red}
          min={0}
          max={255}
          onValueChange={(val: number | null) => {
            setRed(val!);
          }}
          className={styles.Field}
        >
          <NumberField.ScrubArea className={styles.ScrubArea}>
            <label htmlFor={'red'} className={styles.Label}>
              {'<->'}
            </label>
            <NumberField.ScrubAreaCursor className={styles.ScrubAreaCursor}>
              <CursorGrowIcon />
            </NumberField.ScrubAreaCursor>
          </NumberField.ScrubArea>

          <NumberField.Group className={styles.Group}>
            <NumberField.Input className={styles.Input} />
          </NumberField.Group>
        </NumberField.Root>
        <NumberField.Root
          id={'green'}
          value={green}
          style={{
            color: fontColor,
          }}
          min={0}
          max={255}
          onValueChange={(val: number | null) => {
            setGreen(val!);
          }}
          className={styles.Field}
        >
          <NumberField.ScrubArea className={styles.ScrubArea}>
            <label htmlFor={'green'} className={styles.Label}>
              {'<->'}
            </label>
            <NumberField.ScrubAreaCursor className={styles.ScrubAreaCursor}>
              <CursorGrowIcon />
            </NumberField.ScrubAreaCursor>
          </NumberField.ScrubArea>

          <NumberField.Group className={styles.Group}>
            <NumberField.Input className={styles.Input} />
          </NumberField.Group>
        </NumberField.Root>
        <NumberField.Root
          id={'blue'}
          min={0}
          style={{
            color: fontColor,
          }}
          value={blue}
          max={255}
          onValueChange={(val?: number | null) => {
            setBlue(val!);
          }}
          className={styles.Field}
        >
          <NumberField.ScrubArea className={styles.ScrubArea}>
            <label htmlFor={'blue'} className={styles.Label}>
              {'<->'}
            </label>
            <NumberField.ScrubAreaCursor className={styles.ScrubAreaCursor}>
              <CursorGrowIcon />
            </NumberField.ScrubAreaCursor>
          </NumberField.ScrubArea>
          <NumberField.Group className={styles.Group}>
            <NumberField.Input className={styles.Input} />
          </NumberField.Group>
        </NumberField.Root>

        <Typography
          sx={{
            fontFamily: 'monospace',
            color: fontColor,
          }}
          variant="h4"
        >
          {'  '})
        </Typography>
        <div ref={elmRef}></div>
      </Box>
    </Box>
  );
}

export default ColorTester;
