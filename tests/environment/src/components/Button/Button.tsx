import React, { MouseEventHandler, useState } from 'react';

interface ButtonProps {
  onClick: MouseEventHandler;
  children: React.ReactNode;
}

function Button(props: ButtonProps) {
  const [hover, setHover] = useState(false);
  return (
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
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
