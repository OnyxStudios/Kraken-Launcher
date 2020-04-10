import React from 'react';
import {MuiThemeProvider, withStyles} from "@material-ui/core";
import {HomeStyles} from "../styles/HomeStyles";
import {defaultTheme} from "../styles/Theme";
const request = require('request');
const KrakenUtils = require('./../utils/KrakenUtils');

const discordLink = 'https://discord.gg/92pf3WY';
const issuesLink = 'https://github.com/OnyxStudios/Kraken-Launcher/issues';
const onyxLink = 'https://onyxstudios.dev/';
const newsLink = 'https://raw.githubusercontent.com/OnyxStudios/Kraken-Launcher/master/news.md';

class HomeScreen extends React.Component {

    state = {
        news: ''
    };

    openLink = (link) => {
        require('electron').remote.shell.openExternal(link);
    };

    componentDidMount() {
        request(newsLink, (err, res, body) => KrakenUtils.getNews(this.updateNews, err, res, body));
    }

    updateNews = (html) => {
        this.setState({news: html});
    };

    render() {
        let {news} = this.state;
        let {classes} = this.props;

        return(
            //Add in issue page link and discord server link buttons
            <MuiThemeProvider theme={defaultTheme.main}>
                <div className={classes.container}>
                    <div className={classes.featuredPacks}>
                        <div className={classes.pack} style={{backgroundImage: 'url(https://media.forgecdn.net/avatars/199/573/636907930795697123.png)'}}>
                            <button className={classes.installBtn}>Install</button>
                        </div>

                        <div className={classes.marginPack} style={{backgroundImage: 'url(https://media.forgecdn.net/avatars/136/944/636511227443004307.png)'}}>
                            <button className={classes.installBtn}>Install</button>
                        </div>

                        <div className={classes.pack} style={{backgroundImage: 'url(https://media.forgecdn.net/avatars/147/67/636574428512291945.png)'}}>
                            <button className={classes.installBtn}>Install</button>
                        </div>
                    </div>

                    <div className={classes.mainContent}>
                        <div className={classes.news}>
                            <div dangerouslySetInnerHTML={{__html: news}} />
                        </div>

                        <div className={classes.links}>
                            <div className={classes.link} onClick={() => this.openLink(discordLink)}>
                                <img style={{maxWidth: 180, maxHeight: 180}} src='/assets/images/discord.png' alt='' />
                            </div>

                            <div className={classes.link} onClick={() => this.openLink(onyxLink)}>
                                <img style={{maxWidth: 180, maxHeight: 180}} src='/assets/images/OnyxWhite.png' alt='' />
                            </div>

                            <div className={classes.link} onClick={() => this.openLink(issuesLink)}>
                                <img style={{maxWidth: 180, maxHeight: 180}} src='/assets/images/github_light.png' alt='' />
                            </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(HomeStyles)(HomeScreen);