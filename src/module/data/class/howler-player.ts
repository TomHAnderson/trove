import { Howl } from 'howler';
import { Subject } from 'rxjs';
import { ROUTER_CONFIGURATION } from '@angular/router';

/**
 * From: https://stackblitz.com/edit/howler-player
 * ** Heavily modified for Trove
 */

export interface SongInterface {
  title: string;
  file: string;
  howl?: Howl;
  index?: number;
}

export interface SoundProgressInterface {
  played: number;    //  tiempo transcurrido s
  remaining: number; //  timpo restante
  position: number;  //  0-1% reproducido
}

export class HowlerPlayer {
  public song: SongInterface;
  public playlist: SongInterface[];
  public $progress: Subject<SoundProgressInterface>;
  private currentSoundProgress: SoundProgressInterface;
  public isPlaying: boolean;

  /** */
  constructor(playlist: SongInterface[]) {
    this.song = null;

    playlist.forEach((playlistSong, index) => {
      playlist[index].index = index;
      playlist[index].howl = new Howl({
        src: [playlistSong.file],
        html5: true,
        autoplay: false,
        onplay: () => {
          requestAnimationFrame( this.seekStep );  //  PROGRESS STEP CALL
        },
        onseek: () => {
          // Start upating the progress of the track.
          requestAnimationFrame( this.seekStep );
        },
        onend: () => {
          this.skip('next');
        }
      });
    });

    this.playlist = playlist;
    this.song = playlist[0];

    this.$progress = new Subject();
    this.$progress.subscribe(soundProgress => this.currentSoundProgress = soundProgress);
    this.$progress.next({
      played: 0,
      remaining: 0,
      position: 0
    });
  }

  /** */
  public play(playSong: SongInterface = null) {
    this.stop();

    this.song = playSong ? playSong : this.song;

    this.song.howl.stop();
    this.song.howl.play();
    this.isPlaying = true;
}

  /** */
  public pause(): void {
    if (this.isPlaying) {
      this.song.howl.pause();
      this.isPlaying = false;
    } else {
      const seek = this.currentSoundProgress.played;
      this.song.howl.stop();
      this.song.howl.play();
      this.song.howl.seek(seek);
      this.isPlaying = true;
    }
  }

  /** */
  public stop(): void {
    this.song.howl.stop();

    // Reset progress
    const progress: SoundProgressInterface = {
      played: 0,
      remaining: 0,
      position: 0
    };

    this.$progress.next( progress );

    this.isPlaying = false;
  }

  /** */
  public skip(direction: string = 'next'): void {
    let song: SongInterface = null;

    switch (direction) {
      case 'next':
        if (this.song.index + 1 >= this.playlist.length) {
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

    this.stop();
    this.song = song;
    this.play();
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

  /** */
  public onPlay(): Subject<SoundProgressInterface> {
    return this.$progress;
  }
}
