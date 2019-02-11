import React, {Component} from 'react'
import axios from 'axios'
import FileList from './FileList/FileList'
import ShowCode from './ShowCode/ShowCode'
const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class PythonExplorer extends Component{

    state={
        pythonFileList: [],
        pythonFileContent: ''
    }

    componentDidMount(){
        axios.get('http://localhost:3001/pythonFile')
            .then(response=>{
                //console.log(response.data);
                this.setState({pythonFileList: response.data})
            })
            .catch(error=>{
                console.log(error)
            })
 
        ipcRenderer.on('write-open-py-file-reply', (event, arg)=>{
            if(arg.message === 'success'){
                alert('File Writing success')
            }
            else{
                alert('File Writing failed')
            }
            
        }) 
    }

    itemClickedHandler = (iKey) => {
        //get python file content by filePath, then pass fileName and fileContent
        //to write, after writing let Electron open the file using VS Code
        axios.get('http://localhost:3001' + this.state.pythonFileList[iKey].filePath)
            .then(response=>{
                
                ipcRenderer.send('write-open-py-file', {
                    'fileName': this.state.pythonFileList[iKey].fileName,
                    'fileContent': response.data
                })
                //show python code on page
                this.setState({pythonFileContent: response.data})
            })
            .catch(error=>{
                console.log(error)
            })
    }

    render(){
        return (
            <div>
                <h1>This is PythonExplorer</h1>
                <FileList 
                    pythonFileList={this.state.pythonFileList}
                    itemClickedHandler={this.itemClickedHandler}
                ></FileList>
                <ShowCode>{this.state.pythonFileContent}</ShowCode>
            </div>
        )
    }
}

export default PythonExplorer