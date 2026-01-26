import { EXUBERANCE_GALLERY_FILES } from '../galleryFiles.js';

function imgFileAt(index) {
  const files = EXUBERANCE_GALLERY_FILES;
  if (!files?.length) return null;
  return files[index % files.length];
}

export const FACULTY = Array.from({ length: 25 }, (_, i) => ({
  id: `faculty-${i + 1}`,
  name: `Faculty ${String(i + 1).padStart(2, '0')}`,
  designation: 'Designation',
  imgFile: imgFileAt(i),
}));

export const CORE_COMMITTEE = Array.from({ length: 23 }, (_, i) => ({
  id: `core-${i + 1}`,
  name: `Member ${String(i + 1).padStart(2, '0')}`,
  imgFile: imgFileAt(25 + i),
  linkedin: 'https://www.linkedin.com/',
  instagram: 'https://www.instagram.com/',
}));
