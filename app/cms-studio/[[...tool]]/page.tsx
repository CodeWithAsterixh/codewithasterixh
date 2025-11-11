import config from "d/sanity.config";
import { Metadata, Viewport } from "next";
import {
  NextStudio,
  metadata as studioMetaData,
  viewport as StudioViewport,
} from "next-sanity/studio";

export const dynamic = "force-static";
export const metadata: Metadata = {
  ...studioMetaData,
  title: "Your content management studio - CodeWithAsterixH",
};
export const viewport: Viewport = {
  ...StudioViewport,
  viewportFit: "contain",
  interactiveWidget: "resizes-content",
};

export default function StudioPage() {
  return <NextStudio basePath="/cms-studio" config={config} />;
}
