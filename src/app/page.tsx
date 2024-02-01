'use client'
import { useState } from 'react';

import './index.css'
import { useTheme } from './ThemeContext'


function Button({ text, handleClick }: {
  text: string, handleClick: (value: string
  ) => void
}) {
  return (
    <div onClick={() => handleClick(text)} className={`grid-item ${text}`}><strong>{text}</strong></div>
  )
}
export default function Home() {
  const { activeTheme, handleToggle } = useTheme();
  const [inputExp, setInputExp] = useState<string>('');
  const handleClick = (value: string) => {
    console.log('Button Clicked:', value);
    switch (value) {
      case 'RESET':
        setInputExp('');
        break;
      case '=':
        setInputExp((prevInput) => {
          try {
            const result: string = eval(prevInput);
            return result;
          } catch (error) {
            console.error('Error evaluating expression:', error);
            return 'Error';
          }
        });
        break;
      case 'DEL':
        setInputExp((prevInput) => prevInput.slice(0, -1));
        break;
      default:
        setInputExp((prevInput) => prevInput + value);
    }
    setInputExp((updatedInputExp) => {
      console.log(updatedInputExp);
      return updatedInputExp; // Return the updated value to maintain consistency
    });
  }
  const buttonData = [
    '7', '8', '9', 'DEL', '4', '5', '6', '+', '1', '2', '3', '-', '.', '0', '/', '*'
  ]
  return (
    <main className={`main-${activeTheme}`}>
      <div className="con">
        <header>
          <span>calc</span>
          <div className="theme">
            <span className='theme-head'>Theme</span>
            <div className="toggle-con">
              <span>123</span>
              <div className="toggle" onClick={() => handleToggle(activeTheme)}>
                <div className="radio">
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className='result'>
          <h3>{inputExp}</h3>
        </div>
        <div className='ops grid'>
          {buttonData.map(button => <Button key={button} text={button} handleClick={handleClick} />)}
          <div className='reset' onClick={() => handleClick('RESET')}><strong>RESET</strong></div>
          <div className='equals' onClick={() => handleClick('=')}><strong>=</strong></div>
        </div>
        <div className="attribution">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
          Coded by <a href="#">Your Name Here</a>.
        </div>
      </div>
    </main>
  )
}
