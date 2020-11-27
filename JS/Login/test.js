import React,{ Component } from 'react'

export default class Test{
    tes = (props) => {
        if(props.email == 'harmandeepmand.hm@gmail.com')
            return 'Its You'
        else return 'Its not You'
    }

    render(){
        return null
    }
}