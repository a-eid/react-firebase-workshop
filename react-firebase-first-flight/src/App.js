import React, { Component } from "react";
import { database } from "./firebase";
import "./App.css";

class App extends Component {
  state = {
    data: null,
    valueOne: "",
    loading: true 
  };

  handleSubmit = e => {
    e.preventDefault();
    if(!this.state.valueOne){
      this.setState({error: " supply a value 'key/value' "})
      return; 
    }

    this.setState({error: null })
    const [ key, value ] = this.state.valueOne.split("/");

    database
      .ref(`/${key}`)
      .set( value.trim().toLocaleLowerCase() != "null" ? value.trim() : null   );

    this.setState({ valueOne: "" });
    document.getElementById("valueOne").focus();
  };

  handleInputChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  componentDidMount() {
    database.ref().on("value", snapshot => {
      this.setState({
        data: snapshot.val(),
        loading: false 
      } , () => {
        document.getElementById("valueOne").focus();
      });
    });
    
  }

  loading = () => (
    <div>
      <span>...loading...</span>
    </div>
  )

  render() {
    if(this.state.loading)
      return this.loading()
    return (
      <div className="App">
        <div className="App--header">
          <h2>Welcome to React and Firebase</h2>
        </div>
        <div className="form-container">
          <form className="form" onSubmit={this.handleSubmit} autoComplete="off" >
            <input
              id="valueOne"
              value={this.state.valueOne}
              onChange={this.handleInputChange}
              type="text"
            />
            { this.state.error && <pre>{ this.state.error }</pre> } 
            <input type="submit" />
          </form>
        </div>
        <pre className="App--data">
          {JSON.stringify(this.state.data, null, 2)}
        </pre>
      </div>
    );
  }
}

export default App;
