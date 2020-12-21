import React from 'react';

const LanguageContext = React.createContext({
  language: {},
  error: null,
  words: [],
	updateLang: ()=>{},
	updateWords: ()=>{},
});

export default LanguageContext;

export function LangProvider(props) {
    return (
      <LanguageContext.Provider value={props.value}>
        {props.children}
      </LanguageContext.Provider>
    );
}
