import React, { useState } from 'react';
import { Link as WouterLink } from 'wouter';

import Typography from '@mui/material/Typography';

interface LinkProps {
  to?: string;
  title: string;
  color?: string;
  href?: string;
}

function Link(props: LinkProps) {
  const [hover, setHover] = useState(false);

  if (props.href) {
    return (
      <a
        style={{
          textDecoration: 'none',
        }}
        href={props.href}
      >
        <Typography
          variant="h5"
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
          sx={{
            color: props.color ? props.color : 'white',
            textDecoration: hover ? 'underline' : 'none',
          }}
        >
          {props.title}
        </Typography>
      </a>
    );
  }

  return (
    <WouterLink
      style={{
        textDecoration: 'none',
      }}
      to={props.to!}
    >
      <Typography
        variant="h5"
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        sx={{
          color: props.color ? props.color : 'white',
          textDecoration: hover ? 'underline' : 'none',
        }}
      >
        {props.title}
      </Typography>
    </WouterLink>
  );
}
export default Link;
