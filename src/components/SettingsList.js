import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    Switch,
    Platform,
} from 'react-native';


class SettingsList extends Component {

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

        const systemFont = (Platform.OS === 'web') ? 'sans-serif' : 'System';
        const cursiveFont = (Platform.OS === 'web') ? 'CursiveStandard' : 'Cursive standard';

        let rows = {police: [
            {text: 'Majuscules', font: 'Patrick Hand SC', active: props.currentFont === 'Patrick Hand SC'},
            {text: 'Cursive', font: cursiveFont, active: props.currentFont === cursiveFont},
            {text: 'Imprimerie', font: systemFont, active: props.currentFont === systemFont},
        ]};

        this.state = {
            rows: rows,
            dataSource: ds.cloneWithRowsAndSections(rows),
        };
    }

    switchChanged = (rowId, rowData, value) => {

        //console.log('switch changed', value, rowId, rowData);
            if(value) {
                //TODO disable other checkboxes
                this.props.onSettingsChanged(rowData.font);
            }
            var oldRows = this.state.rows.police.slice();
            var newRows = oldRows.map((r, i) => {
                if(i === Number(rowId)) {
                    return {text: r.text, font: r.font, active: value}
                } else {
                    return {text: r.text, font: r.font, active: !value}
                }
            });

            this.setState({
                rows: {police: newRows},
                dataSource: this.state.dataSource.cloneWithRowsAndSections({police: newRows})
            });
            //console.log('new rows', newRows);
    }

    generateRegularRow = (rowData, sectionId, rowId) => {

        //console.log('generate row', rowData)
        return (

            <View key={'row_' + sectionId + rowId} style={styles.listItem}>
                <Text style={{fontFamily: rowData.font, fontSize: 30}}>{rowData.text}</Text>
                <Switch
                    onValueChange={this.switchChanged.bind(this, rowId, rowData)}
                    disabled={rowData.active}
                    value={rowData.active}
                    />
            </View>
        )
    }


    generateHeaderRow = (sectionData, sectionID) => {
        // console.log('rendering section header', sectionData, sectionID);
            return (
                <View key={'section_'+sectionID} style={{padding: 5, backgroundColor: "#eeeeee"}}>
                    <Text style={{fontSize: 16}}>{(sectionID == 'police') ? 'Police de caractères' : 'Default header'}</Text>
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
export default SettingsList