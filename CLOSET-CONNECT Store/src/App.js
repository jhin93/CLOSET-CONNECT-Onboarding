import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";

function App() {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = () => {
    axios.get('https://closet-recruiting-api.azurewebsites.net/api/data')
      .then((response) => {
        // 요청이 성공하면 데이터를 상태에 저장합니다.
        console.log("response.data : ", response.data)
        setDataList(response.data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        // 요청이 실패하면 에러를 상태에 저장합니다.
        setDataList([]);
        setLoading(false);
        setError('Error fetching data.');
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <div>
          <h2>Data List</h2>
          <ul>
            {dataList.map((item) => (
              <li>{item.title}</li>
            ))}
          </ul>
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
