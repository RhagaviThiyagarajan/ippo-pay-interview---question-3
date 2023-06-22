import React, { useState } from "react";
import {toast,ToastContainer} from 'react-toastify'
import "./App.css";
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "./char";
import { COPY_SUCCESS } from "./Messages";


function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(20);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includesSymbol, setIncludeSymbol] = useState(false);

  const handleGeneratePassword = (e) => {
    if (
      !includeUpperCase &&
      !includeLowerCase &&
      !includeNumbers &&
      !includesSymbol
    ) {
      notify('You must Select atleast one option', true)
    }
    let characterList = "";

    if (includeLowerCase) {
      characterList = characterList + lowerCaseLetters;
    }

    if (upperCaseLetters) {
      characterList = characterList + upperCaseLetters;
    }

    if (includeNumbers) {
      characterList = characterList + numbers;
    }

    if (includesSymbol) {
      characterList = characterList + specialCharacters;
    }

    setPassword(createPassword(characterList));
  };

  const createPassword = (characterList) => {
    let password = '';
    const characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);

      password = password + characterList.charAt(characterIndex);
    }

    return password;
  };

  const copyToClipboard = (e) => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand('copy');
    newTextArea.remove();
  };
const notify=(message,hasError=false)=>{
  if(hasError)
  {
    toast.error(message,{
      position:'top-center',
      hideProgressBar:false,
      closeOnClick:true,
      autoClose:5000,
      pauseOnHover:true,
      draggable:true,
      progress:undefined,
    });
  }else{
    toast(message,{
      position:'top-center',
      hideProgressBar:false,
      closeOnClick:true,
      autoClose:5000,
      pauseOnHover:true,
      draggable:true,
      progress:undefined,
    });

  }

}

  const handleCopyPassword = (e) => {
    if(password ==='')
    {
      notify('nothing to copy',true)
    }else{
      copyToClipboard();
      notify(COPY_SUCCESS)
    };
    }
    

  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h2 className="generator_header">Password generator</h2>
          <div className="generator_password">
            <h3>{password}</h3>
            <button onClick={handleCopyPassword} className="copy_btn">
              <i className="far fa-clipboard"></i>
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="password-strength">Password length</label>
            <input
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type="number"
              id="password-strength"
              name="password-strength"
              max="20"
              min="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="uppercase-letters">
              Includes Uppercase Letters
            </label>
            <input
              checked={includeUpperCase}
              onChange={(e) => setIncludeUpperCase(e.target.checked)}
              type="checkbox"
              id="uppercase-letters"
              name="uppercase-letters"
              max="20"
              min="10"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lowercase-letters">
              Includes Lowercase Letters
            </label>
            <input
              checked={includeLowerCase}
              onChange={(e) => setIncludeLowerCase(e.target.checked)}
              type="checkbox"
              id="loswercase-letters"
              name="lowercase-letters"
            />
          </div>

          <div className="form-group">
            <label htmlFor="includeNumbers">Includes numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type="checkbox"
              id="includeNumbers"
              name="includeNumbers"
            />
          </div>

          <div className="form-group">
            <label htmlFor="includeSymbol">Includes Symbol </label>
            <input
              checked={includesSymbol}
              onChange={(e) => setIncludeSymbol(e.target.checked)}
              type="checkbox"
              id="includesSymbol"
              name="includesSymbol"
            />
          </div>
          <button onClick={handleGeneratePassword} className="generator_button">
            Generate Password
          </button>
          <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover>

          </ToastContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
