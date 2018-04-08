import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableHighlight,
    AsyncStorage,
    Dimensions,
    Platform,
} from 'react-native';

var {height, width} = Dimensions.get('window');
class Button extends Component {

    constructor () {
        super();
        this.state = {
            shadow: {
                shadowColor: "#000000",
                shadowRadius: 1.5,
                shadowOpacity: 0.4,
                shadowOffset: {width: 0.5, height: 1},
                elevation: 2,
            },
            disabled: false,
            style: {},
        }
    }

    handlePress = (word) => {
        let result = this.props.onPress.call(this, word);
        if(result) {
            this.setState({
                disabled: false,
                style: {backgroundColor: "#c0ffc0",},
            });
        } else {
            //TODO save error word
            this.setState({
                disabled: true
            })
        }
    }

    render() {
        let {label, font} = this.props;
        var disabledStyle =  {};
        if(this.state.disabled) {
            disabledStyle = {
                textDecorationLine: 'line-through',
                textDecorationColor: '#ff0000',
                textDecorationStyle: 'solid'
            }
        }

        return(
            <TouchableWithoutFeedback
                onPress={this.handlePress.bind(this, label)}
                onPressOut={()=>{
                this.setState({
                    shadow: {
                        shadowColor: "#000000",
                        shadowRadius: 1.5,
                        shadowOpacity: 0.4,
                        shadowOffset: {width: 0.5, height: 1},
                        elevation: 2,
                    }
                });
                }}
                onPressIn={()=>{
                this.setState({
                    shadow: {
                        shadowColor: "#000000",
                        shadowRadius: 0.6,
                        shadowOpacity: 0.2,
                        shadowOffset: {width: 0.5, height: 1},
                        elevation: 1,
                    }
                });
                }}
                disabled={this.state.disabled || this.props.disable}
                >
                <View style={[styles.button, this.state.shadow, this.state.style]}>
                    <Text style={[styles.buttonText, {fontFamily: font}, disabledStyle]}>
                        {label}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#fffff3",
        margin:8,
        borderColor: '#cccccc',
        borderWidth:  (Platform.OS === 'ios') ? 0 : 1,
        
    },
    buttonText: {
        backgroundColor: 'transparent',
        fontSize: height/20,
        textAlign: 'center',
        padding: height/80,
        color: "#000000"
    }
});
//FF9500

export default Button