import React, {Component} from 'react'
import axios from 'axios'
import FileList from './FileList/FileList'
import ShowCode from './ShowCode/ShowCode'

class PythonExplorer extends Component{

    state={
        pythonFileList: [],
        pythonFileContent: ''
    }

    componentDidMount(){
        axios.get('http://localhost:3001/pythonFile')
            .then(response=>{
                console.log(response.data);
                this.setState({pythonFileList: response.data})
            })
            .catch(error=>{
                console.log(error)
            })
    }

    itemClickedHandler = (iKey) => {
        //console.log('!!!!!!!!!!!itemClickedHandler')
        console.log(this.state.pythonFileList[iKey].filePath)

        axios.get('http://localhost:3001' + this.state.pythonFileList[iKey].filePath)
            .then(response=>{
                console.log(response.data);
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