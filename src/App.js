import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "designers");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: newAge });
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data);
    };

    getUsers();
  }, []);
  return (
    <div className='App'>
      <input
        placeholder='Name...'
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type='number'
        placeholder='Age...'
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />
      <button onClick={createUser}>Create Designer</button>
      {users.map((user) => {
        return (
          <div>
            {" "}
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default App;
