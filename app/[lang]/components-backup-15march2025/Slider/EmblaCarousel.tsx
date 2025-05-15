import React, { useCallback, useEffect, useRef, useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons';
import Image from 'next/image';
import Link from 'next/link';
import { NewMedia } from '../../api/Api';
import dynamic from 'next/dynamic';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';

const CountDown = dynamic(() => import('../CountDown'), { ssr: false });

type SlideType = {
  featured_image_app?: { image: string };
  featured_image_web?: { image: string };
  alt_ar?: string;
  alt?: string;
  name_ar?: string;
  name?: string;
  timer?: number;
  redirection_type?: number;
  brand?: { slug: string };
  pro?: { slug: string };
  cat?: { slug: string };
  custom_link?: string;
};

type PropType = {
  slides: SlideType[];
  lang: string;
  devicetype: any;
  options?: EmblaOptionsType;
  roundedClassName?: string;
  categoryClassName?: string;
};

const EmblaCarousel: React.FC<PropType> = ({
  slides,
  lang,
  devicetype,
  options = {},
  roundedClassName = '',
  categoryClassName = ''
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ playOnInit: true, delay: 6000 })]);
  const [isPlaying, setIsPlaying] = useState(false);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

  const getLink = (item: SlideType): string => {
    const baseUrl = `${origin}/${lang}`;
    switch (item.redirection_type) {
      case 0:
        return `${baseUrl}/brand/${item.brand?.slug}`;
      case 2:
        return `${baseUrl}/product/${item.pro?.slug}`;
      case 3:
        return `${baseUrl}/category/${item.cat?.slug}`;
      case 4:
        return `${baseUrl}/${item.custom_link}`;
      default:
        return baseUrl;
    }
  };

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay as { isPlaying: () => boolean; stop: () => void; play: () => void } | undefined;
    if (!autoplay) return;

    if (autoplay.isPlaying()) autoplay.stop();
    else autoplay.play();
  }, [emblaApi]);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay as { isPlaying: () => boolean } | undefined;
    if (autoplay) setIsPlaying(autoplay.isPlaying());
  }, [emblaApi]);

  return (
    <div className={`relative embla ${categoryClassName}`}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides?.map((item, index) => (
            <div className="embla__slide relative" key={index}>
              <Link href={getLink(item)} className="relative">
                <Image
                  src={
                    devicetype === 'mobile'
                      ? item.featured_image_app?.image
                        ? NewMedia + item.featured_image_app.image
                        : 'https://via.placeholder.com/800x600'
                      : item.featured_image_web?.image
                        ? NewMedia + item.featured_image_web.image
                        : 'https://via.placeholder.com/800x600'
                  }
                  alt={lang === 'ar' ? item.name_ar || '' : item.name || ''}
                  title={lang === 'ar' ? item.name_ar || '' : item.name || ''}
                  height={0}
                  width={0}
                  sizes="(min-width: 808px) 50vw, 100vw"
                  className={`w-full h-auto ${roundedClassName}`}
                  priority
                />
              </Link>
              {/* {item.timer && <CountDown lang={lang} timer={item.timer} devicetype={devicetype} />} */}
            </div>
          ))}
        </div>
      </div>

      {/* {slides.length > 1 && (
        <>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </>
      )} */}

      <div className="embla__dots">
        {slides?.map((item, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            aria-label={lang === 'ar' ? item.name_ar || '' : item.name || ''}
            aria-selected={index === selectedIndex}
            className={`embla__dot${index === selectedIndex ? ' embla__dot--selected' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EmblaCarousel;