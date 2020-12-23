import { uuidv4 } from '../Utils';
import { getReadableFromTimestamp } from '../Utils';
import { Media, MediaType } from './Media';

class Item {
  id: string;
  author: string;
  imageURL: string;
  thumbURL: string;
  timestamp: number;
  mediaType: MediaType;

  constructor(author: string, imageURL: string, thumbURL: string, mediaType: MediaType) {
    this.id = uuidv4();

    this.author = author;
    this.imageURL = imageURL;
    this.thumbURL = thumbURL;

    this.mediaType = mediaType;
    this.timestamp = new Date().getTime();
  }

  postedAt() {
    return getReadableFromTimestamp(this.timestamp);
  }
}

export default Item;
