import './App.css';
import Loader from "react-loader-spinner";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';

import { useStyles } from "./styles";


// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

import React, { useState, useEffect } from "react";


function App() {

  const [isLoading, setIsLoading] = useState(true),
    [data, setData] = useState([]),
    [dataShowing, setDataShowing] = useState("TODAS"),
    [dataToShow, setDataToShow] = useState([]),
    [newTask, setNewTask] = useState("");


  const classes = useStyles();



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
  const buscarTarea = (event) => {
    const dataToFilter = data;
    let filteredData = dataToFilter.filter(function (data) {
      return data.title.includes(event.target.value);
    });
    console.log(filteredData);
    //setDataShowing("COMPLETADAS");
    setDataToShow(filteredData)
  }

  const handleSubmit = () => {

    if (newTask != "") {
      let newTasks = data;
      let taskIDs = [];

      newTasks.forEach(task => {
        taskIDs.push(task.id);
      }
      );

      let max = Math.max(...taskIDs);
      let newTaskObject = {
        id: (max + 1),
        title: newTask,
        completed: false
      }
      newTasks.push(newTaskObject);

      setData(newTasks);
      setDataToShow([...newTasks]);
      setNewTask("");
    }
  };

  const listItems = dataToShow.map((dataToShow) =>
    <div key={dataToShow.id}>
      <Card style={{
        width: '100%', marginBottom: '1em', backgroundColor: "#4E4E4E"
      }}>
        <Card.Body>
          <Card.Title> {dataToShow.title}</Card.Title>
          {dataToShow.completed ? <p style={{ color: "green" }}>Completada</p> : <p style={{ color: "#F77171", fontStyle: "bold" }}>Pendiente</p>}
          <Button onClick={() => cambiarStatus(dataToShow.id)} variant="primary">{dataToShow.completed ? "Marcar como Pendiente" : "Marcar como Completada"}</Button>
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

              <div className={classes.addTaskDiv} >
                <TextField className={classes.addTaskText} id="outlined-basic" type="text" name='newTask' value={newTask} label="Agregar Tarea"
                  variant="filled" onChange={(e) => setNewTask(e.target.value)} InputProps={{ className: classes.multilineColor }} />
                <button className={classes.buttonNav} onClick={handleSubmit}>Agregar Tarea</button>
              </div>

              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Buscar tareas..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(event) => buscarTarea(event)} />
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
