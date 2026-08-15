// Gallery photos are hosted locally under src/assets/gallery/ (previously
// hotlinked from ibb.co). This module runs at build/dev-server time (not
// per-request) and uses astro:assets's programmatic getImage() API, because
// the consumer (gallery.tsx) is mounted client:only="react" and only ever
// receives plain data — never an Astro ImageMetadata object.
import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

import dsc0320 from "~/assets/gallery/DSC0320-hires.jpg";
import dsc0319 from "~/assets/gallery/DSC0319-hires.jpg";
import dsc0252 from "~/assets/gallery/DSC0252-hires.jpg";
import dsc0328 from "~/assets/gallery/DSC0328-hires.jpg";
import dsc0243 from "~/assets/gallery/DSC0243-hires.jpg";
import dsc0260 from "~/assets/gallery/DSC0260-hires.jpg";
import dsc0300 from "~/assets/gallery/DSC0300-hires.jpg";
import dsc0265 from "~/assets/gallery/DSC0265-hires.jpg";
import dsc0347 from "~/assets/gallery/DSC0347-hires.jpg";
import dsc0349 from "~/assets/gallery/DSC0349-hires.jpg";
import dsc0354 from "~/assets/gallery/DSC0354-hires.jpg";
import dsc0359 from "~/assets/gallery/DSC0359-hires.jpg";
import dsc0364 from "~/assets/gallery/DSC0364-hires.jpg";
import whatsappImage from "~/assets/gallery/WhatsApp-Image-2023-07-25-at-10-39-08-2.jpg";
import ios163139 from "~/assets/gallery/20230716-163139222-iOS.jpg";
import ios163145 from "~/assets/gallery/20230716-163145791-iOS.jpg";
import ios164149 from "~/assets/gallery/20230716-164149852-iOS.jpg";
import ios164239 from "~/assets/gallery/20230716-164239009-iOS.jpg";
import aiDome4 from "~/assets/gallery/AI-Dome-4.jpg";
import aiDome1 from "~/assets/gallery/AI-Dome1.jpg";
import aiDome2 from "~/assets/gallery/AI-Dome2.jpg";
import aiDome3 from "~/assets/gallery/AI-Dome3.jpg";
import aiDome5 from "~/assets/gallery/AI-Dome5.jpg";
import aiDome6 from "~/assets/gallery/AI-Dome6.jpg";
import aiDome7 from "~/assets/gallery/AI-Dome7.jpg";
import aiDome8 from "~/assets/gallery/AI-Dome8.jpg";

const RAW: { image: ImageMetadata; alt: string }[] = [
  { image: dsc0320, alt: "Photo by Bartosz Górka" },
  { image: dsc0319, alt: "Photo by Bartosz Górka" },
  { image: dsc0252, alt: "Photo by Bartosz Górka" },
  { image: dsc0328, alt: "Photo by Bartosz Górka" },
  { image: dsc0243, alt: "Photo by Bartosz Górka" },
  { image: dsc0260, alt: "Photo by Bartosz Górka" },
  { image: dsc0300, alt: "Photo by Bartosz Górka" },
  { image: dsc0265, alt: "Photo by Bartosz Górka" },
  { image: dsc0347, alt: "Photo by Bartosz Górka" },
  { image: dsc0349, alt: "Photo by Bartosz Górka" },
  { image: dsc0354, alt: "Photo by Bartosz Górka" },
  { image: dsc0359, alt: "Photo by Bartosz Górka" },
  { image: dsc0364, alt: "Photo by Bartosz Górka" },
  { image: whatsappImage, alt: "Photo by Manuel Lübers" },
  { image: ios163139, alt: "Photo by Manuel Lübers" },
  { image: ios163145, alt: "Photo by Manuel Lübers" },
  { image: ios164149, alt: "Photo by Manuel Lübers" },
  { image: ios164239, alt: "Photo by Manuel Lübers" },
  { image: aiDome4, alt: "Photo by Manuel Lübers" },
  { image: aiDome1, alt: "Photo by Manuel Lübers" },
  { image: aiDome2, alt: "Photo by Manuel Lübers" },
  { image: aiDome3, alt: "Photo by Manuel Lübers" },
  { image: aiDome5, alt: "Photo by Manuel Lübers" },
  { image: aiDome6, alt: "Photo by Manuel Lübers" },
  { image: aiDome7, alt: "Photo by Manuel Lübers" },
  { image: aiDome8, alt: "Photo by Manuel Lübers" },
];

const GRID_WIDTHS = [400, 800, 1200, 1600, 2400];

export type Photo = Awaited<ReturnType<typeof buildPhoto>>;

async function buildPhoto({ image, alt }: { image: ImageMetadata; alt: string }) {
  const widths = [...new Set([...GRID_WIDTHS.filter((w) => w < image.width), image.width])];
  const variants = await Promise.all(
    widths.map((width) => getImage({ src: image, width, format: "webp" }))
  );
  const largest = variants[variants.length - 1];
  const lightbox = await getImage({
    src: image,
    width: Math.min(2200, image.width),
    format: "webp",
  });

  return {
    src: largest.src,
    srcSet: variants.map((v) => `${v.src} ${v.options.width}w`).join(", "),
    sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
    width: image.width,
    height: image.height,
    alt,
    lightboxSrc: lightbox.src,
  };
}

export const photos = await Promise.all(RAW.map(buildPhoto));
