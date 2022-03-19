import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import ruMessages from "devextreme/localization/messages/ru.json";
import { locale, loadMessages } from "devextreme/localization";

loadMessages(ruMessages);
locale("ru");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
