import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    Switch
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
            {text: 'Gérard Foucher', link: 'https://gerardfoucher.com'},
        ]};

        this.state = {
            rows: rows,
            dataSource: ds.cloneWithRowsAndSections(rows),
        };
    }

    generateRegularRow = (rowData, sectionId, rowId) => {

        //console.log('generate row', rowData)
        return (

            <View key={'row_' + sectionId + rowId} style={styles.listItem}>
                <Text style={{fontSize: 20}}>{rowData.text}</Text>
            </View>
        )
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
        padding: 6
    },


});


//AppRegistry.registerComponent('MainImage', () => MainImage);
export default ThanksList