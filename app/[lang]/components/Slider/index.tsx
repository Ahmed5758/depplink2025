// export { default as EmblaCarousel } from "./EmblaCarousel";
// export { default as EmblaCarouselTwo } from "./EmblaCarouselTwo";
import dynamic from "next/dynamic";

export const components = {
    EmblaCarousel: dynamic(() => import("./EmblaCarousel")),
    EmblaCarouselTwo: dynamic(() => import("./EmblaCarouselTwo")),
    EmblaCarouselThree: dynamic(() => import("./EmblaCarouselThree")),
};