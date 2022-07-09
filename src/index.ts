import fsP from 'fs/promises';
import path from 'path';
import id3 from 'node-id3';
import * as fs from 'fs';

const SRC = '/Volumes/shares/Music/maimai-music';
const DEST = '/Users/clansty/Downloads/maimai-music-converted';

(async () => {
  for (const category of await fsP.readdir(SRC)) {
    if (category.startsWith('.')) continue;
    const categoryDir = path.join(SRC, category);
    const categoryDest = path.join(DEST, category);
    await fsP.mkdir(categoryDest, { recursive: true });
    for (const song of await fsP.readdir(categoryDir)) {
      if (song.startsWith('.')) continue;
      const maidata = (await fsP.readFile(path.join(categoryDir, song, 'maidata.txt'), 'utf-8'))
        .split('\n');
      const mp3 = path.join(categoryDir, song, 'track.mp3');
      const bg = path.join(categoryDir, song, 'bg.png');
      const dest = path.join(categoryDest, song + '.mp3');
      if (fs.existsSync(dest)) continue;
      console.log(song);

      await fsP.cp(mp3, dest);

      const tags: id3.Tags = {};
      tags.title = getAttr(maidata, 'title');
      tags.bpm = getAttr(maidata, 'wholebpm');
      tags.artist = getAttr(maidata, 'artist');
      tags.album = getAttr(maidata, 'genre');
      tags.image = {
        mime: 'image/png',
        type: { id: 3, name: 'front cover' },
        description: undefined,
        imageBuffer: Buffer.from(await fsP.readFile(bg)),
      };
      id3.update(tags, dest);
    }
  }
})();

const getAttr = (lines: string[], attr: string) => {
  const line = lines.find(it => it.split('=')[0] === '&' + attr);
  return line.split('=')[1];
};
