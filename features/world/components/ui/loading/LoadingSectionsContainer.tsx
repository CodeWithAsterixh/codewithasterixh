'use client';

import React from 'react';
import { LoadingOverviewSections } from './LoadingOverviewSections';
import { LoadingDetailsSections } from './LoadingDetailsSections';
import { LoadingClosingSections } from './LoadingClosingSections';

export const LoadingSectionsContainer: React.FC = () => {
  return (
    <>
      <LoadingOverviewSections />
      <LoadingDetailsSections />
      <LoadingClosingSections />
    </>
  );
};


