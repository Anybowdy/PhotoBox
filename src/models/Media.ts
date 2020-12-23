enum MediaType {
  Image = 1,
  Video,
}

interface Media {
  uri: string;
  type: MediaType;
}

export { Media, MediaType };
