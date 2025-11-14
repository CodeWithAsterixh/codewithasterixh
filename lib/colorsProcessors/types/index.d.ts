export interface ImageColors {
  bgColor: string;
  primaryColor: string;
  secondaryColor: string;
}
// Convert the map into an array of objects and sort by frequency (descending)
export type ColorFrequency = {
  color: string;
  count: number;
};