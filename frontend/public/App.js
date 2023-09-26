import './App.css';
import React, { useState } from 'react';

function App() {
  const [userData, setUserData] = useState({
    name: '',
    // Add more fields as needed
  });
  
  const [responseData, setResponse] = useState(null);
  const [validateResData, setValidateResData] = useState(null);

  let tokens;

  const handleRowClick = (item) => {
      //validateResData(item);
    // Handle the click event for a row here
    console.log(`Clicked on ${item}`);

    fetch('http://localhost:8082/api/validate/'+item, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the backend
      console.log('respons data', data);
      const currentToken = {"currentToken": item}
      let resData;
      let tokenCheck = 'invalid';
      if (!data.error) {
        if (data.validToken) {
          tokenCheck = 'valid';
        }
        data.validToken = tokenCheck;
        resData = {"resData": [currentToken, data]}
      } else {
        const modifyData = {"validToken": tokenCheck};
        resData = {"resData": [currentToken, modifyData]}
      }
      setValidateResData(resData);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }


  const ResponseData = ({ tokens  }) => {
   // const splitData = token.split('"');
   // tokens = splitData.filter(n => n);
    
    return (
      <div>
        <div className='tokens'> Tokens: </div>
        { <table>
          <tbody>
            <tr>
              <th> Token </th>
              <th> Validation Status </th>
            </tr>
            {Object.values(tokens).map((item, index) => (
              <tr key={index}>
                <td>{item}</td>
                <td onClick={() => handleRowClick(item)}> <a> Validate </a> </td>
              </tr>
            ))}
          </tbody>
        </table>}
        {/* {tokens.map((item, index) => (
          <button key={index} onClick={() => handleRowClick(item)}> {item} </button>
        ))} */}
      </div>
    );
  };

  const ValidateResData = ({ resData }) => {
    console.log('constant validToken', resData);
    return (
      <div>
        <span> Token '<b>{resData[0].currentToken}</b>' is 
          {resData[1].validToken === 'valid' && <span className='valid' > Valid </span>}
          {resData[1].validToken === 'invalid' && <span className='invalid' > Invalid </span>}
        </span>
      </div>
    );
  };

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('userData', userData);

    // Fetch request:
    fetch('http://localhost:8081/api/createToken', {
      method: 'POST',
      body: userData.name,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the backend
      console.log('response data', data);
      setResponse(data);

      console.log('responseData', responseData);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div> Token Generator & Validator </div>
      </header>
      <div className="Container">
        <div className="tg-container">
          <div className="title"> Token Generator: </div>
            <form className='tg-form' onSubmit={handleSubmit}>
              <div className='tg-name-input'>
                <label htmlFor="name"> Number: </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                />
              </div>
              <button type="submit"> Get Tokens </button>
            </form>
        </div>
        <div className="tv-container">
          <div className="title"> Token Validator: </div>
          <div className='tokens'>
            {responseData && <ResponseData {...responseData} />}
          </div>
          <div className='tokenValidate'>
            {validateResData && <ValidateResData {...validateResData} />}
            {/* {validateResData} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
