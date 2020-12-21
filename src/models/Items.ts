import { uuidv4 } from '../Utils';

class Item {
  id: string;
  author: string;
  imageURL: string;
  thumbURL: string;
  timestamp: number;

  constructor(author: string, imageURL: string, thumbURL: string) {
    this.id = uuidv4();

    this.author = author;
    this.imageURL = imageURL;
    this.thumbURL = thumbURL;

    this.timestamp = new Date().getTime();
  }
}

export default Item;
