import { StatusBar } from 'expo-status-bar';
import React , {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, Button, TouchableOpacity, AsyncStorage, } from 'react-native';

import {Task} from './components/Task';

export default class App extends Component {

  state = { taskName: '', showToast: false,  message: ''}
  listData = []

  render() {
    return (

      <SafeAreaView style={{flex:1, position: 'relative'}}>
      
        <View style = {styles.main}> 
          <TextInput style={styles.textField} placeholder="New task..." onChangeText={ text => this.setState({taskName: text}, () => {this.validate()} )} ref={(textField) => (this._textInput = textField)} />
        </View>
      
        <View>
            <TouchableOpacity style={this.state.validInput ? styles.button : styles.btnDisabled} onPress={this.addTask} disabled = {!this.state.validInput ? true : false} >
              <Text style={styles.btnText}>Add</Text>
            </TouchableOpacity>
        </View>

        
        <View style={[{ display: this.state.showToast ? 'flex' : 'none' }, styles.toast ]}>
          <Text style={styles.toastMessage}>{this.state.message}</Text>
        </View>

        <View style={{flex:1}}>
          <FlatList data={this.listData} renderItem={this.renderList} keyExtractor={ item => item.id} extraData={this.state.taskName} />
        </View>
        
        
      </SafeAreaView>
  
    )
  }


  componentDidMount() {
    this.loadList()
  }

  renderList = ({item}) => (
    <Task task={item.task} id={item.id} delete={this.deleteItemById} buttonPressed={this.checkItemOff} status = {item.status} />
  )

  checkItemOff = ( itemId ) =>{
      this.listData.forEach( (item) => {
        if( item.id == itemId ) {
          item.status = true
        }
      } )
      this.saveList()
      this.setState({taskName: null})
  }

  //after pressing the button add the tiped name to the task list
  addTask = () => {
    if(this.state.taskName == '') {
        return;
      }

      let itemId = new Date().getTime().toString()
      let listItem = {
        id: itemId,
        task: this.state.taskName,
        status: false,
      }
      
      this.listData.push(listItem)
      this.sortList()
      this.saveList()
      this.setState({taskName: null, validInput: false})
      this._textInput.clear()
      this._textInput.focus()
    }

    //checks the validity of the input filed to activate the button
    validate = () => {
      if( this.state.taskName ){
        this.setState({validInput:true})
      }
    }

    //Always add the new task always on top
    sortList = () => {
      this.listData.sort( (item1,item2)=> {
        return item2.id - item1.id
      })
    }

    deleteItemById = (itemId) => {
        this.listData.forEach((item, index) => {
            if (item.id == itemId) {
                this.listData.splice(index, 1)
            }
        })
        this.saveList()
        this.setState({
            refresh: !this.state.refresh
        })
    }



    saveList = async () => {
        try {
          await AsyncStorage.setItem(
            'data',
            JSON.stringify(this.listData)
          )
        }
        catch( error ) {
          console.log(error)
        }
      }
    


      loadList = async () => {
        try{
          let items = await AsyncStorage.getItem('data')
          if( JSON.parse(items) ) {
            this.listData = JSON.parse( items )
          }
          this.setState({expenseAmount:0})
        }
        catch(error) {
          console.log(error)
        }
      }

  }


/////////////////////////////////////////////////////////////////


const styles = StyleSheet.create({
 

  main: {
    borderRadius: 40,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#5856D6',
    margin: 10,
    padding: 0,
    backgroundColor: '#F2F2F2'
  },

  textField: {
    padding: 1,
    marginVertical: 15,
    marginStart:15,
    marginEnd: 15,
    backgroundColor: '#F2F2F2'
  },

  button: {
    borderRadius: 40,
    marginStart:15,
    marginEnd: 15,
    padding: 12,
    backgroundColor: '#5856D6',
  },

  btnText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },

  btnDisabled:{
    marginStart:15,
    marginEnd: 15,
    opacity: 0.5,
    borderRadius: 40,
    padding: 12,
    backgroundColor: '#5856D6'
  }
 
})