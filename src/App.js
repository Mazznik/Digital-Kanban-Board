import React, { useState, useEffect } from 'react';
import './App.css';
import { collection, addDoc, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase'; // Pretpostavljam da ste već konfigurirali vezu s Firestore-om u firebase.js datoteci


const MAX_SQUARES_PER_COLUMN = 4;

function App() {
  const [ideja, setIdeja] = useState([]);
  const [plan, setPlan] = useState([]);
  const [izrada, setIzrada] = useState([]);
  const [test, setTest] = useState([]);
  const [integriran, setIntegriran] = useState([]);
  const [gotov, setGotov] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [naslov, setNaslov] = useState("")
  const [opis, setOpis] = useState("")

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idejaCollection = collection(db, 'ideja');
        const idejaSnapshot = await getDocs(idejaCollection);
        const idejaData = idejaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setIdeja(idejaData);
        setIsLoading(false);
      } catch (error) {
        console.error('Greška prilikom dohvaćanja ideja iz baze podataka:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteItem = async (id, index) => {
    try {
      // Izbrisati dokument iz baze podataka
      await deleteDoc(doc(db, 'ideja', id));

      // Ažurirati lokalno stanje ideja
      setIdeja(ideja.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Greška prilikom brisanja dokumenta iz baze podataka:', error);
    }
  };

  const handleReturnButton = () => {
    setShowInput(false)
  }
 
  const handleButtonClick = () => {
    setShowInput(true);
  };

  const handleInputSubmit = async (pickedColor, role) => {
    if (isLoading) return;

    if (ideja.length < MAX_SQUARES_PER_COLUMN) {
      const newIdeja = { naslov: naslov, opis: opis, color: pickedColor, role: role };
      try {
        const docRef = await addDoc(collection(db, 'ideja'), newIdeja);
        alert('Dokument je uspješno dodan:' + docRef.id);

        // Dodajte novu ideju u lokalno stanje ideja
        setIdeja([...ideja, { id: docRef.id, ...newIdeja }]);
      } catch (error) {
        console.error('Greška prilikom dodavanja dokumenta:', error);
        alert('Greška prilikom spremanja ideje u bazu podataka.');
      }
    } else {
      alert("Dosegnut maksimalan broj elemenata.");
    }
    setShowInput(false);
    setNaslov("");
    setOpis("");
    pickedColor = null;
    alert(JSON.stringify(ideja));
  };

  const handleDragStart = (event, column, index) => {
    event.dataTransfer.setData("text/plain", JSON.stringify({ column, index }));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

const handleDrop = async(event, targetColumn) => {
  event.preventDefault();
  const data = JSON.parse(event.dataTransfer.getData("text/plain"));
  const { column, index } = data;

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
          alert(draggedIdeja.id)
          try {
            // Brišemo objekt iz kolekcije "ideja"
            await deleteDoc(doc(db, "ideja", draggedIdeja.id));
            console.log("Dokument uspješno obrisan iz kolekcije 'ideja'.");
          } catch (error) {
            console.error("Greška prilikom brisanja dokumenta iz kolekcije 'ideja':", error);
          }
          setIdeja(ideja.filter((_, i) => i !== index));
          switch (targetColumn) {
            case "plan":
              const moveDatePlan = new Date();
              try {
                // Dodajemo objekt u kolekciju "plan"
                const docRef = await addDoc(collection(db, "plan"), { ...draggedIdeja, moveDatePlan });
                console.log("Dokument uspješno dodan u kolekciju 'plan' s ID:", docRef.id);
              } catch (error) {
                console.error("Greška prilikom dodavanja dokumenta u kolekciju 'plan':", error);
              }
              setPlan([...plan, { ...draggedIdeja, moveDatePlan }]);
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
              const moveDateIzrada = new Date()
              setIzrada([...izrada, { ...draggedPlan, moveDateIzrada: moveDateIzrada }]);
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
              const moveDateTest = new Date()
              setTest([...test, { ...draggedIzrada, moveDateTest: moveDateTest }])
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
              const moveDateIntegriran = new Date()
              setIntegriran([...integriran, { ...draggedTest, moveDateIntegriran: moveDateIntegriran }])
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
              const moveDateGotov = new Date()
              setGotov([...gotov, { ...draggedIntegriran, moveDateGotov: moveDateGotov}])
              alert(JSON.stringify(gotov) + "\n")
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

const isTaskTooLongInPhase = (dateMoved) => {
  const currentDate = new Date()
  
  const timeDifference = currentDate.getTime() - dateMoved.getTime()

  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  if(daysDifference > 2)
    return "4px red"
  else if(daysDifference > 1)
    return "4px yellow"  
  else
    return "2px black"
}

  return (
    <div className='app'>
      <div className='column'>
        <h2 id='header'>Ideja</h2>
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
                  <button className = "colorButton" onClick={() => handleInputSubmit("purple", "frontend")} style={{ backgroundColor: 'purple' }}>FRONTEND</button>
                  <button className = "colorButton" onClick={() => handleInputSubmit("blue", "backend")} style={{ backgroundColor: 'blue' }}>BACKEND</button>
                  <button className = "colorButton" onClick={() => handleInputSubmit("green", "dizajn")} style={{ backgroundColor: 'green' }}>DESIGN</button>
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
                <button onClick={() => handleDeleteItem(item.id, index)} style={{ position: 'absolute', bottom: 3, right: 3, border: "solid black 3px"}}>X</button>
              </div>
          ))}
        </div>
      </div>

      <div className='column'>
        <h2 id='header'>Plan</h2>
        <div className='plan'
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event, "plan")}>
          {plan.map((item, index) => (
            <div
              id='list'
              key={index}
              draggable
              onDragStart={(event) => handleDragStart(event, "plan", index)}
              style={{ backgroundColor: plan[index].color, border: `solid ${isTaskTooLongInPhase(item.moveDatePlan)}` }}>

                <div id='naslov-zadatka'>
                  {item.naslov}
                </div>
              </div>
          ))}
          </div>
      </div>

      <div className='column'>
        <h2 id='header'>Izrada</h2>
        <div className='izrada'
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event, "izrada")}>
          {izrada.map((item, index) => (
            <div
              id='list'
              key={index}
              draggable
              onDragStart={(event) => handleDragStart(event, "izrada", index)}
              style={{ backgroundColor: izrada[index].color, border: `solid ${isTaskTooLongInPhase(item.moveDateIzrada)}` }}>
                <div id='naslov-zadatka'>
                  {item.naslov}
                </div>
            </div>
          ))}
        </div>
      </div>

      <div className='column'>
        <h2 id='header'>Test</h2>
        <div className='test'
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event, "test")}>
          {test.map((item, index) => (
            <div
              id='list'
              key={index}
              draggable
              onDragStart={(event) => handleDragStart(event, "test", index)}
              style={{ backgroundColor: test[index].color, border: `solid ${isTaskTooLongInPhase(item.moveDateTest)}` }}>
                <div id='naslov-zadatka'>
                  {item.naslov}
                </div>
              </div>
          ))}
        </div>
      </div>

      <div className='column'>
        <h2 id='header'>Integriran</h2>
        <div className='integriran'
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event, "integriran")}>
          {integriran.map((item, index) => (
            <div
              id='list'
              key={index}
              draggable
              onDragStart={(event) => handleDragStart(event, "integriran", index)}
              style={{ backgroundColor: integriran[index].color, border: `solid ${isTaskTooLongInPhase(item.moveDateIntegriran)}` }}>
                <div id='naslov-zadatka'>
                  {item.naslov}
                </div>
              </div>
          ))}
        </div>
      </div>

      <div className='column'>
        <h2 id='header'>Gotov</h2>
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