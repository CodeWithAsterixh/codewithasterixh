import React from 'react';
import {
  CaretRightIcon,
  BookOpenIcon,
  BriefcaseIcon,
  PaperPlaneTiltIcon,
  SignOutIcon,
} from '@phosphor-icons/react';
import { ControlPanel, QuickAction } from './MapModalUIPrimitives';
import { useModalContext } from '../../../context/ModalStateContext';

export const QuickActionsPanel: React.FC = () => {
  const {
    setIsPauseModalOpen,
    handleOpenAboutBook,
    handleOpenWorksBook,
    handleOpenContactTileset,
    handleExitWorld,
  } = useModalContext();

  return (
    <ControlPanel icon={<CaretRightIcon size={16} weight="fill" />} title="Quick Pages">
      <div className="space-y-1.5">
        <QuickAction
          icon={<BookOpenIcon size={14} weight="fill" />}
          label="About Developer"
          onClick={() => {
            setIsPauseModalOpen(false);
            handleOpenAboutBook();
          }}
        />

        <QuickAction
          icon={<BriefcaseIcon size={14} weight="fill" />}
          label="Projects"
          onClick={() => {
            setIsPauseModalOpen(false);
            handleOpenWorksBook();
          }}
        />

        <QuickAction
          icon={<PaperPlaneTiltIcon size={14} weight="fill" />}
          label="Contact"
          onClick={() => {
            setIsPauseModalOpen(false);
            handleOpenContactTileset();
          }}
        />

        <QuickAction
          icon={<SignOutIcon size={14} weight="duotone" className="text-[#E55B3C]" />}
          label="Exit World"
          onClick={handleExitWorld}
        />
      </div>
    </ControlPanel>
  );
};
