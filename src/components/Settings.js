import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
    Modal,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Platform,
    Linking,
} from 'react-native';
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
        console.log('settings component will receive props', newProps);
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
                <Modal animationType={"slide"} transparent={false} visible={this.state.modalVisible} onRequestClose={this.close}>
                    <Text style={styles.title}>Paramètres</Text>
                    <View style={styles.gear}>
                        <TouchableWithoutFeedback onPress={this.close}>
                            <View style={{flex:1, alignItems: "center", justifyContent: "center", padding:12}}>
                                <Image source={close} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{marginTop: 0}}>
                        <SettingsList currentFont={this.props.currentFont} onSettingsChanged={this.props.onChange} />
                    </View>
                    <View>
                        <Text style={styles.title}>Remerciements</Text>
                        <ThanksList />
                    </View>
                </Modal>
        );
    }
}

var styles = StyleSheet.create({
    gear: {
        position: 'absolute',
        right: 2,
        opacity: 0.5,
        marginTop:  (Platform.OS === 'ios') ? 12 : 0,
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        padding: 10,
        marginTop:  (Platform.OS === 'ios') ? 12 : 0,
    }
});


//AppRegistry.registerComponent('MainImage', () => MainImage);
export default Settings