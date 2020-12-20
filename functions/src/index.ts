import * as functions from 'firebase-functions';
import * as Storage from '@google-cloud/storage';
import { tmpdir } from 'os';
import { join, dirname } from 'path';

import * as sharp from 'sharp';
import * as fs from 'fs-extra';

const gcs = Storage();

export const generateThmbs = functions.storage.object().onFinalize(async (object) => {
  const bucket = gcs.bucket(object.bucket);
  const filePath = object.name;
  const fileName = filePath?.split('/').pop();
  var bucketDir: string;
  if (filePath) {
    bucketDir = dirname(filePath);
  }

  const workingDir = join(tmpdir(), 'thumbs');
  const tmpFilePath = join(workingDir, 'source.png');

  if (fileName?.includes('thumb@') || !object.contentType?.includes('image')) {
    console.log('exit function');
    return false;
  }

  await fs.ensureDir(workingDir);

  await bucket.file(filePath).download({
    destination: tmpFilePath,
  });

  const sizes = [64, 128];

  const uploadPromises = sizes.map(async (size) => {
    const thumbName = `thumb@${size}_${fileName}`;
    const thumbPath = join(workingDir, thumbName);

    await sharp(tmpFilePath).resize(size, size).toFile(thumbPath);

    return bucket.upload(thumbPath, {
      destination: join(bucketDir, thumbName),
    });
  });

  await Promise.all(uploadPromises);
  return fs.remove(workingDir);
});
