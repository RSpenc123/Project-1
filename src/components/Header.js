import React, {Component} from 'react';
import Background from './buttons/background';
import Color from './buttons/color';
import Font from './buttons/font';
import textSize from './buttons/text size';
import axios from 'axios'

class Header extends Component {
    constructor(props){
        super(props);

        this.state = {
            editting: false,
            editInput: props.element.name,
            editText: props.element.text
        }
    }
editName = () => {
    const {editting} = this.state.editInput;
    this.setState({
        editting: !editting
    })
}
editText = () => {
    const {editting} = this.state.editText;
    this.setState({
        editting: !editting
    })
}

handleInput = e => {
    this.setState({
        [e.target.name]: e.target.value
    })
}
handleInputT = e => {
    this.setState({
        [e.target.name]: e.target.value
    })
}
save = () => {
    const index = this.props.index;
    const newName = this.state.editInput;
    console.log(newName, index);
    axios
    .put(`/api/files/name`,{index, newName} )
    .then(res => this.props.updateState(res.data));

    this.setState({
        editting: false
    })
    

}
saveText = () => {
    const index = this.props.index;
    const newText = this.state.editText;
    console.log(newText, index);
    axios
    .put(`api/files/text`,{index, newText} )
    .then(res => this.props.updateState(res.data));

    this.setState({
        editting: false
    })
    

}

render(){
    return(
        <div>
            {this.state.editting ? (
                <article id= 'tt'>
                    <div className='inputs'>
                    <input className='editName'
                    value={this.state.editInput}
                    name="editInput"
                    onChange={e => this.handleInput(e)}
                    />
                    <input className='editText'
                    value={this.state.editText}
                    name="editText"
                    onChange={e => this.handleInputT(e)}
                    />
                    </div>
                    <div className='saveButtons'></div>
                    <button onClick={() => this.save()}>Save Name!</button>
                    <button onClick={() => this.saveText()}>Save Text</button>
                </article> 
                
            ): (
                
                <article id='store'>
                    <div className='files'>
                    <div className='name-box'>
                    
                    <section className='name'><b>{this.props.element.name}</b></section>
                    
                    <div className='name-buttons'>
                    <button  className='Orca' onClick={() => this.editName()}>Edit
                        {/* <img src="https://image.flaticon.com/icons/svg/38/38609.svg"/> */}
                        </button>
                        <button onClick ={() => this.props.delete(this.props.index)}>delete</button>
                        </div>
                        </div>

                        <div className='text-box'>
                    
                    <section className='text'>{this.props.element.text}</section>
                    
                    </div>
                    </div>
                    
                </article>
               
                
                
            )
            }
            
        </div>
    )
}


}

export default Header;