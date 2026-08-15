import { useState, useCallback } from "react";
import ReactGallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import type { Photo } from "~/components/gallery/photos";

// photos.ts uses astro:assets's getImage(), which only works during
// server render/build — it throws if bundled into this client:only
// component. So photos are computed server-side in index.astro's
// frontmatter and passed down here as plain, already-resolved data.
export default function Gallery({ photos }: { photos: Photo[] }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((_event: any, { index }: any) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <div>
      <ReactGallery
        photos={photos}
        onClick={openLightbox}
        targetRowHeight={500}
      />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              styles={{
                view: (base, state) => ({
                  ...base,
                  display: "flex ", // leave trailing space here
                  alignItems: "center",
                  justifyContent: "center",
                }),
              }}
              currentIndex={currentImage}
              views={photos.map((x) => ({
                ...x,
                source: x?.lightboxSrc,
                caption: x?.alt,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}
