import React from 'react';
import Radium from 'radium';
import {addPack, removePack} from './../redux/Actions';
import {connect} from "react-redux";

const ModpackUtils = require('./../utils/ModpackUtils');
const LoaderUtils = require('./../utils/LoaderUtils');
const NavStyles = require('./../styles/NavStyles');
const InstancesStyles = require('./../styles/InstancesStyles');
const GlobalStyles = require('./../styles/GlobalStyles');

class InstancesScreen extends React.Component {

    state = {
        loaded: false,
        //Instance states
        searchText: '',
        instances: [],
        instance: null,
        selectedInstance: null,
        //Context and settings menu positioning and display
        contextVisible: false,
        settingsMenu: false,
        mouseX: 0,
        mouseY: 0,
        //All popup menu and overlay window stuff
        popupMenu: false,
        createInstance: false,
        modifyInstance: false,
        addMods: false,
        //Instance properties
        instanceName: '',
        instanceDesc: '',
        instanceVersion: '',
        instanceAuthor: '',
        fabricVersions: [],
        forgeVersions: []
    };

    componentWillMount() {
        let tempInstances = ModpackUtils.parseInstances();

        tempInstances.forEach(instance => this.props.addPack(instance));
        LoaderUtils.getFabricVersions().then(versions => this.setState({fabricVersions: versions}));
        LoaderUtils.getForgeVersions().then(versions => this.setState({forgeVersions: versions}));
        this.setState({loaded: true, instances: tempInstances});
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick);
        document.addEventListener('keydown', this.handleKey);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
        document.removeEventListener('keydown', this.handleKey);
    }

    handleClick = (event) => {
        const {contextVisible, settingsMenu} = this.state;

        if(contextVisible && (!event.target.id || event.target.id.indexOf('context') <= -1)) {
            this.setState({contextVisible: false, selectedInstance: null});
        }

        if(settingsMenu && (!event.target.id || event.target.id.indexOf('dropdownSettings') <= -1)) {
            this.setState({settingsMenu: false});
        }
    };

    handleKey = (event) => {
        const {popupMenu} = this.state;

        if(event.key === 'Escape' && popupMenu) {
            this.setState({popupMenu: false, createInstance: false, modifyInstance: false})
        }
    };

    openContext = (event, instance) => {
        event.preventDefault();
        this.setState({contextVisible: true, mouseX: event.clientX, mouseY: event.clientY - 30, selectedInstance: instance});
    };

    openInstance = (instance) => {
        this.setState(instance.id === 0 ? {popupMenu: true, createInstance: true} : {instance})
    };

    modifyInstanceMod = (modname) => {
        let {instance, instances} = this.state;

        this.props.removePack(instance);
        let index = instances.indexOf(instance);
        let newInstance = ModpackUtils.toggleMod(instance.id, modname);
        if(~index) {
            instances[index] = newInstance;
        }

        this.props.addPack(newInstance);
        this.setState({instances, instance: newInstance});
    };

    deletePack = (instance) => {
        let {instances} = this.state;

        let index = instances.indexOf(instance);
        if(~index) {
            instances.splice(index, 1);
        }

        this.props.removePack(instance);
        this.setState({instances});
        ModpackUtils.deleteInstance(instance);
    };

    ContextMenu = () => {
        let {mouseX, mouseY, selectedInstance} = this.state;

        return(
            <div id='context' key='context' style={[GlobalStyles.contextMenu, {left: mouseX, top: mouseY}]}>
                <button key='context_play' style={[GlobalStyles.contextItem, {color: 'lightgreen'}]}>Play</button>
                <button key='context_openfolder' style={GlobalStyles.contextItem} onClick={() => ModpackUtils.openInstanceFolder(selectedInstance)}>Open folder</button>
                <hr/>
                <button key='context_delete' style={[GlobalStyles.contextItem, {color: 'red'}]} onClick={() => this.deletePack(selectedInstance)}>Delete</button>
            </div>
        );
    };

    PopupMenu = () => {
        let {createInstance, modifyInstance} = this.state;

        return(
            <div style={InstancesStyles.blurredBackground}>
                {createInstance ? this.CreateInstance() : null}
                {modifyInstance ? this.ModifyInstance() : null}
            </div>
        );
    };

    CreateInstance = () => {
        const {instanceName, instanceDesc, instanceVersion, instanceAuthor, fabricVersions, forgeVersions} = this.state;
        let e = document.getElementById('loaderSelect');
        if(!e) e = {selectedIndex: 0, options: [{value: 'forge'}]};

        return (
            <div style={InstancesStyles.createInstance}>
                <center>
                    <span>
                        Create New Instance
                        <hr style={{border: '2px solid #3DB4F2'}}/>
                    </span>

                    <form onSubmit={(event) => {
                        event.preventDefault();
                        ModpackUtils.createInstance(instanceName, instanceDesc, instanceVersion, instanceAuthor);
                        this.componentWillMount();
                    }}>
                        <input
                            style={InstancesStyles.inputFields}
                            type='text'
                            placeholder='Instance Name'
                            value={instanceName}
                            onChange={(event) => this.setState({instanceName: event.target.value})}
                        />

                        <input
                            style={InstancesStyles.inputFields}
                            type='text'
                            placeholder='Description'
                            value={instanceDesc}
                            onChange={(event) => this.setState({instanceDesc: event.target.value})}
                        />

                        <input
                            style={InstancesStyles.inputFields}
                            type='text'
                            placeholder='Version'
                            value={instanceVersion}
                            onChange={(event) => this.setState({instanceVersion: event.target.value})}
                        />

                        <input
                            style={InstancesStyles.inputFields}
                            type='text'
                            placeholder='Author'
                            value={instanceAuthor}
                            onChange={(event) => this.setState({instanceAuthor: event.target.value})}
                        />

                        <select id='loaderSelect' style={[InstancesStyles.select, {marginRight: '2%'}]}>
                            <option style={InstancesStyles.selectOptions} value='forge'>Forge</option>
                            <option style={InstancesStyles.selectOptions} value='fabric'>Fabric</option>
                        </select>

                        <select style={InstancesStyles.select}>
                            {
                                (e && e.options[e.selectedIndex].value === 'forge' ? forgeVersions : fabricVersions).map(version => {
                                return <option style={InstancesStyles.selectOptions} value={version}>{version}</option>;
                            })}
                        </select>

                        <button style={[InstancesStyles.optionsBtn, {backgroundColor: '#3DB4F2'}]}
                                key='submitCreateInstance' onClick={null}>Submit
                        </button>

                        <button style={[InstancesStyles.optionsBtn, {backgroundColor: '#E85D75'}]}
                                key='cancelCreateInstance'
                                onClick={() => this.setState({popupMenu: false, createInstance: false})}>Cancel
                        </button>
                    </form>

                    <button
                        style={[InstancesStyles.optionsBtn, {backgroundColor: '#14e38d', width: 'auto', marginTop: 10}]}
                        key='importInstance' onClick={null}>Import Instance
                    </button>
                </center>
            </div>
        );
    };

    ModifyInstance = () => {
        return (
            <div style={InstancesStyles.createInstance}>
                <center>
                    <button onClick={() => this.setState({popupMenu: false, modifyInstance: false})}>cancel</button>
                    <br />
                    <p>Modify Instance</p>
                </center>
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
        let {instances, searchText} = this.state;
        let filteredList = [];

        instances.forEach(instance => {
            if(~instance.name.toLowerCase().indexOf(searchText.toLowerCase())) {
                filteredList.push(instance);
            }
        });

        return (
            filteredList.map(this.InstanceItem)
        );
    };

    InstanceContent = () => {
        let {instance, currentInstance, settingsMenu} = this.state;
        let button = document.getElementById('dropdownSettings');
        let buttonPos = button ? button.getBoundingClientRect() : {left: 0, top: 0};

        if(instance) {
            return (
                <div style={InstancesStyles.instancePage}>
                    <center style={{width: '100%', height: '100%'}}>
                        <div style={InstancesStyles.instanceHeaderWrapper}>
                            <div style={InstancesStyles.instanceDesc}>
                                <p style={InstancesStyles.title}>{instance.name}</p>
                                <p style={InstancesStyles.description}>{instance.description ? instance.description : ''}</p>

                                <div style={InstancesStyles.options}>
                                    <button onClick={() => console.log("Clicked Play!")} key='play' style={[InstancesStyles.optionsBtn, {backgroundColor: '#3DB4F2'}]}>Play</button>
                                    <button onClick={() => this.deletePack(currentInstance)} key='delete' style={[InstancesStyles.optionsBtn, {backgroundColor: '#E85D75'}]}>Delete</button>


                                        <button onClick={() => this.setState({settingsMenu: !settingsMenu})} id='dropdownSettings' key='settings' style={[InstancesStyles.optionsBtn, {backgroundColor: '#E85D75', width: 'auto'}]}>...</button>

                                        {
                                            settingsMenu ?
                                            <div style={[GlobalStyles.contextMenu, {left: buttonPos.left, top: buttonPos.top + 8}]}>
                                                <button style={GlobalStyles.contextItem} key='addMods' onClick={() => console.log("Clicked add Mods!")}>Add Mods</button>
                                                <button style={GlobalStyles.contextItem} key='refresh' onClick={() => this.componentWillMount()}>Refresh Instance</button>
                                                <button style={GlobalStyles.contextItem} key='settingsSubItem' onClick={() => this.setState({popupMenu: true, modifyInstance: true})}>Settings</button>
                                            </div> : null
                                        }

                                </div>
                            </div>

                            <div style={InstancesStyles.logoWrapper}>
                                <img src={instance.logo} style={InstancesStyles.instanceLogo} alt='' />
                                <p>{instance.author}<br/>V{instance.version}</p>
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
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        instance.mods.size <= 0 ? null :
                                            instance.mods.map(mod => {
                                                let modExists = ModpackUtils.doesModExist(instance.id, mod.file);
                                                return (
                                                    <tr key={mod.name}>
                                                        <td style={modExists ? null : {color: 'red'}}>{mod.name}</td>
                                                        <td style={modExists ? null : {color: 'red'}}>{mod.author}</td>
                                                        <td>{modExists ? mod.file.replace('.disabled', '') : <span style={{color: 'red'}}>Missing: {mod.file}</span>}</td>
                                                        <td>
                                                            {modExists ?
                                                                <label className='modStatusBox'>
                                                                    <input type='checkbox' checked={mod.enabled}
                                                                           onChange={() => this.modifyInstanceMod(mod.name)}/>
                                                                    <span className='checkmark'></span>
                                                                </label> : null
                                                            }
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
        let {loaded, contextVisible, instances, searchText, popupMenu} = this.state;

        if(!loaded) {
            return (
                <div style={[NavStyles.content, {display: 'flex', justifyContent: 'center', alignItems: 'center'}]}>
                    <div className="loader"></div>
                </div>
            );
        }

        return(
            <div style={[NavStyles.content, InstancesStyles.instancesPage]}>
                {contextVisible ? this.ContextMenu() : null}
                {popupMenu ? this.PopupMenu() : null}

                <div style={InstancesStyles.instances}>
                    <center>
                        <input className='instancesSearch' type='text' placeholder='Search' style={InstancesStyles.searchBar} value={searchText} onChange={(event) => this.setState({searchText: event.target.value})} />

                        {!searchText.trim() ? instances.map(this.InstanceItem) : this.SearchItems()}
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