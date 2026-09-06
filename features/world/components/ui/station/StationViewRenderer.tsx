import React from 'react';
import { MapLocationEntry } from '../../../data/mapLayout';
import { StationAboutView } from './StationAboutView';
import { StationProjectsView } from './StationProjectsView';
import { StationSkillsView } from './StationSkillsView';
import { StationServicesView } from './StationServicesView';
import { StationExperienceView } from './StationExperienceView';
import { StationContactView } from './StationContactView';
import { useModalContext } from '../../../context/ModalStateContext';

interface StationViewRendererProps {
  location: MapLocationEntry;
}

export const StationViewRenderer: React.FC<StationViewRendererProps> = ({ location }) => {
  const { setActiveStationModal, handleOpenContactTileset } = useModalContext();

  switch (location.featureType) {
    case 'about':
      return <StationAboutView />;
    case 'projects':
      return <StationProjectsView />;
    case 'skills':
      return <StationSkillsView />;
    case 'services':
      return <StationServicesView />;
    case 'experience':
      return <StationExperienceView />;
    case 'contact':
      return (
        <StationContactView
          onClose={() => setActiveStationModal(null)}
          onOpenContact={handleOpenContactTileset}
        />
      );
    default:
      return null;
  }
};
