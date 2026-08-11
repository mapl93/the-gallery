import { Box } from 'lucide-react';
import { editorialImage } from './editorialMedia';
import type { ProductGalleryMedia } from './ProductGalleryArtwork';

export function buildProductGalleryFixture(): ProductGalleryMedia[] {
  return [
    {
      id: 'front', type: 'image', label: 'Front view',
      previewSrc: editorialImage(0), previewAlt: '', src: editorialImage(0),
      alt: 'Celadon glazed stoneware vessel, front view', caption: 'Front view',
      className: 'docs-studio__product-media docs-studio__product-media--1',
    },
    {
      id: 'turntable', type: 'video', label: 'Turntable video',
      previewSrc: editorialImage(1), previewAlt: 'Poster for the turntable video',
      activationLabel: 'Play product video',
      className: 'docs-studio__product-media docs-studio__product-media--2',
      activeContent: <video controls preload="none" poster={editorialImage(1)} aria-label="Product turntable video" />,
    },
    {
      id: 'studio-film', type: 'external-video', label: 'Studio film',
      previewSrc: editorialImage(2), previewAlt: 'Poster for the studio film',
      activationLabel: 'Play studio film',
      className: 'docs-studio__product-media docs-studio__product-media--3',
      activeContent: <iframe title="Studio film" srcDoc="<style>body{margin:0;display:grid;place-items:center;height:100%;background:#171717;color:white;font:16px system-ui}</style><p>External video provider</p>" />,
    },
    {
      id: 'model', type: 'model', label: 'Interactive 3D model',
      previewSrc: editorialImage(3), previewAlt: 'Preview of the vessel 3D model',
      activationLabel: 'View in 3D', badgeLabel: '3D',
      className: 'docs-studio__product-media docs-studio__product-media--4',
      activeContent: <div className="docs-studio__model-viewer" role="img" aria-label="Interactive 3D model viewer"><Box aria-hidden="true" /><span>Interactive 3D viewer</span></div>,
      arAction: <button className="btn btn--secondary" type="button">View in your space</button>,
    },
    {
      id: 'detail', type: 'image', label: 'Glaze detail',
      previewSrc: editorialImage(4), previewAlt: '', src: editorialImage(4),
      alt: 'Close detail of the celadon glaze', caption: 'Glaze detail',
      className: 'docs-studio__product-media docs-studio__product-media--3',
    },
  ];
}
