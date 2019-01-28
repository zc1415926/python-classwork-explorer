import React, {Component} from 'react'

class FileList extends Component{
   
    render(){
        let mapedPythonFileList = null;

        if(this.props.pythonFileList !== []){
            mapedPythonFileList = Object.keys(this.props.pythonFileList)
                .map(iKey => {
                    return (
                        <li key={iKey}>
                            <button onClick={()=>this.props.itemClickedHandler(iKey)}>
                                {this.props.pythonFileList[iKey].fileName}
                            </button>
                        </li>
                    )
                }) 
        }

        return (
            <ul>
                {mapedPythonFileList}
            </ul>
        )
    }
    
}

export default FileList