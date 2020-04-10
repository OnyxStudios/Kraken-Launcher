import React from 'react';
import {MuiThemeProvider, withStyles, FormControl, Input, InputAdornment, InputLabel, Typography} from "@material-ui/core";
import {Search, AddCircle} from "@material-ui/icons";
import Fuse from "fuse.js";
import {defaultTheme} from "../styles/Theme";
import {InstancesStyles} from "../styles/InstancesStyles";
import {parseInstances} from "../utils/ModpackUtils";

const searchOptions = {
    findAllMatches: true,
    distance: 100,
    keys: ['name']
};

class InstancesScreen extends React.Component {

    state = {
        searchText: '',
        instances: [],
        selectedInstance: null,
        loaded: false
    };

    componentDidMount() {
        this.setState({instances: parseInstances()}, () => this.setState({loaded: true}));
    }

    SearchItems = () => {
        let {searchText, instances} = this.state;
        let fuse = new Fuse(instances, searchOptions);

        return fuse.search(searchText).map(result => this.InstanceItem(result.item));
    };

    InstanceItem = (instance) => {
        let {selectedInstance} = this.state;
        let {classes} = this.props;
        let isSelected = selectedInstance && selectedInstance.id === instance.id;

        return (
            <div key={instance.id} className={classes.instanceContainer} onClick={() => this.openInstance(instance)}>
                <div className={isSelected ? classes.instanceBorder : ''}>
                <div className={isSelected ? classes.selectedInstance : classes.instanceItem}>
                    <img style={{width: '100%', height: '100%', borderRadius: 8}} src={instance.logo} alt='' />
                </div>
                </div>

                <Typography style={{marginTop: 5}} variant='body1'>{instance.name}</Typography>
            </div>
        );
    };

    openInstance = (instance) => {
        this.setState({selectedInstance: instance});
    };

    render() {
        let {searchText, instances, loaded} = this.state;
        let {classes} = this.props;

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
                    <div className={classes.instancesContainer}>
                        <FormControl style={{width: '90%'}}>
                            <InputLabel htmlFor='instances-search'>Search</InputLabel>
                            <Input id='instances-search' startAdornment={<InputAdornment><Search /></InputAdornment>} onChange={(event) => this.setState({searchText: event.target.value})} />
                        </FormControl>

                        {!searchText.trim() ? instances.map(this.InstanceItem) : this.SearchItems()}
                        <div className={classes.createInstanceItem}>
                            <AddCircle fontSize='large' />
                            <Typography>Create Instance</Typography>
                        </div>
                    </div>

                    <div className={classes.instancePage}>

                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(InstancesStyles)(InstancesScreen);