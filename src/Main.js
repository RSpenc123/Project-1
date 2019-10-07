import React, {Component} from 'react';
import Body from './components/body';
import Header from './components/Header';


import axios from 'axios'

class Main extends Component{
    constructor() {
        super();
        this.oldFiles = React.createRef()
        this.newFiles = React.createRef()

        this.state ={
        files: [{
            name: '',
            text: ''
        }],
        inputName: '',
        inputText: '' 
        }        
    }

      toggleShowOldList = () => {
      console.log('hit', this.oldFiles)
        
        let {current} = this.oldFiles
        if(current.classList.contains('show-old')) {
            console.log('hit add hide')
          current.classList.add('hide-old')
          current.classList.remove('show-old')
        } else {
            console.log('hit add show')
          current.classList.add('show-old')
          current.classList.remove('hide-old')
        }
      }
      toggleShowNewList = () => {
        console.log('hit', this.newFiles)
          
          let {current} = this.newFiles
          if(current.classList.contains('show-new')) {
              console.log('hit add hide')
            current.classList.add('hide-new')
            current.classList.remove('show-new')
          } else {
              console.log('hit add show')
            current.classList.add('show-new')
            current.classList.remove('hide-new')
          }
        }
    componentDidMount = () => {
        axios.get('/api/files').then(res => {
            this.setState({
                files:res.data
                
            }) 
        })
    }

    handleInput = e => {
        const {name,value} = e.target;
        this.setState({[name]: value})
    }
    handleInputT = e => {
        const {name,value} = e.target;
        this.setState({[name]: value})
    }

    addToFile = () =>{
    const addOn = {
        name: this.state.inputName,
        text: this.state.inputText};

    axios.post('./api/files', {addOn}).then(res=>
        this.setState({
            files: res.data,
            inputName: '',
            inputText: ''
            
        })
        
        )
}

    delete = index=> {
        axios.delete(`api/files/${index}`).then(res=>
            this.setState({
                files: res.data
            }))
    }

    updateState = updatedFile => {
        this.setState({
            files: updatedFile

        })
    }

render(){console.log(this.state)
   
    const mappedFiles = this.state.files.map((element,index) =>{
        return(
         <Header
         element ={element}
         index={index}
         key={`fileItem${index}`}
         delete = {this.delete}
         updateState={this.updateState}/>
        )
    }
     )
    return(
    
        <section id="bg">
            <header>
                <div className = 'ree'>
               <p>P.tato</p>
               <img className="header-image"></img></div>
               <div>
               <i id="hamburger"className="fas fa-bars fa-2x" onClick={this.toggleShow}/>
               </div>
            </header>
            <div className="buttons">
            <button className='new' onClick={this.toggleShowNewList}>New File</button>
            <button className='old' onClick={this.toggleShowOldList}>Open File</button>
            </div>
            

<div className = 'newFile' ref={this.newFiles}>
 
      <section id='inputs'>
   <input className = "createName"
placeholder="File name here!"
          name="inputName"
          value={this.state.inputName}
          onChange={e => this.handleInput(e)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              this.addToFile();
            }}}
              />
               <input className = "createText"
placeholder="Content here!"
          name="inputText"
          value={this.state.inputText}
          onChange={e => this.handleInputT(e)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              this.addToFile();
            }}}
              />
          </section> 
            
            </div>
            <div className = "oldFile" ref={this.oldFiles}>
            {mappedFiles}
            </div>
              </section>
)


}
}

export default Main;