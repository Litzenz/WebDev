import React from 'react';
import Greeting from './greeting';
import BusinessCard from './business-card';
import ToDoList from './to-do-list';
import Counter from './counter';
import Square from './square';
import Flower from './flower';

const App = () =>
  <div>
    <Greeting firstName="Ash" lastName="Ketchum" />
    <BusinessCard name="Ash Ketchum" email="ash@silphco.biz" />
    {/* {["a", "b", "c"].map((item, index) => <p key={index}>{item}</p>)} */}
    <p>Empty to-do list:</p>
    <ToDoList />
    <p className="important">To-do list with items:</p>
    <ToDoList items={["Finish lecture", "Do homework", "Sleep"]} />
    <p>Counter:</p>
    <Counter />
    <Square width="200px" height="100px" backgroundColor="red" />
    <Flower />
  </div>

export default App;