import React from 'react';

class Library extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            translation: '',
            value: '',
            library: JSON.parse(localStorage.getItem('library')) || [{id: 0, word: '', translate: ''}]

        }
        this.wordsRef = Array(this.state.library.length)
        this.changMode = this.changMode.bind(this)
        this.getValue = this.getValue.bind(this)
        this.addWordToLibrary = this.addWordToLibrary.bind(this)
        this.checkWord = this.checkWord.bind(this)
    }
    componentDidMount() {
        
            document.addEventListener('keydown', (event) => {
                if (this.state.value.length > 0 && this.state.isOpen && event.key === 'Enter') {
                    this.addWordToLibrary()
                }
            })        
    }

    changMode() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    async removeWordFromLibrary(index) {
        await this.setState(prevState => ({
            library: prevState.library.filter((word, i) => i !== index) 
        }))
        await localStorage.setItem('library', JSON.stringify(this.state.library))
    }

    async addWordToLibrary() {
        try {
            const response = await fetch("https://api-b2b.backenster.com/b1/api/v3/translate/", {
            body: "from=ru_RU&to=en_GB&text=" + this.state.value + "&platform=api",
            headers: {
            Authorization: "Bearer "+ 'a_982nZsLr6WIaQXd1E8c5z4wtibrWcU9KIXQHNxV65QszSrGXnMKENMy9XpddjLH4yoy1LlPk7AKyt8Qz',
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            method: "POST"
            })
        const result = await response.json()
        if(result.result) {
            await this.setState(() => ({
                translation: result.result
            }))
        }
        await this.setState(prevState => ({
            library: [...prevState.library, {id: this.state.library.length, word: this.state.value, translate: this.state.translation, correct: 0, learn: 0, error: 0}]
        }))
        await localStorage.setItem('library', JSON.stringify(this.state.library))
        await this.changMode()
        await this.setState(() => ({
            translation: ''
        }))
        }
        catch(error) {
            console.log(error)
        }    
    }
    async getValue(event) {
        const value = event.currentTarget.value
        await this.setState(() => ({
            value: value
        }))
        
    }
    
    checkWord () {
        
    }

    render() {
        return (
            <div className="page-container">
                <div className="add-word-container">
                    {!this.state.isOpen ? 
                        <span className="label-title">Add new word</span> : 
                        <div>
                           <input onChange={this.getValue} placeholder="Enter new word"/>
                            <span>{this.state.translation}</span>
                            <button onClick={this.addWordToLibrary} className="btn-round check">✓</button>
                        </div>
                        
                    }
                    <button onClick={this.changMode} className={this.state.isOpen ? "btn-round close" : "btn-round add"}> </button>
                </div>

                <div className="library-container">
                    <div className="library-header">
                        <div>Word</div>
                        <div>Translate</div>
                        <div>Learn level</div>
                    </div>
                    {this.state.library.map((word, index) => (
                        <div key={index}
                        ref={el => this.wordsRef[index] = el}
                        >
                            <div>
                                {word.id}
                            </div>
                            <div>
                                {word.word}
                            </div>
                            <div>
                                {word.translate}
                            </div>
                            <div onClick={() => this.removeWordFromLibrary(index)}>Delete</div>
                        </div>    
                    ))}    
                </div>
            </div>
        )
    }
}

export default Library