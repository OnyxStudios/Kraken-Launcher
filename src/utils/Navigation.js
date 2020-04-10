import React from "react";
import {ListItem, ListItemText, ListItemIcon, Typography} from "@material-ui/core";
import {Dashboard, Games, Settings, ViewList} from "@material-ui/icons";
import HomeScreen from "../screens/HomeScreen";
import InstancesScreen from "../screens/InstancesScreen";
import CursePacksScreen from "../screens/CursePacksScreen";
import SettingsScreen from "../screens/SettingsScreen";

let Navigation = [
    {
        name: 'Home',
        screen: HomeScreen,
        icon: Dashboard
    },
    {
        name: 'Instances',
        screen: InstancesScreen,
        icon: Games
    },
    {
        name: 'Curse Modpacks',
        screen: CursePacksScreen,
        icon: ViewList
    },
    {
        name: 'Settings',
        screen: SettingsScreen,
        icon: Settings
    }
];

function renderNavigation(navigate, active) {
    return Navigation.map(option => {
        let screen = option.screen;
        let name = option.name;
        let Icon = option.icon;

        return (
            <ListItem button key={name} selected={active === name} onClick={() => navigate(screen, name)}>
                <ListItemIcon><Typography color={active === name ? 'textPrimary' : 'textSecondary'}><Icon /></Typography></ListItemIcon>
                <ListItemText><Typography color={active === name ? 'textPrimary' : 'textSecondary'}>{option.name}</Typography></ListItemText>
            </ListItem>
        );
    })
}

export {Navigation, renderNavigation};