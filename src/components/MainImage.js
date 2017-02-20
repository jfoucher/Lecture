import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
    Dimensions,
    Text,
    Animated
} from 'react-native';

var {height, width} = Dimensions.get('window');
class MainImage extends Component {

    constructor(props) {
        super(props);
        this.state={
            viewWidth: width * .8,
            viewHeight: height/2,
            imageScale: new Animated.Value(1),
            imagePosition: new Animated.Value(0),
            media: props.media
        }
    }



    componentWillReceiveProps(newProps) {
        if(!this.props.media || this.props.media.doc == newProps.media.doc) {
            this.setState({media: newProps.media});
            return;
        }
        setTimeout(() => {
            this.setState({media: newProps.media});
        }, 250);
        Animated.timing(  // Base: spring, decay, timing
            this.state.imagePosition,  // Animate `bounceValue`
            { toValue: -800,  // Animate to left
                duration: 400,
            } ).start(()=>{
                this.setState({imagePosition: new Animated.Value(800)});
                Animated.spring(  // Base: spring, decay, timing
                    this.state.imagePosition,  // Animate `bounceValue`
                    { toValue: 0,  // Animate to smaller size
                        friction: 4,  // Bouncier spring
                    } ).start();
            });


        //Animated.spring(  // Base: spring, decay, timing
        //    this.state.imageScale,  // Animate `bounceValue`
        //    { toValue: 1,  // Animate to smaller size
        //        friction: 1,  // Bouncier spring
        //    } ).start();

    }

    render() {

        var display;
        if(this.state.media && this.state.media.type == "image") {
            display = <Animated.Image
                style={{
                        width: this.state.viewWidth,
                        height: this.state.viewHeight,
                        padding:15,
                        transform: [  // `transform` is an ordered array
                            {scale: this.state.imageScale},  // Map `bounceValue` to `scale`
                            {translateX: this.state.imagePosition},  // Map `bounceValue` to `scale`
                        ]
                    }}
                resizeMode="contain"
                source={this.state.media.doc}
                />
        } else if(this.state.media && this.state.media.type=="string") {
            //convert to svg
            //Get codepoint
            const emoji = this.state.media.doc.codePointAt(0);
            display = <Text style={{fontFamily: 'Emoji One', fontSize: this.state.viewWidth, textAlign: 'center'}}>{this.state.media.doc}</Text>
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