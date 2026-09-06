'use client';

import { MotionValue } from 'framer-motion';
import { useDockMorphDeltas } from './useDockMorphDeltas';
import { useDockMorphTransforms } from './useDockMorphTransforms';
import { useDockMorphLayers } from './useDockMorphLayers';

export function useDockMorph(smoothProgress: MotionValue<number>, isReady: boolean) {
  const deltas = useDockMorphDeltas(isReady, smoothProgress);
  const transforms = useDockMorphTransforms(smoothProgress, deltas);
  const layers = useDockMorphLayers(smoothProgress);

  return {
    ...deltas,
    ...transforms,
    ...layers,
  };
}

