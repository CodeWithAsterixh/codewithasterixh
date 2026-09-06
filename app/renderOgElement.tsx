import React from 'react';

export function renderOgElement(imageBuffer: ArrayBuffer) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#0F0F0F',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        width="100%"
        height="100%"
        src={`data:image/png;base64,${Buffer.from(imageBuffer).toString('base64')}`}
        style={{
          objectFit: 'contain',
          opacity: 0.3,
          position: 'absolute',
          right: '-20%',
        }}
        alt="Profile"
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          width: '100%',
          height: '100%',
        }}
      >
        <span
          style={{
            backgroundClip: 'text',
            background: 'radial-gradient(circle at 5% 40%, #c2fd00 20%, #cebef4 60%, #001b20 100%)',
            color: 'transparent',
            fontSize: '80px',
            fontFamily: '"Bitcount", sans-serif',
            fontWeight: 700,
            lineHeight: 1,
            marginBottom: '20px',
          }}
        >
          ASTERIXH
        </span>
        <span
          style={{
            color: '#ffffff',
            fontSize: '40px',
            fontFamily: 'sans-serif',
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Full Stack Developer
        </span>
      </div>
    </div>
  );
}
