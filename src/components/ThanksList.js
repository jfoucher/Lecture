import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    ScrollView,
    Switch,
    TouchableOpacity,
    Alert,
    Linking,
    FlatList,
} from 'react-native';


class ThanksList extends Component {

    constructor(props) {
        super(props);

        let rows = {thanks: [
            {key: 'th1', text: 'Pierre Eloi Bris'},
            {key: 'th2', text: 'Mandy Duclos', link: 'https://tisaneselementerre.fr'},
            {key: 'th3', text: 'Sophie Blum'},
            {key: 'th4', text: 'Audrey Adam'},
            {key: 'th5', text: 'Gérard Foucher', link: 'https://gerardfoucher.com'},
            {key: 'th6', text: 'Frédéric Hameon'},
            {key: 'th7', text: 'Jonathan Labejof'},
            {key: 'th8', text: 'Audrey Foucher Chenelle', link: 'http://salinedesarzeau.fr/'},
            {key: 'th9', text: 'Emmanuelle Le Dirach'},
            {key: 'th10', text: 'Violaine Alfaric', link: 'https://alfaric.com'},
        ]};

        this.state = {
            rows: rows,
        };
    }

    openLink(url) {
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

    _renderItem = (rowData) => {
        console.log(rowData);
        const item = rowData.item;
        if(typeof item.link === 'undefined') {
            return (
                <View key={item.key} style={styles.listItem}>
                    <Text style={{fontSize: 20, lineHeight: 40}}>{item.text}</Text>
                </View>
            );
        } else {
            return (
                <TouchableOpacity onPress={this.openLink.bind(this, item.link)} key={item.key} >
                    <View style={styles.listItem}>
                        <Text style={{fontSize: 20}}>{item.text}</Text>
                        <View>
                            <Text style={{fontSize: 40, lineHeight: 40, color: '#999999'}}>›</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    }

    generateHeaderRow = (sectionData, sectionID) => {
        console.log('rendering section header', sectionData, sectionID);
            return (
                <View key={'section_'+sectionID} style={{height: 0, borderTopColor: "#dddddd", borderTopWidth: 1}}>
                </View>
            )
    }

    render() {
        return (
            <FlatList
                data={this.state.rows.thanks}
                renderItem={this._renderItem}
            />
        );
    }
}

var styles = StyleSheet.create({
    listItem: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },


});


//AppRegistry.registerComponent('MainImage', () => MainImage);
export default ThanksList