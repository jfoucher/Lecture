import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableHighlight,
    AsyncStorage,
    Dimensions
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
            disabled: false
        }
    }

    handlePress = (word) => {
        let result = this.props.onPress.call(this, word);
        if(result) {
            this.setState({
                disabled: false
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
                    activeOpacity={0.8}
                    underlayColor={this.state.underlayColor}
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
                    disabled={this.state.disabled}
                    >
                    <View style={[styles.button, this.state.shadow]}>
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