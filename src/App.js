import React, {useState, useEffect, useRef} from "react"

function App() {
    
    const TIMER_DEFAULT = 20

    const [textArea, setTextArea] = useState("")
    const [isRunningTimer, setIsRunningTimer] = useState(false)
    const [timer, setTimer] = useState(TIMER_DEFAULT)
    const [wordCountState, setWordCount] = useState(0)

    const textAreaRef = useRef(null)

    function handleChange(event){
        setTextArea(event.target.value)
    }
    
    function wordCount(text){
        const wordArray = text.split(" ")
        const filteredArray = wordArray.filter( word => word !== "")
        return filteredArray.length
    }

    function startGame(){
        textAreaRef.current.disabled = false
        textAreaRef.current.focus()
        setIsRunningTimer(true)
        setTimer(TIMER_DEFAULT)
        setTextArea("")
    }

    function gameEnd(){
        textAreaRef.current.disabled = true
        setIsRunningTimer(false)
        setWordCount(wordCount(textArea))
    }

    useEffect( () => {
        if(timer > 0 && isRunningTimer){
            setTimeout( () => setTimer(prevTimer => prevTimer - 1), 1000)          
        }
        else if(timer === 0){
            gameEnd()
        }

    }, [timer, isRunningTimer]) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div>
            <h1>How fast do you type?</h1>
            <textarea
                onChange={handleChange}
                value={textArea}
                ref={textAreaRef}
                disabled={true}
            />
            <h4>Time remaining: {timer}</h4>
            <button 
                onClick={(event) => {
                        startGame()
                    }
                }
                disabled={isRunningTimer}
            >
                Start
            </button>
            <h1>Word count: {wordCountState}</h1>
        </div>
    )
}

export default App
