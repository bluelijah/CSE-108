// App.js
import React, { useState } from 'react';
import { Button, Paper, Box, Container, TextField } from '@mui/material';
import './App.css';

function Calculator() {
  const [currentInput, setCurrentInput] = useState('0');
  const [previousInput, setPreviousInput] = useState(null);
  const [operator, setOperator] = useState(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);
  const [lastOperator, setLastOperator] = useState(null);
  const [lastOperand, setLastOperand] = useState(null);
  const [activeOperator, setActiveOperator] = useState(null);

  const appendNumber = (num) => {
    setActiveOperator(null);
    let newInput = currentInput;
    
    if (shouldResetDisplay) {
      newInput = '0';
      setShouldResetDisplay(false);
    }

    if (num === '.') {
      if (newInput.includes('.')) return;
      if (newInput === '0' || newInput === '') {
        setCurrentInput('0.');
      } else {
        setCurrentInput(newInput + '.');
      }
    } else {
      if (newInput === '0') {
        setCurrentInput(num);
      } else {
        setCurrentInput(newInput + num);
      }
    }
  };

  const handleSetOperator = (op) => {
    let inputToStore = parseFloat(currentInput);
    
    if (previousInput !== null && operator !== null && !shouldResetDisplay) {
      const result = handleCalculate();
      if (result !== null) {
        inputToStore = result;
      }
    }
    
    setPreviousInput(inputToStore);
    setOperator(op);
    setShouldResetDisplay(true);
    setActiveOperator(op);
  };

  const handleCalculate = () => {
    let currentOp = operator;
    let current = parseFloat(currentInput);
    let previous = previousInput;

    if (currentOp === null) {
      if (lastOperator !== null && lastOperand !== null) {
        previous = parseFloat(currentInput);
        currentOp = lastOperator;
        current = lastOperand;
      } else {
        return null;
      }
    }

    let result;
    switch (currentOp) {
      case '+':
        result = previous + current;
        break;
      case '-':
        result = previous - current;
        break;
      case '*':
        result = previous * current;
        break;
      case '/':
        result = previous / current;
        break;
      default:
        return null;
    }

    setLastOperator(currentOp);
    setLastOperand(current);
    setCurrentInput(result.toString());
    setOperator(null);
    setPreviousInput(null);
    setShouldResetDisplay(true);
    setActiveOperator(null);
    
    return result;
  };

  const handleClear = () => {
    setCurrentInput('0');
    setPreviousInput(null);
    setOperator(null);
    setShouldResetDisplay(false);
    setLastOperator(null);
    setLastOperand(null);
    setActiveOperator(null);
  };

  const toggleSign = () => {
    if (currentInput === '0') return;
    if (currentInput.startsWith('-')) {
      setCurrentInput(currentInput.substring(1));
    } else {
      setCurrentInput('-' + currentInput);
    }
  };

  const NumberButton = ({ value, onClick, sx = {} }) => (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        fontSize: '1.5rem',
        fontWeight: 600,
        minHeight: '70px',
        background: '#4a5568',
        color: '#fff',
        '&:hover': {
          background: '#5a6678',
          transform: 'translateY(-2px)',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
        transition: 'all 0.2s',
        ...sx
      }}
    >
      {value}
    </Button>
  );

  const OperatorButton = ({ value, operator: op, onClick }) => (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        fontSize: '1.5rem',
        fontWeight: 600,
        minHeight: '70px',
        background: activeOperator === op ? '#ed8936' : '#f6ad55',
        color: '#2d3748',
        boxShadow: activeOperator === op ? '0 0 0 3px #fbd38d' : 'none',
        '&:hover': {
          background: '#f6bd6d',
          transform: 'translateY(-2px)',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
        transition: 'all 0.2s',
      }}
    >
      {value}
    </Button>
  );

  return (
    <Container className="calculator-container">
      <Paper elevation={10} className="calculator-paper">
        <TextField
          variant="outlined"
          value={currentInput}
          InputProps={{
            readOnly: true,
            style: {
              fontSize: '2.5rem',
              textAlign: 'right',
              color: '#fff',
              background: '#1a202c',
              minHeight: '80px',
            }
          }}
          sx={{
            width: '100%',
            marginBottom: '15px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#4a5568',
                borderWidth: '2px',
              },
            },
          }}
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          <Button
            variant="contained"
            onClick={handleClear}
            sx={{
              gridColumn: 'span 2',
              fontSize: '1.5rem',
              fontWeight: 600,
              minHeight: '70px',
              background: '#fc8181',
              color: '#fff',
              '&:hover': {
                background: '#fc9595',
                transform: 'translateY(-2px)',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
              },
              '&:active': {
                transform: 'translateY(0)',
              },
              transition: 'all 0.2s',
            }}
          >
            C
          </Button>
          <OperatorButton value="÷" operator="/" onClick={() => handleSetOperator('/')} />
          <OperatorButton value="×" operator="*" onClick={() => handleSetOperator('*')} />

          <NumberButton value="7" onClick={() => appendNumber('7')} />
          <NumberButton value="8" onClick={() => appendNumber('8')} />
          <NumberButton value="9" onClick={() => appendNumber('9')} />
          <OperatorButton value="−" operator="-" onClick={() => handleSetOperator('-')} />

          <NumberButton value="4" onClick={() => appendNumber('4')} />
          <NumberButton value="5" onClick={() => appendNumber('5')} />
          <NumberButton value="6" onClick={() => appendNumber('6')} />
          <OperatorButton value="+" operator="+" onClick={() => handleSetOperator('+')} />

          <NumberButton value="1" onClick={() => appendNumber('1')} />
          <NumberButton value="2" onClick={() => appendNumber('2')} />
          <NumberButton value="3" onClick={() => appendNumber('3')} />
          
          <Button
            variant="contained"
            onClick={handleCalculate}
            sx={{
              gridRow: 'span 2',
              fontSize: '1.5rem',
              fontWeight: 600,
              background: '#48bb78',
              color: '#fff',
              '&:hover': {
                background: '#5cca8c',
                transform: 'translateY(-2px)',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
              },
              '&:active': {
                transform: 'translateY(0)',
              },
              transition: 'all 0.2s',
            }}
          >
            =
          </Button>

          <NumberButton value="0" onClick={() => appendNumber('0')} />
          <NumberButton value="." onClick={() => appendNumber('.')} />
          <NumberButton value="+/−" onClick={toggleSign} />
        </Box>
      </Paper>
    </Container>
  );
}

export default Calculator;