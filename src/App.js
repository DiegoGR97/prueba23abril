import './App.css';
import Loader from "react-loader-spinner";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { makeStyles } from "@material-ui/core/styles";

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

  const useStyles = makeStyles((theme) => ({
    list: {
      paddingLeft: 0,
      paddingBottom: "3em",
      width: "500px"
    },
    buttonNav: {
      position: "relative",
      minWidth: "20%",
      minHeight: "3em"
    },
    toDoList: {
      position: "absolute",
      top: "5%",
      left: "0px",
      width: "500px",
      height: "405px",
      right: "0px",
      margin: "0px auto",
    }
  }));

  const classes = useStyles();


  const listItems = dataToShow.map((dataToShow) =>
    <div key={dataToShow.id}>
      <Card style={{
        width: '100%', marginBottom: '1em', backgroundColor: "#4E4E4E"
      }}>
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
      <div>
        {isLoading ?
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />

          : <React.Fragment>

            <div className={classes.toDoList}>
              <h1>To-Do List para Cartful Solutions</h1>
              <div>
                <Button className={classes.buttonNav} onClick={filtrarPending} variant="contained">Pending</Button>
                <Button className={classes.buttonNav} onClick={filtrarCompletadas} variant="contained" color="primary"> Completadas </Button>
                <Button className={classes.buttonNav} onClick={filtrarTodas} variant="contained">Todas</Button>
              </div>

              <div>
                <ul className={classes.list}>{listItems}</ul>
              </div>
            </div>

          </React.Fragment>}

      </div>
    </div >
  );
}

export default App;
