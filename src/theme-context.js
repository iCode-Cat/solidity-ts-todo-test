import React from 'react';
export const themes = {
  light: {
    mode: 'light',
    topbg: '#FAFAFA',
    foreground: '#000000',
    background: '#FFFFFF',
    inputText: '#9495A5',
    completed: '#D1D2DA',
    todo: '#494C6B',
    labelPassive: '#9495A5',
    labelActive: '#3A7CFD',
    labelHover: '#494C6B',
    boxShadow: '0px 35px 50px -15px #C2C3D680',
    border: '#E3E4F1',
  },
  dark: {
    mode: 'dark',
    topbg: '#171823',
    foreground: '#ffffff',
    background: '#25273D',
    inputText: '#767992',
    completed: '#4D5067',
    todo: '#C8CBE7',
    labelPassive: '#5B5E7E',
    labelActive: '#3A7CFD',
    labelHover: '#E3E4F1',
    boxShadow: '0px 35px 50px -15px #00000080',
    border: '#393A4B',
  },
};

export const ThemeContext = React.createContext();

export const HandleTheme = React.createContext();
