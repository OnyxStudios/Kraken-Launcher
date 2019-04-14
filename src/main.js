let content = new Vue({
    el: '#content',
    data: {
        home: true,
        instances: false,
        modpacks: false
    }
});

let navbar = new Vue({
    el: '#navbar',
    data: {
        isHome: true,
        isInstances: false,
        isModpacks: false
    }
});

function switchTab(tab) {
    invalidateAll();

    switch (tab) {
        case 'instances':
            content.instances = true;
            navbar.isInstances = true;
            break;
        case 'modpacks':
            content.modpacks = true;
            navbar.isModpacks = true;
            break;
        case 'home':
        default:
            content.home = true;
            navbar.isHome = true;
            break;
    }
}

function invalidateAll() {
    content.home = false;
    content.modpacks = false;
    content.instances = false;
    navbar.isHome = false;
    navbar.isInstances = false;
    navbar.isModpacks = false;
}