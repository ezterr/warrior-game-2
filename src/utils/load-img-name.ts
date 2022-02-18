import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';

export async function loadImgName(path: string): Promise<string[]> {
  const filesName = await readdir(path);

  const imgName = await Promise.all(filesName.map(async (e: string): Promise<string> => {
    const fileStat = await stat(join(path, e));

    if (fileStat.isFile()) {
      const fileExtname = extname(e).toLowerCase();

      if (fileExtname === '.jpg' || fileExtname === '.webp' || fileExtname === '.jpeg' || fileExtname === '.png') {
        return e;
      }
    }

    return '';
  }));

  return imgName.filter((e) => e);
}
