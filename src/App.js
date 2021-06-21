import { Button, FormControl, Input, InputLabel, IconButton  } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import './App.css';
import db from './firebase';
import Message from './Message';
import firebase from 'firebase'
import FlipMove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  }, [])
  useEffect(() => {
    setUsername(prompt('Please Enter Your Name Here...'))
  }, [])

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }

  return (
    <div className="App">
      <img className="app__image" src="https://z-p3-scontent.fdac1-1.fna.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&ccb=2&_nc_sid=6825c5&_nc_ohc=kHPoRRu-brYAX9ptaG4&_nc_ht=z-p3-scontent.fdac1-1.fna&oh=72f7043b17e6abda9e174981b87cf812&oe=5FDB2E7D" />
      <h2>Welcome {username} </h2>
      <div>
        <form className="app__form">
          <FormControl className="app__formControl">
            <Input className="app__input" placeholder="Enter a Message..."  value={input} onChange={e => setInput(e.target.value)} />
            <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </FormControl>
        </form>
      </div>
      {/* message themself */}
      <FlipMove>
      {
        messages.map( ({id, message}) => (
          <Message key={id} username={username} message={message} />
        ))
      }
      </FlipMove>
    </div>
  );
}

export default App;
