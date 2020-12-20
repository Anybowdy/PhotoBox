'use strict';

const functions = require('firebase-functions');
const sharp = require('sharp');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();

exports.generateThumbs = functions.storage.object().onFinalize(async (object) => {
  const bucket = storage.bucket(object.bucket);
  const filePath = object.name;
  const fileName = filePath.split('/').pop();
  var bucketDir;
  if (filePath) {
    bucketDir = path.dirname(filePath);
  }

  const workingDir = path.join(os.tmpdir(), 'thumbs');
  const tmpFilePath = path.join(workingDir, 'source.png');

  if (fileName.includes('thumb@') || !object.contentType.includes('image')) {
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
    const thumbPath = path.join(workingDir, thumbName);

    await sharp(tmpFilePath).resize(size, size).toFile(thumbPath);

    return bucket.upload(thumbPath, {
      destination: path.join(bucketDir, thumbName),
      metadata: {
        contentType: object.contentType,
        metadata: {
          firebaseStorageDownloadTokens: object.metadata.firebaseStorageDownloadTokens,
        },
      },
    });
  });

  await Promise.all(uploadPromises);
  return fs.remove(workingDir);
});
