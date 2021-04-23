import logo from './logo.svg';
import './App.css';
import Loader from "react-loader-spinner";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import React, { useState, useEffect } from "react";


function App() {

  const [isLoading, setIsLoading] = useState(true),
    [data, setData] = useState([]),
    [dataToShow, setDataToShow] = useState([]);


  const listItems = dataToShow.map((dataToShow) =>
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title> {dataToShow.title}</Card.Title>

          <p>{dataToShow.completed ? <p>Completada </p> : <p>Pendiente </p>}</p>
          <Button variant="primary">Habilitar</Button>
        </Card.Body>
      </Card>

    </div>
  );

  useEffect(() => {
    // fetch("https://randomuser.me/api").then(response => {
    fetch("https://embed.cartfulsolutions.com/prodtest/todos3.json").then(response => {
      console.log("response:", response);
      console.log("response.body:", response.body);

      response.json().then(dataResponse => {
        console.log("dataResponse:", dataResponse);
        setData(dataResponse);
        setDataToShow(dataResponse);
      })

      console.log("Funciono el fetch.");
      setIsLoading(false);

    }).catch(error => {

      console.log("Un error.")
    })
  }, []);

  const filtrarPending = () => {
    console.log("filtrarPending()");
    const dataToFilter = data;
    let pendingData = dataToFilter.filter(function (data) {
      //console.log("data:", data);
      return data.completed === false;
    });

    //console.log("pendingData:", pendingData);
    setDataToShow(pendingData)
  }

  const filtrarCompletadas = () => {
    console.log("filtrarCompletadas()");
    const dataToFilter = data;
    let pendingData = dataToFilter.filter(function (data) {
      //console.log("data:", data);
      return data.completed === true;
    });

    console.log("pendingData:", pendingData);
    setDataToShow(pendingData)
  }

  console.log("isLoading:", isLoading);
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        {isLoading ?
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />

          : <React.Fragment>
            {/* 
            data.map((number) =>
                <li>{number}</li> */}
            {/* <Container style="width: 500px">
              <Row>
                <Col>Pending</Col>
                <Col>All</Col>
                <Col>Completed</Col>
              </Row>
            </Container> */}

            {/* <Container>
              <Row>
                <Col>Pending</Col>
                <Col>All</Col>
                <Col>Completed</Col>
              </Row>
            </Container> */}

            <Button onClick={filtrarPending} variant="contained">Pending</Button>
            <Button onClick={filtrarCompletadas} variant="contained" color="primary">
              Completadas
      </Button>

            <ul>{listItems}</ul>
          </React.Fragment>}

      </header>
    </div >
  );
}

export default App;
