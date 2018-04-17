import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
    Dimensions,
    Text,
    Animated,
} from 'react-native';

var {height, width} = Dimensions.get('window');
class MainImage extends Component {

    constructor() {
        super();
        this.state={
            viewWidth: width * .8,
            viewHeight: height/2,
            imageScale: new Animated.Value(1),
            imagePosition: new Animated.Value(0),
        }
    }

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.win}>
                {this.props.imageText}
            </Text>
            {this.props.media ? (
                <Image
                    key={this.props.media && this.props.media.correctWord ? this.props.media.correctWord : 'unknown-image'}
                    style={{
                            width: this.state.viewWidth,
                            height: this.state.viewHeight,
                            padding:15,
                            // transform: [  // `transform` is an ordered array
                            //     {scale: this.state.imageScale},  // Map `bounceValue` to `scale`
                            //     {translateX: this.state.imagePosition},  // Map `bounceValue` to `scale`
                            // ]
                        }}
                    resizeMode="contain"
                    source={this.props.media.doc}
                    cache="reload"
                />
                ) : null }
        </View>
        );
    }
}


var styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "transparent",
    },
    win: {
        backgroundColor: "transparent",
        fontFamily: 'Patrick Hand SC',
        fontSize: height/16,
        textAlign: 'center',
        textShadowRadius: 2,
        textShadowColor:"#fff",
        textShadowOffset: {width: .01, height: .01}
    },
});


//AppRegistry.registerComponent('MainImage', () => MainImage);
export default MainImage