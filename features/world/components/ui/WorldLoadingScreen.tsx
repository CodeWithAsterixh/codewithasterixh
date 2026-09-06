'use client';

import React from 'react';
import { LoadingScrollProvider } from './loading/context/LoadingScrollContext';
import { LoadingScrollLayout } from './loading/LoadingScrollLayout';

interface WorldLoadingScreenProps {
  isReady?: boolean;
  isLoading?: boolean;
  onStart?: () => void;
}

export const WorldLoadingScreen: React.FC<WorldLoadingScreenProps> = ({
  isLoading = false,
  onStart,
}) => {
  return (
    <LoadingScrollProvider isLoading={isLoading} onStart={onStart}>
      <LoadingScrollLayout />
    </LoadingScrollProvider>
  );
};
