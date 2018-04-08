import { Howl } from 'howler'

export default class Sound {
  static setCategory() {}

  constructor(asset, from, error) {
      console.log('loading sound', asset, from, error);
    this.sound = new Howl({
      src: [require('../assets/sounds/'+asset)],
      onloaderror: error,
    })
    
    this.play = this.play.bind(this)
    this.stop = this.stop.bind(this)    
  }

  play(cb) {
    console.log('playing sound', this.sound, cb);
    if (this.sound.state() !== 'loaded') return this;
    this.sound.play();
    if (typeof cb !== undefined) {
      this.sound.once('end', cb);
    }
    
    return this;
  }

  stop() {
    this.sound.stop()
    return this
  }
}