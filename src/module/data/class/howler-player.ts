import { Howl } from 'howler';
import { Subject, BehaviorSubject } from 'rxjs';
import NoSleep from 'nosleep.js';
import { first, distinctUntilChanged, debounceTime } from 'rxjs/operators';

/**
 * This controls the mp3 playback.
 */

export interface SongInterface {
  title: string;
  file: string;
  duration: string;
  howl?: Howl;
  index?: number;
}

export interface SoundProgressInterface {
  played: number;
  remaining: number;
  position: number;  // 0-1
}

export class HowlerPlayer {
  /**
   * The songPlaying is changed only when play() is called.  It is used
   * to stop the previous song if it is playing.
   */
  private songPlaying: SongInterface;

  /**
   * This is the current song playing.  Implementing classes can change
   * the current song.
   */
  public song: SongInterface;

  /**
   * The loaded playlist
   */
  private playlist: SongInterface[];

  /**
   * Tracks track progress as it plays
   */
  public $progress: BehaviorSubject<SoundProgressInterface>;

  /**
   * When hitting next or prev over and over it tries to load each song
   * immediately.  Using this Subject allows buffering of commands so only
   * after the debounceTime has passed will it load the song and start playing.
   */
  private $skipPause: Subject<string>;

  /**
   * When playing try to stop the phone screen from sleeping
   */
  private noSleep: NoSleep;

  /**
   * Only one playlist can be loaded into a player at a time.  This works
   * because the only way to play songs is through a playlist on an identifier
   */
  constructor(playlist: SongInterface[]) {
    this.noSleep = new NoSleep();
    this.$progress = new BehaviorSubject({
      played: 0,
      remaining: 0,
      position: 0
    });
    this.$skipPause = new Subject();
    this.$skipPause.pipe(debounceTime(600))
      .subscribe(action => this.song.howl.play());

    // Build the howl and other song items
    playlist.forEach((playlistSong, index) => {
      playlist[index].index = index;
      playlist[index].howl = new Howl({
        src: [playlistSong.file],
        html5: true,
        autoplay: false,
        preload: false,
        onplay: () => {
          if (this.song !== this.songPlaying && this.songPlaying.howl.playing()) {
            this.songPlaying.howl.stop();
          }
          this.noSleep.enable();
          this.song = playlist[index];
          this.songPlaying = this.song;
          requestAnimationFrame(this.seekStep);
        },
        onseek: () => {
          // Upating the track progress
          requestAnimationFrame(this.seekStep);
        },
        onpause: () => {
          this.noSleep.disable();
        },
        onstop: () => {
          this.noSleep.disable();
          requestAnimationFrame(this.seekStep);
        },
        onend: () => {
          this.skip('next');
        },
        onloaderror: (error) => {
          console.log(error);
        }
      });
    });

    this.playlist = playlist;
    this.song = playlist[0];
    this.songPlaying = this.song;
  }

  /** */
  public skip(direction: string = 'next'): void {
    let song: SongInterface = null;

    switch (direction) {
      case 'next':
        if (this.song.index + 1 >= this.playlist.length) {
          this.song.howl.stop();
          return;
        }

        song = this.playlist[this.song.index + 1];
        break;
      case 'prev':
        if (this.song.index - 1 < 0) {
          return;
        }

        song = this.playlist[this.song.index - 1];
        break;
      default:
        alert('Invalid skip direction');
        return;
    }

    this.song = song;
    this.$skipPause.next('play');
  }

  /** */
  public fastforward(secs: number = 5): void {
    const timeToSeek = this.song.howl.seek() + secs;

    if ( timeToSeek >= this.song.howl.duration()) {
      this.skip();
    } else {
      this.song.howl.seek( timeToSeek );
    }
  }

  /** */
  public rewind(secs: number = 5): void {
    const sound = this.song.howl;
    let timeToSeek = sound.seek() - secs;

    timeToSeek = timeToSeek <= 0 ? 0 : timeToSeek;

    sound.seek( timeToSeek );
  }

  /** */
  private seekStep = () => {
    const sound = this.song.howl;

    if ( sound.playing() ) {
      const seek = sound.seek();
      const duration = sound.duration();
      const progress: SoundProgressInterface = {
        played:    seek,
        remaining: duration - seek,
        position:  ((seek * 100) / duration ) * 1000000
      };

      this.$progress.next( progress );

      requestAnimationFrame( this.seekStep );
    }
  }

  public getSong() {
    return this.song;
  }

  public getPlaylist() {
    return this.playlist;
  }
}
