import * as fs from 'fs';
import * as path from 'path';

export function deleteImageFile(imageUrl: string) {
  if (!imageUrl) return;

  const filename = imageUrl.split('/uploads/')[1];
  if (!filename) return;

  const fullPath = path.join(__dirname, '../../uploads', filename);
  fs.unlink(fullPath, (err) => {
    if (err) console.error('Error deleting image:', err.message);
  });
}
