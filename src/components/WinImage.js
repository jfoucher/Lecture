import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native';


class WinImage extends Component {

    render() {

        let uri = this.props.imageFile;
        return (
        <View style={styles.container}>

            <Image
                resizeMode="contain"
                source={uri}
                style={styles.canvas}
                ><Text style={styles.titleText}>YOU WON !!</Text>
                </Image>
        </View>
        );
    }
}

var {height, width} = Dimensions.get('window');
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    canvas: {
        width:width,
        //height: 200,
        //position: 'absolute',
        //top: 0,
        //left: 0,
        //bottom: 0,
        //right: 0
    },

    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#FF0000"
    },

});


//AppRegistry.registerComponent('MainImage', () => MainImage);
export default WinImage