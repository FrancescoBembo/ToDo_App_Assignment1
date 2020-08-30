import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, TouchableHighlight} from 'react-native';


export const Task = (props) => {
    return(

    <TouchableHighlight >
        <View style = { props.status ? styles.completedTask : styles.task }> 

            <View style = {styles.row}>
                <Text style={ props.status ? styles.completedTaskName : styles.taskName }>{props.task}</Text>
            </View>
            
            <TouchableOpacity onPress={ () => {props.buttonPressed( props.id ) } } >
                <Image style={styles.actionIcon} source={require('../assets/check.png')} />
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => {props.delete( props.id ) } } >
                <Image style ={styles.actionIcon} source={require('../assets/remove.png')}/>
            </TouchableOpacity>

        </View>
    </TouchableHighlight>
    )
}

const styles = StyleSheet.create({

    task: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: '#F2F2F2',
        opacity: 1,
    },

    completedTask: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: '#F2F2F2'
    },

    taskName: {
        marginTop: 5,
        marginBottom: 5,
        fontWeight: "bold",
        fontSize:16,
        color: 'black'
    },

    completedTaskName: {
        opacity: 0.5,
        fontSize: 16,
        color: 'black',
        textDecorationLine: 'line-through',
    },
    
    actionIcon: {
        width: 20, 
        height: 20,
        marginRight: 30,
        margin: 5
    },

    row: {
        flexDirection: 'row',
        flex: 1
    },

})