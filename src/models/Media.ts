enum MediaType {
  Image,
  Video,
}

interface Media {
  uri: string;
  type: MediaType;
}

export { Media, MediaType };
