import { useState, useCallback } from "react";
import ReactGallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { photos } from "~/components/gallery/photos";

export default function Gallery() {
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
      <ReactGallery photos={photos} onClick={openLightbox} />
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
                source: x?.src,
                srcset: x?.srcSet,
                caption: x?.alt,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}
