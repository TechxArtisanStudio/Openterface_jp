import type { MediaFormat } from './youtube';
import type { MediaStrings } from '../i18n/media';

export type MediaSectionFormat = Extract<
  MediaFormat,
  'long' | 'short' | 'coverage' | 'post' | 'testimonial'
>;

export type MediaSectionConfig = {
  format: MediaSectionFormat;
  headingKey: keyof Pick<
    MediaStrings,
    'formatVideos' | 'formatShorts' | 'pressHeading' | 'formatPosts' | 'formatTestimonials'
  >;
  gridClass: string;
};

/** Section order on /media/ when format filter is All. */
export const MEDIA_SECTIONS: readonly MediaSectionConfig[] = [
  { format: 'long', headingKey: 'formatVideos', gridClass: 'video-catalog-grid' },
  {
    format: 'short',
    headingKey: 'formatShorts',
    gridClass: 'video-catalog-grid video-catalog-grid--shorts',
  },
  { format: 'coverage', headingKey: 'pressHeading', gridClass: 'media-press-grid' },
  { format: 'post', headingKey: 'formatPosts', gridClass: 'media-posts-grid' },
  { format: 'testimonial', headingKey: 'formatTestimonials', gridClass: 'media-testimonials-grid' },
] as const;

export function sectionHeading(strings: MediaStrings, headingKey: MediaSectionConfig['headingKey']): string {
  return strings[headingKey];
}
