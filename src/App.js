import React, { useState } from 'react';
import WorldTime from './components/WorldTime/WorldTime';
import CRUD from './components/CRUD/CRUD';
import Chat from './components/Chat/Chat';
import { nanoid } from 'nanoid';

import './App.css';


function App() {
  const [app, setApp] = useState(<WorldTime />);
  const [currentClass, setCurrentClass] = useState("world-time");
  const apps = [
    {
      name: "world-time",
      component: <WorldTime />
    },
    {
      name: "crud",
      component: <CRUD />
    },
    {
      name: "chat",
      component: <Chat />
    }
  ]

  const handleClick = e => {
    const curApp = apps.find(item => item.name === e.target.className);
    setApp(curApp.component);
    setCurrentClass(curApp.name);
  }
  
  return (
    <div>
      <header className="header_main">
        <button className='world-time' onClick={handleClick}>Задание №1(Часы)</button>
        <button className='crud' onClick={handleClick}>Задание №2(CRUD)</button>
        <button className="chat" onClick={handleClick}>Задание №3(Чат)</button>
      </header>
      <div className={"app_" + currentClass}>{app}</div>
    </div>
  );
}

export default App;
