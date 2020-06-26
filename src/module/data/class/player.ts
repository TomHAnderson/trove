import { Howler, Howl } from 'howler';
import { Subject, BehaviorSubject, from } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import NoSleep from 'nosleep.js';

/**
 * This controls the mp3 playback.
 */

/**
 * Per-song implementation
 */
export class Song {
  private howl: Howl;
  public index: number;

  constructor(
    readonly title: string,
    readonly file: string,
    readonly duration: string
  ) {
  }

  public setHowl(howl: Howl) {
    this.howl = howl;
  }

  public play() {
    return this.howl.play();
  }

  public stop() {
    return this.howl.stop();
  }

  public pause() {
    return this.howl.pause();
  }

  public playing() {
    return this.howl.playing();
  }

  public seek(seekTo: number = null) {
    return this.howl.seek();
  }

  public howlDuration() {
    return this.howl.duration();
  }
}


/**
 * Progress through a song
 */
export interface SoundProgressInterface {
  played: number;
  remaining: number;
  position: number;  // 0-1
}

export class Player {
  /**
   * The songPlaying is changed only when play() is called.  It is used
   * to stop the previous song if it is playing.
   */
  private songPlaying: Song;

  /**
   * This is the current song playing.  Implementing classes can change
   * the current song.
   */
  public song: Song;

  /**
   * The loaded playlist
   */
  readonly playlist: Song[];

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
  constructor(playlist: Song[]) {
    this.noSleep = new NoSleep();
    this.$progress = new BehaviorSubject({
      played: 0,
      remaining: 0,
      position: 0
    });
    this.$skipPause = new Subject();
    this.$skipPause.pipe(debounceTime(600))
      .subscribe(action => this.song.play());

    // Build the howl and other song items
    playlist.forEach((playlistSong, index) => {
      const howl = new Howl({
        src: [playlistSong.file],
        html5: true,
        autoplay: false,
        preload: false,
        onplay: () => {
          if (this.song !== this.songPlaying && this.songPlaying.playing()) {
            this.songPlaying.stop();
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

      playlist[index].index = index;
      playlist[index].setHowl(howl);
    });

    this.playlist = playlist;
    this.song = playlist[0];
    this.songPlaying = this.song;
  }

  /**
   * Move forward or backwards by one song
   */
  public skip(direction: string = 'next'): void {
    let song: Song = null;

    switch (direction) {
      case 'next':
        if (this.song.index + 1 >= this.playlist.length) {
          this.song.stop();
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
    }

    this.song = song;
    this.$skipPause.next('play');
  }

  /**
   * Not used yet
   */
  public fastforward(secs: number = 5): void {
    const timeToSeek = this.song.seek() + secs;

    if ( timeToSeek >= this.song.howlDuration()) {
      this.skip();
    } else {
      this.song.seek( timeToSeek );
    }
  }

  /**
   * Not used yet
   */
  public rewind(secs: number = 5): void {
    let timeToSeek = this.song.seek() - secs;

    timeToSeek = timeToSeek <= 0 ? 0 : timeToSeek;

    this.song.seek( timeToSeek );
  }

  /**
   * Send the $progress
   */
  private seekStep = () => {
    if ( this.song.playing() ) {
      const seek = this.song.seek();
      const duration = this.song.howlDuration();
      const progress: SoundProgressInterface = {
        played:    seek,
        remaining: duration - seek,
        position:  ((seek * 100) / duration ) * 1000000
      };

      this.$progress.next( progress );

      requestAnimationFrame( this.seekStep );
    }
  }
}
