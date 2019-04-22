const optLong = {
    timeZone: 'Europe/Paris',
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
};

const optShort = {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
};

export const getCurTime = (long) => {
    if (long === 'long') {
        return new Date().toLocaleString('fr-FR', optLong).replace('à', '|');
    }
    else {
        return new Date().toLocaleDateString('fr-FR', optShort).replace('à', '\n');
    }
}

export const convertDate = (pubDate) => {
    return 'Le ' + new Date(pubDate).toLocaleDateString('fr-FR', optShort);
}

export const getSrcImg = (name, ext) => {
    return require(`./img/${name}.${ext}`);
}

export const a = {
    b: '_blank',
    r: 'noopener noreferrer'
}