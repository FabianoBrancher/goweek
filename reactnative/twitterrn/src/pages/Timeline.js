import React, { Component } from 'react'
import socket from 'socket.io-client/dist/socket.io' 
import api from '../services/api'


import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import Tweet from '../components/Tweet'

export default class Timeline extends Component {
    state = {
        tweets: []
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Início',
        headerRight: (
            <TouchableOpacity onPress={ () => navigation.navigate('New')}>
                <Icon 
                    style={ { marginRight: 20} }
                    name="add-circle-outline"
                    size={24}
                    color="#4BB0EE"
                />
            </TouchableOpacity>
        )
    })

    async componentDidMount() {
        this.subscribeToEvents()

        const response = await api.get('tweets')

        this.setState({
            tweets: response.data
        })
    }

    subscribeToEvents = () => {
        const io = socket('http://10.0.3.2:3000', {transports: ['websocket']})

        io.on('connect', () => {
            console.log('connected')
        })
   
        io.on('tweet', data => {
            this.setState({
                tweets: [data, ...this.state.tweets]
            })
        })
        io.on('like', data => {
            this.setState({
                tweets: this.state.tweets.map(
                    tweet => tweet._id === data._id ? data : tweet
                )
            })
        })
      }

    render() {
        return (
            <View style={styles.container}>
            
                <FlatList 
                    data={this.state.tweets}
                    keyExtractor={tweet => tweet._id}
                    renderItem={ ({ item }) => <Tweet tweet={item} />}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
})