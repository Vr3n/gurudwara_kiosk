import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useState } from "react";
import {
  type SlideImage,
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
} from "yet-another-react-lightbox";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function isNextJsImage(slide: SlideImage) {
  return (
    isImageSlide(slide) &&
    typeof slide.width === "number" &&
    typeof slide.height === "number"
  );
}

type NextJSImageProps = {
  slide: SlideImage;
  rect: {
    width: number;
    height: number;
  };
};

const NextJsImage = ({ slide, rect }: NextJSImageProps) => {
  const { imageFit } = useLightboxProps().carousel;
  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isNextJsImage(slide)) return undefined;

  if (slide.width === undefined) return undefined;
  if (slide.height === undefined) return undefined;

  const width = !cover
    ? Math.round(
      Math.min(rect.width, (rect.height / slide.height) * slide?.width),
    )
    : rect.width;

  const height = !cover
    ? Math.round(
      Math.min(rect.height, (rect.width / slide?.width) * slide?.height),
    )
    : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt=""
        src={slide.src}
        loading="eager"
        draggable={false}
        style={{ objectFit: cover ? "cover" : "contain" }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
      />
    </div>
  );
};

type LightBoxImagesProps = {
  imgSlides: SlideImage[];
};

const LightBoxImages = ({ imgSlides }: LightBoxImagesProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Lightbox
      open={open}
      close={() => setOpen(false)}
      slides={imgSlides}
      render={{ slide: NextJsImage }}
    />
  );
};

export default LightBoxImages;
