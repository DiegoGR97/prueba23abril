import './App.css';
import Loader from "react-loader-spinner";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

import React, { useState, useEffect } from "react";


function App() {

  const [isLoading, setIsLoading] = useState(true),
    [data, setData] = useState([]),
    [dataShowing, setDataShowing] = useState("TODAS"),
    [dataToShow, setDataToShow] = useState([]);


  useEffect(() => {
    fetch("https://embed.cartfulsolutions.com/prodtest/todos3.json").then(response => {

      response.json().then(dataResponse => {
        setData(dataResponse);
        setDataToShow(dataResponse);
      })

      setIsLoading(false);

    }).catch(error => {

      console.log("Un error.")
    })
  }, []);

  const filtrarPending = () => {
    const dataToFilter = data;
    let pendingData = dataToFilter.filter(function (data) {
      return data.completed === false;
    });
    setDataShowing("PENDIENTES");
    setDataToShow(pendingData)
  }

  const filtrarCompletadas = () => {
    const dataToFilter = data;
    let pendingData = dataToFilter.filter(function (data) {
      return data.completed === true;
    });
    setDataShowing("COMPLETADAS");
    setDataToShow(pendingData)
  }

  const filtrarTodas = () => {
    setDataShowing("TODAS");
    setDataToShow(data)
  }

  const cambiarStatus = (id) => {


    let dataToLoop = data;

    dataToLoop.forEach(dataelement => {
      if (dataelement.id === id) {
        if (dataelement.completed === true) {
          dataelement.completed = false
        }
        else {
          dataelement.completed = true
        }

      }
    });
    let newDataToShow = dataToLoop;

    if (dataShowing === "TODAS") {
      setDataToShow([...newDataToShow]);
    }
    else if (dataShowing === "PENDIENTES") {
      filtrarPending();
    }
    else if (dataShowing === "COMPLETADAS") {
      filtrarCompletadas();
    }

  }

  const listItems = dataToShow.map((dataToShow) =>
    <div key={dataToShow.id}>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title> {dataToShow.title}</Card.Title>

          <p>{dataToShow.completed ? "Completada" : "Pendiente"}</p>
          <Button onClick={() => cambiarStatus(dataToShow.id)} variant="primary">Habilitar/Deshabilitar</Button>
        </Card.Body>
      </Card>

    </div>
  );

  return (
    <div className="App">
      <header className="App-header">

        {isLoading ?
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />

          : <React.Fragment>


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
            <Button onClick={filtrarTodas} variant="contained">Todas</Button>


            <ul>{listItems}</ul>
          </React.Fragment>}

      </header>
    </div >
  );
}

export default App;
