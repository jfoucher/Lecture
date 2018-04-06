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

const tada = new Sound('tada.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
    } else { // loaded successfully
        console.log('duration in seconds: ' + tada.getDuration() +
            'number of channels: ' + tada.getNumberOfChannels());
    }
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
        }
    }

    gotNewSettings = (font) => {
        if (font !== null && font !== this.state.buttonFont){
            AsyncStorage.setItem('@Lecture:Settings:ButtonFont', font);
            this.setState({buttonFont: font});
        }
    }

    getNewImage = (index, level = 1) => {
        console.log('index, level', index, level);
        let medias = data['level_'+level].media;


        if(index >= medias.length) {
            return false;
        }
        //Choose a random image
        let media = medias[index];

        var allWords = data['level_'+level].words;

        // console.log('getting words', media.words);

        if(typeof media.words !== 'undefined' && typeof media.words['level_'+level] !== 'undefined') {
            allWords = media.words['level_'+level];
        }

        console.log('all words', allWords);

        let words = shuffle(allWords.filter((el) => {
            return el !== media.correctWord;
        })).slice(0,2).concat([media.correctWord]);



        return {media: media, words: shuffle(words)};
    }

    getResultForNumberOfErrors = (numberOfErrors) => {

        var res = numberOfErrors / data['level_'+this.state.currentLevel].media.length;

        if(!res) {
            return 'noErrors'
        } else if(res <= 0.2) {
            return 'fewErrors';
        } else {
            return 'lotErrors';
        }
    }

    componentDidMount() {
        let {media, words} = this.getNewImage(this.state.currentImageIndex, this.state.currentLevel);
        this.setState({media: media, words: words});
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
            AsyncStorage.getItem('@Lecture:numberOfErrors:level'+this.state.currentLevel).then((str) => {
                let ers = JSON.parse(str);
                var newLevel = this.state.currentLevel + 1;
                if(ers && ers > 2) {
                    newLevel = this.state.currentLevel
                }
                let {media, words} = this.getNewImage(0, newLevel);
                if(media && words) {
                    this.setState({media: media, words: words, win: false, currentImageIndex: 0, currentLevel: newLevel});
                }
            });
            return true;
        }
        if(el === this.state.media.correctWord) {

            //Player chose correct word, display another image
            let mediaIndex = this.state.currentImageIndex + 1;
            let {media, words} = this.getNewImage(mediaIndex, this.state.currentLevel);

            console.log('Player chose wisely', media, words, mediaIndex, this.state.currentLevel);

            if(media && words) {
                //Next image exists, display
                this.setState({media: media, words: words, currentImageIndex: this.state.currentImageIndex + 1});
            } else {
                //No next image, player has finished level
                AsyncStorage.getItem('@Lecture:numberOfErrors:level'+this.state.currentLevel).then((str) => {
                    //Get number of errors
                    let ers = JSON.parse(str);
                    let result = this.getResultForNumberOfErrors(ers);
                    console.log('result', result)
                    if(result === 'noErrors' || result === 'fewErrors') {

                        //Play victory sound
                        tada.play((success) => {
                            if (success) {
                                console.log('successfully finished playing');
                            } else {
                                console.log('playback failed due to audio decoding errors');
                            }
                        });

                        //If player has no or few errors, got to next level if available
                        if(typeof data['level_'+(this.state.currentLevel+1)] === 'undefined') {
                            //No next level, endgame

                            this.setState({
                                win: true,
                                endgame: true,
                                words: [],
                                imageText: data.endgame[result].text.replace('%%n%%', ers + ' faute' + ((ers > 1) ? 's' : '')),
                                media: data.endgame[result].image
                            });
                        } else {
                            //Next level, offer to do it
                            console.log('has next level', 'level_'+this.state.currentLevel)
                            console.log('image is', data['level_'+this.state.currentLevel].endlevel[result].image);
                            this.setState({
                                win: true,
                                media: data['level_'+this.state.currentLevel].endlevel[result].image,
                                words: [data['level_'+this.state.currentLevel].endlevel[result].buttonText],
                                imageText: data['level_'+this.state.currentLevel].endlevel[result].text.replace('%%n%%', ers+' faute'+((ers>1) ? 's' : ''))
                            });
                        }
                    } else {
                        //Too many errors, offer to restart level
                        let text = data['level_'+this.state.currentLevel].endlevel[result].text.replace('%%n%%', ers+' faute'+((ers>1) ? 's' : ''));
                        console.log('text', text);
                        this.setState({
                            win: false,
                            endgame: false,
                            endlevel: true,
                            media: data['level_'+this.state.currentLevel].endlevel[result].image,
                            words: [],
                            imageText: text
                        });
                    }


                });

            }

            //TODO Remove this word from error words if it comes from another level

            return true;
        } else {
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
            })

            return false;
        }
    };

    render() {

        //TODO add animations when changing between images

        console.log('rendering app, settings statuts', this.state.settingsVisible);

        var buttons = this.state.words.map((word) => {
            return (
                <Button key={this.state.currentImageIndex + '' + word} onPress={this.onPressButton} label={word} font={this.state.buttonFont} />
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