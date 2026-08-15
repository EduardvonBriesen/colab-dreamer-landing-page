import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

// Shared by index.astro and archive.astro: resolves the local gallery photo
// used for the og:image meta tag into an absolute URL plus real dimensions.
// jpeg (not webp) for safer social-crawler compatibility.
export async function getOgImage(image: ImageMetadata, site: URL | undefined) {
  const result = await getImage({ src: image, width: 1200, format: "jpeg" });
  return {
    url: new URL(result.src, site).href,
    width: result.options.width,
    height: result.options.height,
  };
}
