import React from 'react';
import Radium from 'radium';

const request = require('request');
const KrakenUtils = require('./../utils/KrakenUtils');
const NavStyles = require('./../styles/NavStyles');
const GlobalStyles = require('./../styles/GlobalStyles');
const HomeStyles = require('./../styles/HomeStyles');

const discordLink = 'https://discord.gg/WX2HaZy';
const issuesLink = 'https://github.com/NerdHubMC/Kraken-Launcher/issues';
const newsLink = 'https://raw.githubusercontent.com/NerdHubMC/Kraken-Launcher/master/news.md';

class HomeScreen extends React.Component {

    state = {
        news: ''
    };

    openLink = (link) => {
        require('electron').remote.shell.openExternal(link);
    };

    componentWillMount() {
        request(newsLink, (err, res, body) => KrakenUtils.getNews(this.updateNews, err, res, body));
    }

    updateNews = (html) => {
        this.setState({news: html});
    };

    render() {
        const {news} = this.state;

        return(
            <div style={[NavStyles.content, {overflowY: 'hidden'}]}>
                <div style={HomeStyles.mainContent}>
                    <div style={HomeStyles.news}>
                        <div dangerouslySetInnerHTML={{__html: news}} />
                    </div>

                    <div style={HomeStyles.links}>
                        <div onClick={() => this.openLink(discordLink)} key='discord' style={[HomeStyles.link, {backgroundImage: 'url(/assets/images/discord_background.png)', backgroundSize: 'cover'}]}>
                            <img style={{width: '100%', height: 'calc(100% - 136)'}} src='/assets/images/discord_logo.png' alt='' />
                        </div>

                        <div onClick={() => this.openLink(issuesLink)} key='issues' style={[HomeStyles.link, {backgroundImage: 'url(/assets/images/issues_background.png)', backgroundSize: 'cover', marginLeft: 25}]}>
                            <img style={{width: '50%', float: 'left'}} src='/assets/images/logo.png' alt='' />

                            <span style={{display: 'inline-block', width: '50%', float: 'right'}}>
                                <p style={HomeStyles.issuesTitle}>Issue<br />Tracker</p>
                            </span>
                        </div>
                    </div>
                </div>

                <div style={{height: 25, marginRight: 25, width: 200, float: 'right', textAlign: 'center'}}>
                    <span style={HomeStyles.trendingTitle}>Trending Packs:</span>
                </div>

                <div style={HomeStyles.featuredContent}>
                    <div style={[HomeStyles.featuredPack, {backgroundImage: 'url(https://media.forgecdn.net/avatars/199/573/636907930795697123.png)', backgroundSize: 'cover', marginBottom: 32.5}]}>
                        <button key='featureOne' style={[GlobalStyles.optionsBtn, {backgroundColor: '#3DB4F2', margin: '0 auto', fontWeight: 'bold', marginBottom: 10}]}>Install</button>
                    </div>

                    <div style={[HomeStyles.featuredPack, {backgroundImage: 'url(https://media.forgecdn.net/avatars/136/944/636511227443004307.png)', backgroundSize: 'cover', marginBottom: 32.5}]}>
                        <button key='featureTwo' style={[GlobalStyles.optionsBtn, {backgroundColor: '#3DB4F2', margin: '0 auto', marginBottom: 10}]}>Install</button>
                    </div>

                    <div style={[HomeStyles.featuredPack, {backgroundImage: 'url(https://media.forgecdn.net/avatars/147/67/636574428512291945.png)', backgroundSize: 'cover'}]}>
                        <button key='featureThree' style={[GlobalStyles.optionsBtn, {backgroundColor: '#3DB4F2', margin: '0 auto', marginBottom: 10}]}>Install</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Radium(HomeScreen);