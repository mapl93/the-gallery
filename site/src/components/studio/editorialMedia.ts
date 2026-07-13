export const editorialMedia = {
  tableware: '/media/editorial/ceramic-tableware.jpg',
  pastelTableware: '/media/editorial/pastel-tableware.jpg',
  texturedVase: '/media/editorial/textured-vase.jpg',
  potterAtWheel: '/media/editorial/potter-at-wheel.jpg',
  ceramicsShelves: '/media/editorial/ceramics-shelves.jpg',
  artistInStudio: '/media/editorial/artist-in-studio.jpg',
  galleryInterior: '/media/editorial/gallery-interior.jpg',
} as const;

export const editorialSequence = [
  editorialMedia.texturedVase,
  editorialMedia.tableware,
  editorialMedia.artistInStudio,
  editorialMedia.pastelTableware,
  editorialMedia.potterAtWheel,
  editorialMedia.ceramicsShelves,
  editorialMedia.galleryInterior,
] as const;

export function editorialImage(index = 0): string {
  const normalizedIndex = ((index % editorialSequence.length) + editorialSequence.length)
    % editorialSequence.length;
  return editorialSequence[normalizedIndex];
}
