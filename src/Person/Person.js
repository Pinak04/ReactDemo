import React from 'react';
import './Person.css';

const person = (props) => {
    return (
        <div className="Person">
            <p>I am a person and my name is :- {props.name}</p>
            <p>My age is :- {props.age}</p>
            <label>I will change stuff</label>
            <input type="text" placeholder="type and see awesomeness" onChange={props.changename}></input>
            <button type="button" onClick={props.remove}>Delete</button>
        </div>
    );
}

export default person;