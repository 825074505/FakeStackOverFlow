import React from "react"

import './tag.css';

export default class Tag extends React.Component{
    render(){

        
        return(<p className = "tag">{this.props.name}</p>);
    }
}