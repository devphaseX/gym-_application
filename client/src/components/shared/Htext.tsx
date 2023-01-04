import React from 'react';

interface HTextProps {
  children: React.ReactNode;
}

const HText = ({ children }: HTextProps) => (
  <h1
    style={{
      fontFamily: 'var( --primary-font)',
      fontWeight: 'bold',
      fontSize: '2.8rem',
      textTransform: 'uppercase',
    }}
  >
    {children}
  </h1>
);

export { HText };
