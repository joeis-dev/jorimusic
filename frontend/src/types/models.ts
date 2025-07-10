export interface Song {
  id: number;
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  filePath?: string;
  coverArtUrl?: string;
}

export interface Playlist {
  id: number;
  name: string;
  owner?: any; // User object, simplify for now
  songs?: Song[];
  collaborators?: any[]; // User objects, simplify for now
}
