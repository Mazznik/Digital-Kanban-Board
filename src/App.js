import React, { useState } from 'react';
import './App.css';

const MAX_SQUARES_PER_COLUMN = 4;

function App() {
  const [ideja, setIdeja] = useState([]);
  const [plan, setPlan] = useState([]);
  const [izrada, setIzrada] = useState([]);
  const [test, setTest] = useState([]);
  const [integriran, setIntegriran] = useState([]);
  const [gotov, setGotov] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [moveDates, setMoveDates] = useState({});
  const [naslov, setNaslov] = useState("")
  const [opis, setOpis] = useState("")

  const handleDeleteItem = (index) => {
      setIdeja(ideja.filter((_, i) => i !== index));
  };

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
    if (ideja.length < MAX_SQUARES_PER_COLUMN) {
      setIdeja([...ideja, { naslov: naslov, opis: opis, color: pickedColor }]);
    } else {
      alert("Dosegnut maksimalan broj elemenata.");
    }
    setShowInput(false);
    setNaslov("")
    setOpis("")
    pickedColor = null
    alert(JSON.stringify(ideja))
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

  if (column === "ideja" && targetColumn === "plan") {
    const deadlineInput = prompt("Unesite deadline (YYYY-MM-DD format):");
    
    if (deadlineInput && validateDateFormat(deadlineInput)) {
      const newPlanItem = { ...ideja[index], deadline: deadlineInput };
      setPlan([...plan, newPlanItem]);
      setIdeja(ideja.filter((_, i) => i !== index));
    } else {
      alert("Neispravan format datuma. Molimo unesite u formatu YYYY-MM-DD.");
    }
    return;
  }

  if (column === "ideja" && targetColumn === "izrada") {
    alert("You can't drag to Izrada")
    return; 
  }

  if (column === "ideja" && targetColumn === "test") {
    alert("You can't drag to Test")
    return; 
  }

  if (column === "ideja" && targetColumn === "integriran") {
    alert("You can't drag to Integriran")
    return; 
  }

  if (column === "ideja" && targetColumn === "gotov") {
    alert("You can't drag to Gotov")
    return; 
  }

  if (column === "plan" && targetColumn === "ideja") {
    alert("You can't return to Ideja")
    return; 
  }

  if (column === "plan" && targetColumn === "test") {
    alert("You can't drag to Test")
    return; 
  }

  if (column === "plan" && targetColumn === "integriran") {
    alert("You can't drag to Integriran")
    return; 
  }

  if (column === "plan" && targetColumn === "gotov") {
    alert("You can't drag to Gotov")
    return; 
  }

  if (column === "izrada" && targetColumn === "ideja") {
    alert("You can't drag to Ideja")
    return; 
  }

  if (column === "izrada" && targetColumn === "plan") {
    alert("You can't drag to Plan")
    return; 
  }

  if (column === "izrada" && targetColumn === "integriran") {
    alert("You can't drag to Integriran")
    return; 
  }

  if (column === "izrada" && targetColumn === "gotov") {
    alert("You can't drag to Gotov")
    return; 
  }

  if (column === "test" && targetColumn === "ideja") {
    alert("You can't drag to Ideja")
    return; 
  }

  if (column === "test" && targetColumn === "plan") {
    alert("You can't drag to Plan")
    return; 
  }

  if (column === "test" && targetColumn === "izrada") {
    alert("You can't drag to Izrada")
    return; 
  }

  if (column === "test" && targetColumn === "gotov") {
    alert("You can't drag to Gotov")
    return; 
  }

  if (column === "integriran" && targetColumn === "ideja") {
    alert("You can't drag to Ideja")
    return; 
  }

  if (column === "integriran" && targetColumn === "plan") {
    alert("You can't drag to Plan")
    return; 
  }

  if (column === "integriran" && targetColumn === "izrada") {
    alert("You can't drag to Izrada")
    return; 
  }

  if (column === "integriran" && targetColumn === "test") {
    alert("You can't drag to Test")
    return; 
  }

  if (column === "gotov" && targetColumn === "ideja") {
    alert("You can't drag to Ideja")
    return; 
  }

  if (column === "gotov" && targetColumn === "plan") {
    alert("You can't drag to Plan")
    return; 
  }

  if (column === "gotov" && targetColumn === "izrada") {
    alert("You can't drag to Izrada")
    return; 
  }

  if (column === "gotov" && targetColumn === "test") {
    alert("You can't drag to Test")
    return; 
  }

  if (column === "gotov" && targetColumn === "integriran") {
    alert("You can't drag to Integriran")
    return; 
  }

  // Provjerite je li broj kvadrata u odredišnom stupcu manji od maksimalnog dopuštenog
  const numSquaresInTargetColumn =
    targetColumn === "ideja"
      ? ideja.length
      : targetColumn === "plan"
      ? plan.length
      : targetColumn === "izrada"
      ? izrada.length
      : targetColumn === "test"
      ? test.length
      : targetColumn === "integriran"
      ? integriran.length
      : gotov.length

  if (numSquaresInTargetColumn < MAX_SQUARES_PER_COLUMN) {
    // Provjera je li stupac odredišta isti kao i stupac izvora
    if (column !== targetColumn) {

      switch (column) {
        case "ideja":
          const draggedIdeja = ideja[index];
          setIdeja(ideja.filter((_, i) => i !== index));
          switch (targetColumn) {
            case "izrada":
              setIzrada([...izrada, draggedIdeja]);
              break;
            default:
              break;
          }
          break;

        case "plan":
          const draggedPlan = plan[index];
          setPlan(plan.filter((_, i) => i !== index));
          switch (targetColumn) {
            case "izrada":
              setIzrada([...izrada, draggedPlan]);
              break;
            case "test":
              setTest([...test, draggedPlan])
              break;
            default:
              break;
          }
          break;

        case "izrada":
          const draggedIzrada = izrada[index];
          setIzrada(izrada.filter((_, i) => i !== index));
          switch (targetColumn) {
            case "test":
              setTest([...test, draggedIzrada])
              break;
            default:
              break;
          }
          break;

        case "test":
          const draggedTest = test[index];
          setTest(test.filter((_, i) => i !== index));
          switch (targetColumn) {
            case "integriran":
              setIntegriran([...integriran, draggedTest])
              break;
            default:
              break;
          }
          break;

        case "integriran":
          const draggedIntegriran = integriran[index];
          setIntegriran(integriran.filter((_, i) => i !== index));
          switch (targetColumn) {
            case "gotov":
              setGotov([...gotov, draggedIntegriran])
              break;
            default:
              break;
          }
          break;

        case "gotov":
          const draggedGotov = gotov[index];
          setGotov(gotov.filter((_, i) => i !== index));
          switch (targetColumn) {
            case "gotov":
              setGotov([...gotov, draggedGotov])
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
    alert("Dosegnut maksimalan broj elemenata.");
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
        <h2>Ideja</h2>
        <div className='ideja'
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event, "ideja")}>
          <button id="button-plus" onClick={handleButtonClick}>+</button>
          
          {showInput && (
            <div className='modal'>
              <div className='modal-content'>
                <div>
                  <label htmlFor="naslov" id='inputLabel'>Naslov: </label>
                  <input
                  id='naslov'
                  type='text'
                  value={naslov}
                  onChange={e => setNaslov(e.target.value)}
                  style={{ border: "solid black 2px", width: "400px", height: "30px", marginBottom: "30px" }}/>
                </div>

                <div>
                  <label htmlFor="opis" id='inputLabel'>Opis: </label>
                  <textarea
                  id='opis'
                  type = "text"
                  value={opis}
                  onChange={e => setOpis(e.target.value)}
                  style={{ border: "solid black 2px", width: "400px", height: "200px", marginBottom: "30px" }}/>
                </div>

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

            {ideja.map((item, index) => (
                <div
                  id='list'
                  key={index}
                  draggable
                  onDragStart={(event) => handleDragStart(event, "ideja", index)}
                  style={{ backgroundColor: ideja[index].color }}>
                    <div id='naslov-zadatka'>
                    {item.naslov}
                    </div>
                <button onClick={() => handleDeleteItem(index)} style={{ position: 'absolute', bottom: 3, right: 3, border: "solid black 3px"}}>X</button>
              </div>
          ))}
        </div>
      </div>

      <div className='column'>
        <h2>Plan</h2>
        <div className='plan'
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event, "plan")}>
          {plan.map((item, index) => (
            <div
              id='list'
              key={index}
              draggable
              onDragStart={(event) => handleDragStart(event, "plan", index)}
              style={{ backgroundColor: plan[index].color, border: isTodayDeadline(item.deadline) ? "2px solid red" : "2px solid black" }}>

                <div id='naslov-zadatka'>
                  {item.naslov}
                </div>
               
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
        <h2>Izrada</h2>
        <div className='izrada'
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event, "izrada")}>
          {izrada.map((item, index) => (
            <div
              id='list'
              key={index}
              draggable
              onDragStart={(event) => handleDragStart(event, "izrada", index)}
              style={{ backgroundColor: izrada[index].color }}>
                <div id='naslov-zadatka'>
                  {item.naslov}
                </div>
            </div>
          ))}
        </div>
      </div>

      <div className='column'>
        <h2>Test</h2>
        <div className='test'
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event, "test")}>
          {test.map((item, index) => (
            <div
              id='list'
              key={index}
              draggable
              onDragStart={(event) => handleDragStart(event, "test", index)}
              style={{ backgroundColor: test[index].color }}>
                <div id='naslov-zadatka'>
                  {item.naslov}
                </div>
              </div>
          ))}
        </div>
      </div>

      <div className='column'>
        <h2>Integriran</h2>
        <div className='integriran'
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event, "integriran")}>
          {integriran.map((item, index) => (
            <div
              id='list'
              key={index}
              draggable
              onDragStart={(event) => handleDragStart(event, "integriran", index)}
              style={{ backgroundColor: integriran[index].color }}>
                <div id='naslov-zadatka'>
                  {item.naslov}
                </div>
              </div>
          ))}
        </div>
      </div>

      <div className='column'>
        <h2>Gotov</h2>
        <div className='gotov'
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event, "gotov")}>
          {gotov.map((_, index) => (
            <div
              id='list'
              key={index}
              draggable
              onDragStart={(event) => handleDragStart(event, "gotov", index)}
              style={{ backgroundColor: gotov[index].color }}
            />
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default App;