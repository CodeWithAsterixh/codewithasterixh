import React from 'react';
import { UserIcon } from '@phosphor-icons/react';
import { CharacterId } from '../../../types';
import { GENDER_CHARACTERS, CHARACTER_DEFS } from '../../../data/characterData';
import { ControlPanel, SwitchButton } from './MapModalUIPrimitives';
import { useCharacterContext } from '../../../context/CharacterStateContext';

export const CharacterSelectPanel: React.FC = () => {
  const { gender, characterId, handleSelectGender, handleSelectCharacter } = useCharacterContext();
  const availableCharacters = GENDER_CHARACTERS[gender];
  const activeCharacter = CHARACTER_DEFS[characterId];

  return (
    <ControlPanel icon={<UserIcon size={16} weight="fill" />} title="Character">
      <div className="space-y-2">
        <div className="text-[8px] uppercase font-bold text-white/50 tracking-wider">
          Select Gender
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <SwitchButton active={gender === 'male'} onClick={() => handleSelectGender('male')}>
            Male
          </SwitchButton>

          <SwitchButton active={gender === 'female'} onClick={() => handleSelectGender('female')}>
            Female
          </SwitchButton>
        </div>

        <div className="text-[8px] uppercase font-bold text-white/50 tracking-wider pt-1">
          Select Fighter Class
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {availableCharacters.map((charId: CharacterId) => {
            const def = CHARACTER_DEFS[charId];
            return (
              <SwitchButton
                key={charId}
                small
                active={characterId === charId}
                onClick={() => handleSelectCharacter(charId)}
              >
                {def.name}
              </SwitchButton>
            );
          })}
        </div>

        <div className="border-t border-[#363D46] pt-1.5 text-[9px] font-bold uppercase text-[#D9A441]">
          Active Character: {activeCharacter.name} ({gender})
        </div>
      </div>
    </ControlPanel>
  );
};
