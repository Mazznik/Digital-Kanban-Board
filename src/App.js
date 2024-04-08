import React, { useState } from 'react';
import './App.css';

const MAX_SQUARES_PER_COLUMN = 10;

function App() {
  const [toDos, setToDos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [moveDates, setMoveDates] = useState({});

  const validateDateFormat = (dateString) => {
    // Provjera formata (YYYY-MM-DD)
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  const isTodayDeadline = (deadline) => {
    const today = new Date().toISOString().split('T')[0];
    return today === deadline;
  };

  const handleReturnButton = () => {
    setShowInput(false)
  }
 
  const handleButtonClick = () => {
    setShowInput(true);
  };

  const handleInputSubmit = (pickedColor) => {
    if (toDos.length < MAX_SQUARES_PER_COLUMN) {
      setToDos([...toDos, { color: pickedColor }]);
    } else {
      alert("Stupac To Do je već popunjen");
    }
    setShowInput(false);
    pickedColor = null
  };

  const handleDragStart = (event, column, index) => {
    event.dataTransfer.setData("text/plain", JSON.stringify({ column, index }));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

const handleDrop = (event, targetColumn) => {
  event.preventDefault();
  const data = JSON.parse(event.dataTransfer.getData("text/plain"));
  const { column, index } = data;

  if (column === "inProgress" && targetColumn === "toDos") {
    alert("You can't return to To Do")
    return; 
  }

  if (column === "toDos" && targetColumn === "done") {
    alert("You can't drag to Done")
    return; 
  }

  if (column === "done" && targetColumn === "toDos") {
    alert("You can't drag to To Do")
    return; 
  }

  if (column === "done" && targetColumn === "inProgress") {
    alert("You can't drag to In Progress")
    return; 
  }

  if (column === "toDos" && targetColumn === "inProgress") {
    const deadlineInput = prompt("Unesite deadline (YYYY-MM-DD format):");
    
    if (deadlineInput && validateDateFormat(deadlineInput)) {
      const newInProgressItem = { ...toDos[index], deadline: deadlineInput };
      setInProgress([...inProgress, newInProgressItem]);
      setToDos(toDos.filter((_, i) => i !== index));
    } else {
      alert("Neispravan format datuma. Molimo unesite u formatu YYYY-MM-DD.");
    }
    return;
  }

  // Provjerite je li broj kvadrata u odredišnom stupcu manji od maksimalnog dopuštenog
  const numSquaresInTargetColumn =
    targetColumn === "toDos"
      ? toDos.length
      : targetColumn === "inProgress"
      ? inProgress.length
      : done.length;

  if (numSquaresInTargetColumn < MAX_SQUARES_PER_COLUMN) {
    // Provjera je li stupac odredišta isti kao i stupac izvora
    if (column !== targetColumn) {

      switch (column) {
        case "toDos":
          const draggedToDo = toDos[index];
          setToDos(toDos.filter((_, i) => i !== index));
          switch (targetColumn) {
            case "done":
              setDone([...done, draggedToDo]);
              break;
            default:
              break;
          }
          break;

        case "inProgress":
          const draggedInProgress = inProgress[index];
          setInProgress(inProgress.filter((_, i) => i !== index));
          switch (targetColumn) {
            case "done":
              setDone([...done, draggedInProgress]);
              break;
            default:
              break;
          }
          break;
        case "done":
          const draggedDone = done[index];
          setDone(done.filter((_, i) => i !== index));
          switch (targetColumn) {
            case "toDos":
              setToDos([...toDos, draggedDone]);
              break;
            case "inProgress":
              setInProgress([...inProgress, draggedDone]);
              break;
            case "done":
              setDone([...done, draggedDone]);
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    }
  } else {
    alert("Stupac je već popunjen");
  }
};

const isTaskTooLongInPhase = (column, moveDate) => {
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  const daysTooLongInPhase = Math.round((today - moveDate) / oneDay);

  alert(daysTooLongInPhase + "---" + moveDate + "-----" + today)

  if (column === "inProgress" && daysTooLongInPhase >= 1) {
    return true;
  } else if (column === "done" && daysTooLongInPhase > 7) {
    return true;
  }
  return false;
};

  return (
    <div className='app'>
      <div className='column'>
        <h2>To Do</h2>
        <div className='toDo'
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event, "toDos")}>
          <button id="button-plus" onClick={handleButtonClick}>+</button>
          {showInput && (
            <div className='modal'>
              <div className='modal-content'>
              <div>
                <button className = "colorButton" onClick={() => handleInputSubmit("purple")} style={{ backgroundColor: 'purple' }}>PURPLE</button>
                <button className = "colorButton" onClick={() => handleInputSubmit("blue")} style={{ backgroundColor: 'blue' }}>BLUE</button>
                <button className = "colorButton" onClick={() => handleInputSubmit("green")} style={{ backgroundColor: 'green' }}>GREEN</button>
                {/* Dodajemo gumbove za odabir boje */}
              </div>
                <button id="returnButton" onClick={handleReturnButton}>Return</button>
              </div>
            </div>
          )}
          {toDos.map((_, index) => (
            <div
              id='list'
              key={index}
              draggable
              onDragStart={(event) => handleDragStart(event, "toDos", index)}
              style={{ marginTop: 30, marginLeft: 10, marginBottom: 1, backgroundColor: toDos[index].color, width: '50px', height: '50px', cursor: "pointer"}}
            />
          ))}
        </div>
      </div>

      <div className='column'>
        <h2>In Progress</h2>
        <div className='inProgress'
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event, "inProgress")}>
          {inProgress.map((item, index) => (
            <div
              id='list'
              key={index}
              draggable
              onDragStart={(event) => handleDragStart(event, "inProgress", index)}
              style={{ marginTop: 30, marginLeft: 10, marginBottom: 1, backgroundColor: inProgress[index].color, width: '50px', height: '50px', cursor: "pointer", position: "relative" }}>
               
              {isTodayDeadline(item.deadline) && (
                <div className="warning-sign" title={`Deadline: last day (${item.deadline})`}/>
              )}

              {/*{isTaskTooLongInPhase("inProgress", moveDates[item.date]) && (
                <div className="tooLong-sign" title='Predugo u fazi!'/>
              )} */}

              </div>
          ))}
          </div>
      </div>

      <div className='column'>
        <h2>Done</h2>
        <div className='done'
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event, "done")}>
          {done.map((_, index) => (
            <div
              id='list'
              key={index}
              draggable
              onDragStart={(event) => handleDragStart(event, "done", index)}
              style={{ marginTop: 30, marginLeft: 10, marginBottom: 1, backgroundColor: done[index].color, width: '50px', height: '50px', cursor: "pointer" }}
            />
          ))}
        </div>
      </div>

      <div className='column'>
        <h2>Done</h2>
        <div className='done'
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event, "done")}>
          {done.map((_, index) => (
            <div
              id='list'
              key={index}
              draggable
              onDragStart={(event) => handleDragStart(event, "done", index)}
              style={{ marginTop: 30, marginLeft: 10, marginBottom: 1, backgroundColor: done[index].color, width: '50px', height: '50px', cursor: "pointer" }}
            />
          ))}
        </div>
      </div>

      <div className='column'>
        <h2>Done</h2>
        <div className='done'
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event, "done")}>
          {done.map((_, index) => (
            <div
              id='list'
              key={index}
              draggable
              onDragStart={(event) => handleDragStart(event, "done", index)}
              style={{ marginTop: 30, marginLeft: 10, marginBottom: 1, backgroundColor: done[index].color, width: '50px', height: '50px', cursor: "pointer" }}
            />
          ))}
        </div>
      </div>

      <div className='column'>
        <h2>Done</h2>
        <div className='done'
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event, "done")}>
          {done.map((_, index) => (
            <div
              id='list'
              key={index}
              draggable
              onDragStart={(event) => handleDragStart(event, "done", index)}
              style={{ marginTop: 30, marginLeft: 10, marginBottom: 1, backgroundColor: done[index].color, width: '50px', height: '50px', cursor: "pointer" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;