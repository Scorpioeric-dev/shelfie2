import React,{Component} from 'react';
import Dashboard from './components/Dashboard/Dashboard'
import Form from './components/Form/Form'
import Header from './components/Header/Header'


import './App.css';

class App extends Component {
  state = {
    name:'',
    price:'',
    img:'',
    products:[]
  }
  render(){
    
    return (
      <div className="App">
        <Dashboard/>
        <Header/>
        <Form/>
        
      </div>
    );
  }
}

export default App;
