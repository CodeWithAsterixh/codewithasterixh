import { useGameStateContext } from '@/features/world/context/GameStateContext';
import { useCharacterContext } from '@/features/world/context/CharacterStateContext';
import { useWorldContext } from '@/features/world/context/WorldStateContext';

export const MOON_TYPES = ['beige', 'normal', 'red'] as const;
export type MoonType = (typeof MOON_TYPES)[number];

export function useGameState() {
  const gameState = useGameStateContext();
  const charState = useCharacterContext();
  const worldState = useWorldContext();

  return {
    ...gameState,
    ...charState,
    ...worldState,
  };
}
