import React from 'react';

interface HTextProps {
  children: React.ReactNode;
}

const HText = ({ children }: HTextProps) => (
  <h1
    style={{
      fontFamily: 'var( --primary-font)',
      fontWeight: 'bold',
      fontSize: '3.2rem',
      width: '60vw',
      textTransform: 'uppercase',
    }}
  >
    {children}
  </h1>
);

export { HText };
