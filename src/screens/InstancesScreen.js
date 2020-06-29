import React from 'react';
import {
    Button,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    MuiThemeProvider,
    Typography,
    withStyles,
    FormControlLabel,
    Checkbox,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select
} from "@material-ui/core";
import {AddCircle, MoreVert, Search} from "@material-ui/icons";
import Fuse from "fuse.js";
import {addPack, removePack} from './../redux/Actions';
import {connect} from "react-redux";
import {defaultTheme} from "../styles/Theme";
import {InstancesStyles} from "../styles/InstancesStyles";
import {doesModExist, toggleMod, openInstanceFolder, deleteInstance} from "../utils/ModpackUtils";
import {sortVersions} from "../utils/KrakenUtils";

const searchOptions = {
    findAllMatches: true,
    distance: 100,
    keys: ['name']
};

class InstancesScreen extends React.Component {

    state = {
        searchText: '',
        selectedInstance: null,
        loaded: false,
        mouseX: null,
        mouseY: null,
        contextMenuInstance: null,
        createInstanceDialog: false,
        selectedLoader: 'vanilla',
        minecraftVersion: '',
        loaderVersion: ''
    };

    componentDidMount() {
        this.setState({minecraftVersion: sortVersions(this.props.loaders['vanilla'].versions)[0]}, () => this.setState({loaded: true}));
    }

    openInstance = (instance) => {
        this.setState({selectedInstance: instance});
    };

    modifyInstanceMod = (modName) => {
        let {selectedInstance} = this.state;

        this.props.removePack(selectedInstance);
        let newInstance = toggleMod(selectedInstance.id, modName);
        this.props.addPack(newInstance);
        this.setState({selectedInstance: newInstance});
    };

    handleRightClick = (event, instance) => {
        event.preventDefault();
        this.setState({mouseX: event.clientX - 2, mouseY: event.clientY - 4, contextMenuInstance: instance});
    };

    deleteModpack = (instance) => {
        this.props.removePack(instance);
        deleteInstance(instance);
    };

    closeContextMenu = () => {
        this.setState({contextMenuInstance: null});
    };

    SearchItems = () => {
        let {searchText} = this.state;
        let {instances} = this.props;

        return new Fuse(instances, searchOptions).search(searchText).map(result => this.InstanceItem(result.item));
    };

    InstanceItem = (instance) => {
        let {selectedInstance} = this.state;
        let {classes} = this.props;
        let isSelected = selectedInstance && selectedInstance.id === instance.id;

        return (
            <div key={instance.id} className={classes.instanceContainer} onContextMenu={event => this.handleRightClick(event, instance)} onClick={() => this.openInstance(instance)}>
                <div className={isSelected ? classes.instanceBorder : ''}>
                    <div className={classes.instanceItem}>
                        <img style={{width: '100%', height: '100%', borderRadius: 8}} src={instance.logo} alt='' />
                    </div>
                </div>

                <Typography style={{marginTop: 5}} variant='body1'>{instance.name}</Typography>
            </div>
        );
    };

    CreateInstanceDialog = () => {
        let {createInstanceDialog, selectedLoader} = this.state;
        let {classes, loaders} = this.props;

        return (
            <Dialog PaperProps={{className: classes.createInstanceDialog}} open={createInstanceDialog} onClose={() => this.setState({addDriverDialog: false})}>
                <DialogTitle>
                    Create Modpack Instance
                    <br />
                    <Button>Import Instance</Button>
                </DialogTitle>

                <DialogContent>
                    <TextField label='Name' variant='outlined' />
                    <TextField label='Description' variant='outlined' />
                    <TextField label='Version' variant='outlined' />

                   <FormControl className={classes.select}>
                        <InputLabel id='launcher-type'>Loader Type</InputLabel>
                        <Select
                            id='launcher-type'
                            labelId='launcher-type'
                            value={selectedLoader}
                            onChange={event => this.setState({selectedLoader: event.target.value})}
                            input={<Input />}
                        >
                            {Object.keys(loaders).map(loader => <MenuItem value={loader} id={loader}>{loaders[loader].name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => this.setState({createInstanceDialog: false})}>Cancel</Button>
                    <Button>Create Instance</Button>
                </DialogActions>
            </Dialog>
        );
    };

    render() {
        let {searchText, loaded, selectedInstance, contextMenuInstance, mouseX, mouseY, createInstanceDialog} = this.state;
        let {classes, instances} = this.props;

        if(!loaded) {
            return (
                <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <div className="loader"></div>
                    <h2>Loading...</h2>
                </div>
            );
        }

        return(
            <MuiThemeProvider theme={defaultTheme.main}>
                <div className={classes.container}>
                    {this.CreateInstanceDialog()}

                    <div className={classes.instancesContainer}>
                        <FormControl style={{width: '90%'}}>
                            <InputLabel htmlFor='instances-search'>Search</InputLabel>
                            <Input id='instances-search' startAdornment={<InputAdornment><Search /></InputAdornment>} onChange={(event) => this.setState({searchText: event.target.value})} />
                        </FormControl>

                        {!searchText.trim() ? instances.map(this.InstanceItem) : this.SearchItems()}
                        <div onClick={() => this.setState({createInstanceDialog: true})} className={classes.createInstanceItem}>
                            <AddCircle fontSize='large' />
                            <Typography>Create Instance</Typography>
                        </div>
                    </div>

                    <div className={selectedInstance != null ? classes.instancePageAnimation : classes.instancePage}>
                        {selectedInstance !== null ? <InstancePage instance={selectedInstance} modifyInstanceMod={this.modifyInstanceMod} refreshInstance={this.componentDidMount} /> : null}
                    </div>

                    <Menu
                        keepMounted
                        open={contextMenuInstance != null}
                        onClose={this.closeContextMenu}
                        anchorReference='anchorPosition'
                        anchorPosition={mouseY != null && mouseX != null ? {top: mouseY, left: mouseX} : undefined}
                        className={classes.contextMenu}
                    >
                        <MenuItem className={classes.successText} onClick={this.closeContextMenu}>Play</MenuItem>
                        <MenuItem onClick={() => {
                            this.closeContextMenu();
                            openInstanceFolder(contextMenuInstance);
                        }}>Open Folder</MenuItem>
                        <MenuItem className={classes.errorText} onClick={() => {
                            this.closeContextMenu();
                            this.deleteModpack(contextMenuInstance);
                        }}>Delete</MenuItem>
                    </Menu>
                </div>
            </MuiThemeProvider>
        );
    }
}

class InstancePage extends React.Component {

    state = {
        settingsMenu: null
    };

    render() {
        let {settingsMenu} = this.state;
        let {instance, classes, modifyInstanceMod, refreshInstance} = this.props;

        return (
            <MuiThemeProvider theme={defaultTheme.main}>
                <div className={classes.instanceHeader}>
                    <Button className={classes.playBtn}>Play</Button>
                    <Button className={classes.moreBtn} onClick={(event) => this.setState({settingsMenu: event.currentTarget})}><MoreVert /></Button>
                </div>

                <div className={classes.instanceBody}>
                    <img className={classes.pageLogo} src={instance.logo} alt='' />

                    <Typography variant='h5'>{instance.name}</Typography>
                    {instance.author ? <Typography variant='subtitle2'>By: {instance.author}</Typography> : null}
                    <Typography style={{textTransform: 'capitalize'}} variant='subtitle2'>(Launcher: {instance.launcher.loader}, Minecraft: {instance.launcher.minecraft}, Version: {instance.version})</Typography>
                    <br />
                    <Typography>{instance.description}</Typography>
                </div>

                <div className={classes.instanceMods}>
                    <table className='modsTable'>
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
                                instance.mods.size <= 0 ? null : instance.mods.map(mod => {
                                    let modExists = doesModExist(instance.id, mod.file);

                                    return (
                                        <tr key={mod.name}>
                                            <td style={{verticalAlign: 'middle'}} className={modExists ? null : classes.errorText}>{mod.name}</td>
                                            <td style={{verticalAlign: 'middle'}} className={modExists ? null : classes.errorText}>{mod.author}</td>
                                            <td style={{verticalAlign: 'middle'}} className={modExists ? null : classes.errorText}>
                                                {modExists ? mod.file.replace('.disabled', '') : mod.file}
                                            </td>
                                            <td style={{animation: 'growItems .50s'}}>{modExists ?
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={mod.enabled}
                                                            onChange={() => modifyInstanceMod(mod.name)}
                                                            color='primary'
                                                            name=''
                                                        />
                                                    }
                                                    label=''
                                                />: <span className={classes.errorText}>Missing Mod File!</span>}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <Menu
                    open={Boolean(settingsMenu)}
                    anchorEl={settingsMenu}
                    onClose={() => this.setState({settingsMenu: null})}
                    elevation={0}
                    getContentAnchorEl={undefined}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    transformOrigin={{vertical: 'top', horizontal: 'left'}}
                >
                    <MenuItem onClick={() => {this.setState({settingsMenu: null})}}>Add Mods</MenuItem>
                    <MenuItem onClick={refreshInstance}>Refresh Instance</MenuItem>
                    <MenuItem onClick={() => {this.setState({settingsMenu: null})}}>Settings</MenuItem>
                </Menu>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {instances: state.modpacks, loaders: state.loaders};
};

InstancesScreen = connect(mapStateToProps, {addPack, removePack})(InstancesScreen);
InstancePage = withStyles(InstancesStyles)(InstancePage);
export default withStyles(InstancesStyles)(InstancesScreen);