import './App.css';
import React, { useState } from 'react';

function App() {
  const [userData, setUserData] = useState({
    name: '',
    // Add more fields as needed
  });
  const [error, setError] = useState('');
  const [responseData, setResponse] = useState(null);
  const [validateResData, setValidateResData] = useState(null);
  const [totalNoOfTokens, setTotalNoOfTokens] = useState(0);
  const [totalNoOfValidTokens, setTotalNoOfValidTokens] = useState(0);

  let tokens;
  // let totalNoOfTokens = 0;
  // let totalNoOfValidTokens = 0;

  const validateTokens = (tokens) => {
    console.log('tokens --->', tokens)
    fetch('http://localhost:8082/api/validate', {
        method: 'POST',
        body: JSON.stringify(tokens),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*/**',
        },
      })
      .then((response) => response.json())
      .then((validTokenData) => {
        // Handle the response from the backend
        
        // let resData;
        // let tokenCheck = 'invalid';
        // if (!data.error) {
        //   if (data.validToken) {
        //     tokenCheck = 'valid';
        //   }
        //   data.validToken = tokenCheck;
        //   resData = {"resData": [currentToken, data]}
        // } else {
        //   const modifyData = {"validToken": tokenCheck};
        //   resData = {"resData": [currentToken, modifyData]}
        // }
        // setValidateResData(resData);


        const resObjCopy = {
          "tokens": {
            "valid": {},
            "invalid": {},
          }
        };
        let totalNoOfValidTokens = 0;
        for (const key in validTokenData) {
          const resObjCopySize = Object.keys(resObjCopy.tokens).length;
          if (validTokenData.hasOwnProperty(key)) {
            if (resObjCopySize < 1000) {
              let validText = 'Invalid';
              if (validTokenData[key]) {
                validText = 'Valid';
                totalNoOfValidTokens = totalNoOfValidTokens + 1;
                resObjCopy.tokens.valid[key] = validText;
              } else {
                resObjCopy.tokens.invalid[key] = validText;
              }
            } else {
              return;
            }
          }
        }
        setTotalNoOfValidTokens(totalNoOfValidTokens);
        setResponse(resObjCopy);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const handleRowClick = (item) => {
    // validateToken(item);
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


  const ResponseData = ({ token  }) => {
    const splitData = token.split('"');
    tokens = splitData.filter(n => n);

    return (
      <div>
        <div className='tokens'> Tokens: </div>
        {/* <table>
          <tbody>
            <tr>
              <th> Token </th>
              <th> </th>
            </tr>
            {tokens.map((item, index) => (
              <tr key={index}>
                <td>{item}</td>
                <td onClick={() => handleRowClick(item)}> <a> Validate </a> </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        {tokens.map((item, index) => (
          <button key={index} onClick={() => handleRowClick(item)}> {item} </button>
        ))}
      </div>
    );
  };

  const ResponseDataWithObject = ({ tokens  }) => {
    console.log('tokens', tokens);
    return (
      <div>
        <div className='tokens font-weight-600'> Tokens: </div>
        <div className='tokens-table'>
          <table>
            <thead>
              <tr>
                <th className='font-weight-600'> Token </th>
                <th className='font-weight-600'> Status </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(tokens.valid).map(([key, value]) => (
                <tr key={key}>
                  <td style={{'cursor': 'pointer'}} onClick={() => handleRowClick(key)}>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='tokens-table'>
          <table>
            <thead>
              <tr>
                <th className='font-weight-600'> Token </th>
                <th className='font-weight-600'> Status </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(tokens.invalid).map(([key, value]) => (
                <tr key={key}>
                  <td style={{'cursor': 'pointer'}} onClick={() => handleRowClick(key)}>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

  // const ronData = "1" "-" "" "-" "11-11"1

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Regular expression to match numbers and commas only
    const regex = /^[0-9,]*$/;

    if (regex.test(value) && value.length <= 10) {
      // Update the input value and clear any previous error
      setUserData({
        ...userData,
        [name]: value,
      });
      setError('');
    } else {
      // Display an error message
      setError('Please enter numbers and commas only, with a maximum length of 10.');
    }
  };

  const handleSubmit = (e) => {
    if(userData.name===''){
      setError('Please enter numbers and commas only, with a maximum length of 10.');
      return ;
    }
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
      console.log('respons data', data);
      setTotalNoOfTokens(Object.keys(data.tokens).length);

      validateTokens(data.tokens);
      // handleRowClick(data.tokens[0])

      // const resObjCopy = {
      //   "tokens": {}
      // };
      // for (const key in data.tokens) {
      //   const resObjCopySize = Object.keys(resObjCopy.tokens).length;
      //   if (data.tokens.hasOwnProperty(key)) {
      //     if (resObjCopySize < 1000) {
      //       resObjCopy.tokens[key] = data.tokens[key];
      //     } else {
      //       return;
      //     }
      //   }
      // }
      // setResponse(resObjCopy);

      // console.log('responseData', responseData);
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
            <form className='tg-form'>
              <div className='tg-name-input'>
                <label htmlFor="name"> Number: </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  placeholder="e.g., 1,2,3,4 or 1234"
                />
              </div>
              <div className='errorMsg'> {error && <p>{error}</p>} </div>
              <button type="button" onClick={handleSubmit} disabled={error}> Get Tokens </button>
            </form>
        </div>
        <div className="tv-container">
          <div className="title"> Token Validator: </div>
          <div className='token-count'>
            <div> Total number of tokens: <b>{totalNoOfTokens}</b> </div>
            <div> Total number of valid tokens: <b>{totalNoOfValidTokens}</b> </div>
          </div>
          <div className='tokens'>
            {/* {responseData && <ResponseData {...responseData} />} */}
            {responseData && <ResponseDataWithObject {...responseData} />}
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