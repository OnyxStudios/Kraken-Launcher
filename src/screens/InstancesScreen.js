import React from 'react';
import Radium from 'radium';
import {addPack, removePack} from './../redux/Actions';
import {connect} from "react-redux";

const ModpackUtils = require('./../utils/ModpackUtils');
const NavStyles = require('./../styles/NavStyles');
const InstancesStyles = require('./../styles/InstancesStyles');
const GlobalStyles = require('./../styles/GlobalStyles');

class InstancesScreen extends React.Component {

    state = {
        loaded: false,
        instances: [],
        instance: null,
        createInstance: false,
        contextVisible: false,
        mouseX: 0,
        mouseY: 0,
        selectedInstance: null,
        searchText: ''
    };

    componentWillMount() {
        this.setState({loaded: false});
        let tempInstances = ModpackUtils.parseInstances();

        tempInstances.forEach(instance => this.props.addPack(instance));
        this.setState({instances: tempInstances});
        this.setState({loaded: true});
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }

    handleClick = (event) => {
        if(!event.target.id || event.target.id.indexOf('context') <= -1) {
            this.setState({contextVisible: false, selectedInstance: null});
        }
    };

    openContext = (event, instance) => {
        event.preventDefault();
        this.setState({contextVisible: true, mouseX: event.clientX, mouseY: event.clientY - 30, selectedInstance: instance});
    };

    openInstance = (instance) => {
        if(instance.id == 0) {
            this.setState({createInstance: true});
        }else {
            this.setState({instance});
        }
    };

    modifyInstanceMod = (modname) => {
        this.props.removePack(this.state.instance);
        let currentInstances = this.state.instances;
        let index = currentInstances.indexOf(this.state.instance);
        let newInstance = ModpackUtils.toggleMod(this.state.instance.id, modname);
        if(~index) {
            currentInstances[index] = newInstance;
        }

        this.props.addPack(newInstance);
        this.setState({instances: currentInstances, instance: newInstance});
    };

    deletePack = () => {
        let tempInstances = this.state.instances;
        let index = tempInstances.indexOf(this.state.selectedInstance);
        if(~index) {
            tempInstances.splice(index, 1);
        }

        this.props.removePack(this.state.selectedInstance);
        this.setState({instances: tempInstances});
        ModpackUtils.deleteInstance(this.state.selectedInstance);
    };

    ContextMenu = () => {
        return(
            <div id='context' key='context' style={[GlobalStyles.contextMenu, {left: this.state.mouseX, top: this.state.mouseY}]}>
                <button key='context_play' style={[GlobalStyles.contextItem, {color: 'lightgreen'}]}>Play</button>
                <button key='context_openfolder' style={GlobalStyles.contextItem} onClick={() => ModpackUtils.openInstanceFolder(this.state.selectedInstance)}>Open folder</button>
                <hr/>
                <button key='context_delete' style={[GlobalStyles.contextItem, {color: 'red'}]} onClick={this.deletePack}>Delete</button>
            </div>
        );
    };

    CreateInstance = () => {
        return(
            <div style={InstancesStyles.blurredBackground}>
                <div style={InstancesStyles.createInstance}>
                    <center>
                        <button onClick={() => this.setState({createInstance: false})}>cancel</button>
                    </center>
                </div>
            </div>
        );
    };

    InstanceItem = (instance) => {
        let selected = this.state.instance && this.state.instance.id == instance.id;

        return (
            <div key={instance.id} className='instanceItem' style={selected ? InstancesStyles.selectedStyle : InstancesStyles.instanceItem} onClick={() => this.openInstance(instance)}>
                <center>
                    <img onContextMenu={(event) => this.openContext(event, instance)} style={selected ? InstancesStyles.selectedLogo : InstancesStyles.instanceListLogo} src={instance.logo} alt='' />
                    <p>{instance.name}</p>
                </center>
            </div>
        );
    };

    SearchItems = () => {
        let filteredList = [];
        this.state.instances.forEach(instance => {
            if(instance.name.toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1) {
                filteredList.push(instance);
            }
        });

        return (
            filteredList.map(this.InstanceItem)
        );
    };

    InstanceContent = () => {
        if(this.state.instance) {
            return (
                <div style={InstancesStyles.instancePage}>
                    <center style={{width: '100%', height: '100%'}}>
                        <div style={InstancesStyles.instanceHeaderWrapper}>
                            <div style={InstancesStyles.instanceDesc}>
                                <p style={InstancesStyles.title}>{this.state.instance.name}</p>
                                <p style={InstancesStyles.description}>{this.state.instance.description ? this.state.instance.description : ''}</p>

                                <div style={InstancesStyles.options}>
                                    <button onClick={() => console.log("Clicked Play!")} key='play' style={[InstancesStyles.optionsBtn, {float: 'left', backgroundColor: '#3DB4F2'}]}>Play</button>
                                    <button onClick={this.deletePack} key='delete' style={[InstancesStyles.optionsBtn, {float: 'right', backgroundColor: '#E85D75'}]}>Delete</button>
                                </div>
                            </div>

                            <div style={InstancesStyles.logoWrapper}>
                                <img src={this.state.instance.logo} style={InstancesStyles.instanceLogo} alt='' />
                                <p>{this.state.instance.author}<br/>V{this.state.instance.version}</p>
                            </div>
                        </div>

                        <div style={InstancesStyles.instanceMods}>
                            <table className="modsTable">
                                <thead>
                                    <tr>
                                        <th>Mod Name</th>
                                        <th>Author</th>
                                        <th>File</th>
                                        <th>Enabled</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        this.state.instance.mods.size <= 0 ? null :
                                            this.state.instance.mods.map(mod => {
                                                return (
                                                    <tr key={mod.name}>
                                                        <td>{mod.name}</td>
                                                        <td>{mod.author}</td>
                                                        <td>{mod.file.replace('.disabled', '')}</td>
                                                        <td>
                                                            <label className='modStatusBox'>
                                                                <input type='checkbox' checked={mod.enabled} onChange={() => this.modifyInstanceMod(mod.name)}/>
                                                                <span className='checkmark'></span>
                                                            </label>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </center>
                </div>
            );
        }
    };

    render() {
        if(!this.state.loaded) {
            return (
                <div style={[NavStyles.content, {display: 'flex', justifyContent: 'center', alignItems: 'center'}]}>
                    <div className="loader"></div>
                </div>
            );
        }

        return(
            <div style={[NavStyles.content, InstancesStyles.instancesPage]}>
                {this.state.contextVisible ? this.ContextMenu() : null}
                {this.state.createInstance ? this.CreateInstance() : null}

                <div style={InstancesStyles.instances}>
                    <center>
                        <input className='instancesSearch' type='text' placeholder='Search' style={InstancesStyles.searchBar} value={this.state.searchText} onChange={(event) => this.setState({searchText: event.target.value})} />

                        {!this.state.searchText.trim() ? this.state.instances.map(this.InstanceItem) : this.SearchItems()}
                        <div key={0} className='instanceItem' style={[InstancesStyles.instanceItem, InstancesStyles.createInstanceItem, {width: 120}]} onClick={() => this.openInstance({id: 0})}>
                            <p>
                                <i className='material-icons'>add_circle_outline</i>
                                <br/>
                                Create Instance
                            </p>
                        </div>
                    </center>
                </div>

                {this.InstanceContent()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {instances: state.modpacks};
};

export default connect(mapStateToProps, {addPack, removePack})(Radium(InstancesScreen));