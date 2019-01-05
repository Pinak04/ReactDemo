import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons:[
      {'name':'Pinak', age: 26},
      {'name':'Piu', age: 60},
      {'name':'Probhas', age: 65}
    ],
    elegantPersons:[
      {'id':1,'name':'Pinak', age: 26},
      {'id':2,'name':'Piu', age: 60},
      {'id':3,'name':'Probhas', age: 65}
    ],
    showPersons : false,
    showElegantPerson: false
  };
  
  changeHandler = (name) => {
    this.setState({
      persons:[
        {'name': name, age: 26},
        {'name':'Piu Sarkar', age: 60},
        {'name':'Probhas Sarkar', age: 65}
        ]
      }
    );
  };

  textChangeHandler = (event , id) => {
    const personIndex = this.state.elegantPersons.findIndex(p => {
      return p.id === id;
    });
    console.log(personIndex);
    const person = {
      ...this.state.elegantPersons[personIndex]
    }
    person.name = event.target.value;

    const persons = [...this.state.elegantPersons];
    persons[personIndex] = person;

    this.setState({
      elegantPersons: persons
    })
  }

  togglePersonHandler = () => {
    const doShow = this.state.showPersons;
    this.setState({
      showPersons: !doShow
    });
  }

  elegantToggleHandler = () => {
    const doShow = this.state.showElegantPerson;
    this.setState({
      showElegantPerson: !doShow
    });
  }

  deleteElegantPerson = (index) => {
    const personsCopy = [...this.state.elegantPersons];
    personsCopy.splice(index,1);
    this.setState({
      elegantPersons: personsCopy
    });
  }

  render() {
    const buttonStyle = {
      backgroundColor: 'red',
      fontSize: '16px',
      padding: '10px',
      cursor: 'pointer',
      border: '1px solid blue',
      color: 'white',
      ':hover':{
        backgroundColor : 'salmon',
        color: 'black'
      }
    }
    let persons = (<p>No Elegant Person To Show</p>);
    if(this.state.showElegantPerson){
      persons = this.state.elegantPersons.map((person,index) => {
      return <Person name={person.name} age={person.age} key={person.id} remove={this.deleteElegantPerson.bind(this,index)}
        changename={(event) => this.textChangeHandler(event,person.id)}
      />
      });
      buttonStyle.backgroundColor = 'green';
      buttonStyle.color = 'black';
      buttonStyle[":hover"] = {
        backgroundColor: 'lightgreen',
        color: 'white'
      }
    }
    let classes = [];
    if(this.state.elegantPersons.length >=2){
      classes.push('bold');
    }
    if(this.state.elegantPersons.length >=1){
      classes.push('red');
    }
    classes.join(' ');
    return (
      <StyleRoot>
        <div className="App">
          <p>It Works !! I am React</p>
          <p>
            <button type="button" className={classes} onClick={this.changeHandler.bind(this,'MAxi !!!')}> I change stuff !!</button>
          </p>
          <p>
            <button type="button" onClick={this.togglePersonHandler}>Toggler</button>
          </p>
          <p>
            <button style={buttonStyle} type="button" onClick={this.elegantToggleHandler} >Elegant Toggler</button>
          </p>
          { (this.state.showPersons) ?
            <div>
              <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
              <Person name={this.state.persons[1].name} age={this.state.persons[1].age} />
              <Person name={this.state.persons[2].name} age={this.state.persons[2].age} />
            </div>
            : 
            <p>Click Toggler to Reveal</p>
          }
          {persons}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
