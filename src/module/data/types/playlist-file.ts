import { PlaylistSource } from './playlist-source';

export class PlaylistFile {
  title: string;
  orig: string;
  image: string;
  duration: number;
  sources: PlaylistSource[];
}
