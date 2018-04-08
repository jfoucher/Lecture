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
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1 !== r2;
            },
            sectionHeaderHasChanged: (r1, r2) => {
                return r1 !== r2;
            }
        });

        let rows = {thanks: [
            {text: 'Pierre Eloi Bris'},
            {text: 'Mandy Duclos', link: 'https://tisaneselementerre.fr'},
            {text: 'Sophie Blum'},
            {text: 'Audrey Adam'},
            {text: 'Gérard Foucher', link: 'https://gerardfoucher.com'},
            {text: 'Frédéric Hameon'},
            {text: 'Jonathan Labejof'},
            {text: 'Audrey Foucher Chenelle', link: 'http://salinedesarzeau.fr/'},
        ]};

        this.state = {
            rows: rows,
            dataSource: ds.cloneWithRowsAndSections(rows),
        };
    }

    openLink(url) {
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

    generateRegularRow = (rowData, sectionId, rowId) => {
        if(typeof rowData.link === 'undefined') {
            return (
                <View key={'row_' + sectionId + rowId} style={styles.listItem}>
                    <Text style={{fontSize: 20, lineHeight: 40}}>{rowData.text}</Text>
                </View>
            );
        } else {
            return (
                <TouchableOpacity onPress={this.openLink.bind(this, rowData.link)} key={'row_' + sectionId + rowId}>
                    <View style={styles.listItem}>
                        <Text style={{fontSize: 20}}>{rowData.text}</Text>
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
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData, sectionId, rowId) => {
                    return this.generateRegularRow(rowData, sectionId, rowId)
                }}
                renderSectionHeader= {(sectionData, sectionID) => {
                    return this.generateHeaderRow(sectionData, sectionID)
                }}
                renderSeparator={(sectionID, rowID) => {
                    return(
                    <View key={sectionID + rowID} style={{borderTopColor: "#dddddd", borderTopWidth:1, height: 0}}></View>
                    );
                }}
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
        padding: 8
    },


});


//AppRegistry.registerComponent('MainImage', () => MainImage);
export default ThanksList