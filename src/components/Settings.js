import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Platform,
    Linking,
} from 'react-native';
import Modal from 'react-native-web-modal';
import SettingsList from './SettingsList';
import ThanksList from './ThanksList';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
        this.linkClicked = this.linkClicked.bind(this);
    }

    componentWillReceiveProps(newProps) {
        // console.log('settings component will receive props', newProps);
        this.setState({modalVisible: newProps.visible});
    }

    setFont = (font) => {
        this.props.onChange.call(null, font);
    };
    close = () => {
        this.setState({modalVisible: false});
        this.props.onClose()
    }

    linkClicked(ev) {

    }

    render() {

        let close = require('../../assets/img/icons/close.png');
        return (
            <Modal animationType={"slide"} transparent={false} visible={this.state.modalVisible} onRequestClose={this.close} style={{display: this.state.modalVisible ? 'flex' : 'none'}}>
                
                <View style={styles.modal}>
                    <View style={{flex: 0.4}}>
                        <Text style={styles.title}>Paramètres</Text>
                        <View style={{marginTop: 0}}>
                            <SettingsList currentFont={this.props.currentFont} onSettingsChanged={this.props.onChange} />
                        </View>
                    </View>
                    { Platform.OS === 'web' ? null : 
                        <View style={{flex: 0.6}}>
                            <Text style={styles.title}>Remerciements</Text>
                            <ThanksList />
                        </View>
                    }
                </View>
                <View style={styles.gear}>
                    <TouchableWithoutFeedback onPress={this.close}>
                        <View style={{flex:1, alignItems: "center", justifyContent: "center", padding:12}}>
                            <Image source={close} style={{height: 24, width: 24}} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Modal>
        );
    }
}

var styles = StyleSheet.create({
    gear: {
        position: 'absolute',
        right: 2,
        top: 0,
        opacity: 1,
        marginTop:  (Platform.OS === 'ios') ? 12 : 0,
        height: 48,
        width: 48,
        zIndex: 100,
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        padding: 10,
        marginTop:  (Platform.OS === 'ios') ? 12 : 0,
    },
    modal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    }
});


//AppRegistry.registerComponent('MainImage', () => MainImage);
export default Settings