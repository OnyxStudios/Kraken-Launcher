import React from 'react';
import Radium from 'radium';

const NavStyles = require('./../styles/NavStyles');
const GlobalStyles = require('./../styles/GlobalStyles');
const HomeStyles = require('./../styles/HomeStyles');
const discordLink = 'https://discord.gg/WX2HaZy';
const issuesLink = 'https://github.com/NerdHubMC/Kraken-Launcher/issues';

class HomeScreen extends React.Component {

    openLink = (link) => {
        require('electron').remote.shell.openExternal(link);
    };

    render() {
        return(
            <div style={NavStyles.content}>
                <div style={HomeStyles.mainContent}>
                    <div style={HomeStyles.news}>
                        <h1>News Here</h1>
                    </div>

                    <div style={HomeStyles.links}>
                        <div onClick={() => this.openLink(discordLink)} key='discord' style={[HomeStyles.link, {backgroundImage: 'url(/assets/images/discord_background.png)', backgroundSize: 'cover', float: 'left'}]}>
                            <img style={{width: '100%', height: 136, marginTop: 32}} src='/assets/images/discord_logo.png' alt='' />
                        </div>

                        <div onClick={() => this.openLink(issuesLink)} key='issues' style={[HomeStyles.link, {backgroundImage: 'url(/assets/images/issues_background.png)', backgroundSize: 'cover', float: 'right'}]}>
                            <img style={{width: '50%', height: '100%', float: 'left'}} src='/assets/images/logo.png' alt='' />
                            <span style={{display: 'inline-block', verticalAlign: 'middle', width: '50%', float: 'right'}}>
                                <p style={HomeStyles.issuesTitle}>Issue<br />Tracker</p>
                            </span>
                        </div>
                    </div>
                </div>

                <div style={{height: 25, marginRight: 25, width: 200, float: 'right', textAlign: 'center'}}>
                    <span style={HomeStyles.trendingTitle}>Trending Packs:</span>
                </div>

                <div style={HomeStyles.featuredContent}>
                    <div style={[HomeStyles.featuredPack, {backgroundImage: 'url(https://media.forgecdn.net/avatars/199/573/636907930795697123.png)', backgroundSize: 'cover', marginBottom: 37.5}]}>
                        <button key='featureOne' style={[GlobalStyles.optionsBtn, {backgroundColor: '#3DB4F2', margin: '0 auto', fontWeight: 'bold', marginBottom: 10}]}>Install</button>
                    </div>

                    <div style={[HomeStyles.featuredPack, {backgroundImage: 'url(https://media.forgecdn.net/avatars/136/944/636511227443004307.png)', backgroundSize: 'cover', marginBottom: 37.5}]}>
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