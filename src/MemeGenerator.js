import React from 'react'

class MemeGenerator extends React.Component {
    constructor() {
        super()
        this.state= {
            topText: "",
            bottomText: "",
            randomImg: "https://i.imgflip.com/39t1o.jpg",
            allMemes: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            this.setState( {allMemes: memes } )
        })
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({ [name] : value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const randomNum = Math.floor(Math.random() * this.state.allMemes.length)
        const newImage = this.state.allMemes[randomNum].url
        this.setState({ randomImg: newImage })
    }

    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="top-text"></label> 
                    <input
                        id="top-text" 
                        type="text" 
                        name="topText" 
                        value={this.state.topText} 
                        placeholder="Top Text" 
                        onChange={this.handleChange}
                    />
                    <label htmlFor="bottom-text"></label>
                    <input
                        id="bottom-text" 
                        type="text" 
                        name="bottomText" 
                        value={this.state.bottomText} 
                        placeholder="Bottom Text" 
                        onChange={this.handleChange}
                    />
                    <button> Generate </button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="random" />
                    <p className="top">{this.state.topText}</p>
                    <p className="bottom">{this.state.bottomText}</p>
                </div>
            </div>
        )
    }
    
}

export default MemeGenerator