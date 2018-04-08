import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Image,
    AsyncStorage,
    Platform,
} from 'react-native';


import MainImage from './components/MainImage'
import Settings from './components/Settings'
import Button from './components/Button'
import data from './data'
import {shuffle} from './utils'
import Sound from 'react-native-sound'

const LEVEL_CONSTANT = 4;

const tada = new Sound('tada.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
    } else { // loaded successfully
        console.log('duration in seconds: ' + tada.getDuration() +
            'number of channels: ' + tada.getNumberOfChannels());
    }
});

const successSounds = ['awesome.mp3', 'great.mp3', 'good.mp3'].map((s) => {
    return new Sound(s, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
        } else { // loaded successfully
            console.log('duration in seconds: ' + tada.getDuration() +
                'number of channels: ' + tada.getNumberOfChannels());
        }
    });
});


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            words: [],
            currentImageIndex: 0,
            currentLevel: 1,
            win: false,
            buttonFont: 'Cursive standard',
            settingsVisible: false,
            currentWordErrors: 0,
            errors: 0,
            disableButtons: false,
        }
    }

    gotNewSettings = (font) => {
        if (font !== null && font !== this.state.buttonFont){
            AsyncStorage.setItem('@Lecture:Settings:ButtonFont', font);
            this.setState({buttonFont: font});
        }
    }

    getNewImage = () => {
        //Choose a random image
        console.log('data.media', data.media);
        const medias = shuffle(data.media.filter((m) => {
            return m.difficulty <= this.state.currentLevel;
        })).sort((a, b) => {
            return b.priority - a.priority;
        });

        console.log('medias', medias);

        const media = medias[0];
        //reduce usage for all words
        data.media.forEach((m, i) => {
            data.media[i].priority  = m.priority / 1.2;
        });
        //Word has been used, so decrease priority
        data.media.forEach((m, i) => {
            if (m.correctWord == media.correctWord) {
                data.media[i].priority -= 1;
            }
        });

        let allWords = data.words.filter((el) => {
            return el !== media.correctWord;
        });

        //if level is high, choose words that start with the same letter
        const levelWords = allWords.filter((el) => {
            if (this.state.currentLevel >= 3) {
                return el.substr(0, 1) === media.correctWord.substr(0, 1);
            }
            return true;
        });
        console.log('levelWords', levelWords);
        if (levelWords.length < 2) {
            shuffle(allWords).slice(0, 2).forEach((w) => {
                levelWords.push(w);
            });
        }

        const words = shuffle(levelWords).slice(0, 2).concat([media.correctWord]);

        return {media, words: shuffle(words)};
    }

    getResultForNumberOfErrors = (numberOfErrors) => {
        console.log('getting status of errors', numberOfErrors, this.state.currentImageIndex);
        if(!numberOfErrors) {
            return 'noErrors'
        } else if(numberOfErrors / this.state.currentImageIndex <= 0.5) {
            return 'fewErrors';
        } else {
            return 'lotErrors';
        }
    }

    componentDidMount() {
        let {media, words} = this.getNewImage(this.state.currentImageIndex, this.state.currentLevel);
        this.setState({media, words});
        AsyncStorage.getItem('@Lecture:Settings:ButtonFont').then((font) => {
            //Get previously selected font
            if(!font) {
                font = 'Cursive standard';
            }
            this.setState({buttonFont: font});
        }).catch(() => {
            AsyncStorage.setItem('@Lecture:Settings:ButtonFont', 'Cursive standard');
            this.setState({buttonFont: 'Cursive standard'});
        });
        //Reset number of errors for level.
        //TODO maybe restart from where user left off
        AsyncStorage.setItem('@Lecture:numberOfErrors:level'+this.state.currentLevel, JSON.stringify(0));
        //AsyncStorage.removeItem('@Lecture:errors');
    }

    restartGame = () => {
        for (var l in data) {
            console.log('clearing level errors', l.substr(0, 5), l.substring(l.indexOf('_')+1))
            if (data.hasOwnProperty(l) && l.substr(0, 5) == 'level') {
                AsyncStorage.setItem('@Lecture:numberOfErrors:level'+l.substring(l.indexOf('_')+1), JSON.stringify(0));
            }
        }

        let {media, words} = this.getNewImage(0);
        this.setState({win:false, endlevel: false, endgame: false, media: media, words: words, currentImageIndex: 0, currentLevel: 1});
        return true;
    }

    restartLevel = () => {
        AsyncStorage.setItem('@Lecture:numberOfErrors:level'+this.state.currentLevel, JSON.stringify(0));
        let {media, words} = this.getNewImage(0, this.state.currentLevel);
        this.setState({win:false, endgame: false, endlevel: false, media: media, words: words, currentImageIndex: 0});
        return true;
    }

    onPressButton = (el) => {
        //TODO add a new word and shuffle buttons on error
        if(this.state.win === true) {
            //Clicked button to go to next level, set win to false and get new image
            //TODO only go to next level if no errors, otherwise start current level again

            //TODO there is conflict in the level changing process
            AsyncStorage.getItem('@Lecture:numberOfErrors:level'+this.state.currentLevel).then((str) => {
                let {media, words} = this.getNewImage();
                if(media && words) {
                    this.setState({media: media, words: words, win: false, errors: 0, currentImageIndex: 0});
                }
            });
            return true;
        }

        if(el === this.state.media.correctWord) {
            this.setState({disableButtons: true});
            //Player chose correct word, display another image
            successSounds[this.state.currentWordErrors].play((success) => {

                let level = Math.floor(this.state.currentImageIndex / LEVEL_CONSTANT - this.state.errors / LEVEL_CONSTANT * 2) + 1;
                if (level < 1) {
                    level = 1;
                }
                if(level > this.state.currentLevel && this.state.currentImageIndex > LEVEL_CONSTANT) {
                    //Show level change screen
                    let result = this.getResultForNumberOfErrors(this.state.errors);
                    this.setState({
                        win: true,
                        endgame: false,
                        words: ['Passer au niveau ' + level + ' !'],
                        imageText: data.endlevel[result].text.replace('%%n%%', this.state.errors + ' faute' + ((this.state.errors > 1) ? 's' : '')),
                        media: data.endlevel[result].image,
                        currentLevel: level,
                        disableButtons: false,
                    }, () => {
                        tada.play();
                    });
                    return;
                }

                let {media, words} = this.getNewImage();
                this.setState({
                    media: media,
                    words: words,
                    currentImageIndex: this.state.currentImageIndex + 1,
                    disableButtons: false,
                });
            });

            //TODO Remove this word from error words if it comes from another level
            this.setState({currentWordErrors: 0});
            return true;
        } else {
            this.setState({
                currentWordErrors: this.state.currentWordErrors + 1,
                errors: this.state.errors + 1,
            });
                    //Word was wrong, so increase priority
            data.media.forEach((m, i) => {
                if (m.correctWord == this.state.media.correctWord) {
                    data.media[i].priority += 0.45;
                }
            });
            //Player did not choose the right word
            AsyncStorage.getItem('@Lecture:numberOfErrors:level'+this.state.currentLevel).then((str) => {
                //Increment error number for this level
                var num = JSON.parse(str);
                AsyncStorage.setItem('@Lecture:numberOfErrors:level'+this.state.currentLevel, JSON.stringify(num+1));
            }).catch(() => {
                //Or set it to 1 if it was the first error for this level
                AsyncStorage.setItem('@Lecture:numberOfErrors:level'+this.state.currentLevel, JSON.stringify(1));
            });

            //Add wrong word to global errors
            AsyncStorage.getItem('@Lecture:errors').then((str) => {
                var errors = JSON.parse(str);
                var levelErrors = errors['level_'+this.state.currentLevel];

                if(levelErrors.indexOf(this.state.media.correctWord.toLowerCase()) == -1) {
                    levelErrors.push(this.state.media.correctWord.toLowerCase());
                }
                errors['level_'+this.state.currentLevel] = levelErrors;
                AsyncStorage.setItem('@Lecture:errors', JSON.stringify(errors));
            }).catch((e) => {
                var ers = {};
                ers['level_'+this.state.currentLevel] = [this.state.media.correctWord.toLowerCase()];
                AsyncStorage.setItem('@Lecture:errors', JSON.stringify(ers));
            });

            return false;
        }
    };

    render() {

        //TODO add animations when changing between images

        console.log('rendering app, settings statuts', this.state.settingsVisible);

        var buttons = this.state.words.map((word) => {
            return (
                <Button key={this.state.currentImageIndex + '' + word} onPress={this.onPressButton} label={word} font={this.state.buttonFont} disable={this.state.disableButtons} />
            );
        });

        if(this.state.endgame) {
            buttons = [
                <Button key="end" onPress={this.restartGame} label="Rejouer" font={this.state.buttonFont} />,
                <Button key="restart_level" onPress={this.restartLevel} label={"Recommencer le niveau "+this.state.currentLevel} font={this.state.buttonFont} />
            ]
        }

        if(this.state.endlevel && this.state.win === false) {
            buttons = [
                <Button key="restart_level" onPress={this.restartLevel} label="Réessaie" font={this.state.buttonFont} />
            ]
        }
        let icon = require('../assets/img/icons/settings.png');
        return (
            <View style={styles.container}>
                <MainImage media={this.state.media} imageText={(this.state.win||this.state.endlevel) ? this.state.imageText: null} />
                <View style={styles.instructions}>
                    {buttons}
                </View>
                <Settings onChange={this.gotNewSettings} currentFont={this.state.buttonFont} visible={this.state.settingsVisible} onClose={() => {this.setState({settingsVisible: false})}} />
                <View style={{position: 'absolute', top:0, right: 2}}>
                    <TouchableWithoutFeedback onPress={() => {console.log('close called');this.setState({settingsVisible: true})}}>
                        <View style={{padding:12, opacity: 0.5}}>
                            <Image source={icon} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop:  (Platform.OS === 'ios') ? 12 : 0,
        flex: 1,
        flexDirection: 'column',
        justifyContent: "space-between",
        alignItems: 'stretch',
        backgroundColor: "#ffffff"
    },
    instructions: {
        marginBottom: 5,
    }
});

export default App