import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
    Dimensions,
    Text
} from 'react-native';

var {height, width} = Dimensions.get('window');
class MainImage extends Component {

    constructor() {
        super();
        this.state={
            viewWidth: width * .8,
            viewHeight: height/2
        }
    }

    render() {

        var display;
        if(this.props.media && this.props.media.type == "image") {
            display = <Image
                style={{
                        width: this.state.viewWidth,
                        height: this.state.viewHeight,
                        padding:15,
                    }}
                resizeMode="contain"
                source={this.props.media.doc}
                />
        } else if(this.props.media && this.props.media.type=="string") {
            //convert to svg
            //Get codepoint
            const emoji = this.props.media.doc.codePointAt(0);
            display = <Text style={{fontFamily: 'Emoji One', fontSize: this.state.viewWidth, textAlign: 'center'}}>{this.props.media.doc}</Text>
        }

        return (
        <View style={styles.container}>
            <Text style={styles.win}>
                {this.props.imageText}
            </Text>
            <View>
                {display}
            </View>
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