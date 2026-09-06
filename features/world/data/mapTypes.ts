import { LocationCategory } from '../types';

export type PortfolioFeatureType = 'about' | 'projects' | 'skills' | 'services' | 'experience' | 'contact';

export interface CloudLayerConfig {
  src: string;
  parallax: number;
  speed: number;
  yOffset?: number;
}

export interface FloorConfig {
  image?: string | null;
  standingOffsetY?: number;
  height?: number;
}

export interface StationMilestone {
  index: number;
  x: number;
  name: string;
  tag: string;
  featureType: PortfolioFeatureType;
  featureTitle: string;
  description: string;
  actionLabel?: string;
}

export interface TreeDecoration {
  src: string;
  relX: number;
  size: number;
  yOffset?: number;
  depth?: 'back' | 'front';
}

export interface BushDecoration {
  src: string;
  relX: number;
  size: number;
  yOffset?: number;
  depth?: 'back' | 'front';
}

export interface WorldDecorationsConfig {
  trees: TreeDecoration[];
  bushes: BushDecoration[];
}

export interface RawLocationConfig {
  id: string;
  name: string;
  category: LocationCategory;
  repeatCount?: number;
  startX?: number;
  spacing?: number;
  x?: number;
  width: number;
  tag?: string;
  featureType?: PortfolioFeatureType;
  featureTitle?: string;
  description?: string;
  actionLabel?: string;
  background?: string;
  clouds?: CloudLayerConfig[];
  floor?: FloorConfig;
  layers?: string[];
  stations?: StationMilestone[];
}

export interface MapLocationEntry {
  id: string;
  name: string;
  category: LocationCategory;
  x: number;
  width: number;
  tag: string;
  featureType: PortfolioFeatureType;
  featureTitle: string;
  description: string;
  actionLabel?: string;
  background?: string;
  clouds?: CloudLayerConfig[];
  floor?: FloorConfig;
  layers?: string[];
}

export interface DefaultAtmosphereConfig {
  background: string;
  cloudAltitudeOffset?: number;
  clouds: CloudLayerConfig[];
  floor?: FloorConfig;
}

export interface MapSizeConfig {
  totalWidth: number;
  minX: number;
  maxX: number;
  spawnX: number;
  spawnY: number;
}

export interface WorldMapConfig {
  version: string;
  name: string;
  description: string;
  mapSize: MapSizeConfig;
  spacing: {
    locationWidth: number;
    spaceBetweenLocations: number;
  };
  defaultAtmosphere: DefaultAtmosphereConfig;
  decorations?: WorldDecorationsConfig;
  locations: RawLocationConfig[];
}
