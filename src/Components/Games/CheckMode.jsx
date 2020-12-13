import React, { useEffect, useState, useContext } from "react";
import {Context} from './../../context'

export default (props) => {
    const context = useContext(Context)
    const checkWord = (word) => {
        
            if(word === library[currentWordIndex].word) {
                props.setCorrectAnswer(props.correctAnswer + 1)
                context.setScore(context.score + 1)
                if(library.length - 1 !== currentWordIndex){
                    setCurrentWordIndex(currentWordIndex + 1)
                } else {
                    setCurrentWordIndex(0)
                    setTimeout(() => {
                        alert('Game Over')
                        props.setCorrectAnswer(0)
                        props.setWrongAnswer(0)
                    }, 500)
                }
                
                props.CheckLevel()
                library[currentWordIndex].correct = library[currentWordIndex].correct + 1
                localStorage.setItem('library', JSON.stringify(library))
            } else {
                props.setWrongAnswer(props.wrongAnswer + 1)
                library[currentWordIndex].error = library[currentWordIndex].error + 1
                localStorage.setItem('library', JSON.stringify(library))
            }
        } 
    
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [library, setLibrary] = useState(JSON.parse(localStorage.getItem('library')) || [{id: 0, word: '', translate: ''}], [{id: 0, word: '', translate: ''}], [{id: 0, word: '', translate: ''}]) 
    const [checkArr, setCheckArr] = useState([])
    const currentWord = library[currentWordIndex].translate
    useEffect(() => { 
        const filterArr = library.filter((item, index) => index !== currentWordIndex)
        filterArr.sort(() => Math.random() - 0.5)
        const checkArr = [filterArr[0].word, filterArr[1].word, library[currentWordIndex].word]
        setCheckArr(checkArr.sort(() => Math.random() - 0.5)) 
    }, [props.correctAnswer]);
    useEffect(() => {
        localStorage.setItem('score', context.score)
    }, [context.score]);
    return (
        <div className='mode-wraper'>
            <div className='mode-title-word'>
                {currentWord}
            </div>
            <p className='mode-title-word-description'>Set translation fo this word</p>

            <div className='check-item-block'>
                {checkArr.map((item, index) => <div key={index} className="check-item" onClick={() => checkWord(item)}>
                    {item}
                </div>)}
            </div>
        </div>
    )
}