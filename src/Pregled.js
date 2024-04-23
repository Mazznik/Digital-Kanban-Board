import React, { useState, useEffect } from 'react';
import './Pregled.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

function Pregled(){
  const [gotov, setGotov] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gotovCollection = collection(db, 'gotov');
        const gotovSnapshot = await getDocs(gotovCollection);
        const gotovData = gotovSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGotov(gotovData);
      } catch (error) {
        console.error('Greška prilikom dohvaćanja gotov iz baze podataka:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='pregled-container'>
      <h2>Pregled gotovih zadataka</h2>
        {gotov.map((objekt) => (
          <div key={objekt.id} className='gotov-item'>
            <h3 id='headers'>NASLOV</h3>
            <p style={{ marginBottom: "30px" }}>{objekt.naslov}</p>
            <h3 id='headers'>OPIS</h3>
            <p style={{ marginBottom: "30px" }}>{objekt.opis}</p>
            <h3 id='headers'>ROLE</h3>
            <p style={{ marginBottom: "30px" }}>{objekt.role}</p>
            <h3 id='headers'>POČETAK ZADATAKA</h3>
            <p style={{ marginBottom: "30px" }}>{new Date(objekt.moveDatePlan.seconds * 1000).toLocaleString()}</p>
            <h3 id='headers'>KRAJ ZADATAKA</h3>
            <p>{new Date(objekt.moveDateGotov.seconds * 1000).toLocaleString()}</p>
          </div>
        ))}
    </div>
  );
};

export default Pregled;
