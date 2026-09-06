import worldMapJson from '@/data/worldMap.json';
import {
  PortfolioFeatureType,
  CloudLayerConfig,
  FloorConfig,
  StationMilestone,
  TreeDecoration,
  BushDecoration,
  WorldDecorationsConfig,
  RawLocationConfig,
  MapLocationEntry,
  DefaultAtmosphereConfig,
  MapSizeConfig,
  WorldMapConfig,
} from './mapTypes';

export type {
  PortfolioFeatureType,
  CloudLayerConfig,
  FloorConfig,
  StationMilestone,
  TreeDecoration,
  BushDecoration,
  WorldDecorationsConfig,
  RawLocationConfig,
  MapLocationEntry,
  DefaultAtmosphereConfig,
  MapSizeConfig,
  WorldMapConfig,
};

export const WORLD_MAP_CONFIG: WorldMapConfig = worldMapJson as unknown as WorldMapConfig;
export const WORLD_BOUNDS = WORLD_MAP_CONFIG.mapSize;
export const DEFAULT_ATMOSPHERE = WORLD_MAP_CONFIG.defaultAtmosphere;
export const MAP_SPACING = WORLD_MAP_CONFIG.spacing;
export const WORLD_DECORATIONS = WORLD_MAP_CONFIG.decorations || { trees: [], bushes: [] };

function expandLocations(rawConfigs: RawLocationConfig[]): MapLocationEntry[] {
  const result: MapLocationEntry[] = [];
  for (const raw of rawConfigs) {
    if (raw.stations && raw.stations.length > 0) {
      for (const s of raw.stations) {
        result.push({
          id: `${raw.id}_station_${s.featureType}_${s.index}`,
          name: s.name,
          category: raw.category,
          x: s.x,
          width: raw.width,
          tag: s.tag,
          featureType: s.featureType,
          featureTitle: s.featureTitle,
          description: s.description,
          actionLabel: s.actionLabel,
          background: raw.background,
          clouds: raw.clouds,
          floor: raw.floor,
          layers: raw.layers,
        });
      }
    } else {
      const repeatCount = raw.repeatCount || 1;
      const startX = raw.startX !== undefined ? raw.startX : (raw.x || 0);
      const spacing = raw.spacing !== undefined ? raw.spacing : raw.width;
      for (let i = 0; i < repeatCount; i++) {
        result.push({
          id: `${raw.id}_rep_${i + 1}`,
          name: `${raw.name} • Part ${i + 1}`,
          category: raw.category,
          x: startX + i * spacing,
          width: raw.width,
          tag: raw.tag || `Region ${i + 1}`,
          featureType: raw.featureType || 'about',
          featureTitle: raw.featureTitle || raw.name,
          description: raw.description || '',
          actionLabel: raw.actionLabel,
          background: raw.background,
          clouds: raw.clouds,
          floor: raw.floor,
          layers: raw.layers,
        });
      }
    }
  }
  return result;
}

export const WORLD_LOCATIONS: MapLocationEntry[] = expandLocations(WORLD_MAP_CONFIG.locations);

export function getActiveMapLocation(playerX: number): MapLocationEntry {
  let closest = WORLD_LOCATIONS[0];
  let minDistance = Infinity;
  for (const loc of WORLD_LOCATIONS) {
    const dist = Math.abs(playerX - loc.x);
    if (dist < minDistance) {
      minDistance = dist;
      closest = loc;
    }
  }
  return closest;
}

export function getNearbyStationKiosk(playerX: number, customRadius?: number): MapLocationEntry | null {
  let closest: MapLocationEntry | null = null;
  let minDistance = Infinity;
  for (const loc of WORLD_LOCATIONS) {
    let radius = 180;
    if (loc.featureType === 'about') radius = 120;
    if (loc.featureType === 'services') radius = 140;
    if (loc.featureType === 'contact') radius = 120;
    if (customRadius !== undefined) radius = customRadius;

    const dist = Math.abs(playerX - loc.x);
    if (dist <= radius && dist < minDistance) {
      minDistance = dist;
      closest = loc;
    }
  }
  return closest;
}
