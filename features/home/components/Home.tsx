'use client';

import React from 'react';
import { WorldProviders } from '@/features/world/context/WorldProviders';
import { WorldGameView } from './WorldGameView';

export const Home: React.FC = () => {
  return (
    <WorldProviders>
      <WorldGameView />
    </WorldProviders>
  );
};
