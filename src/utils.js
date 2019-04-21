const options = {
    timeZone: 'Europe/Paris',
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
};

export const getCurTime = () => {
    return new Date().toLocaleString('fr-FR', options).replace('à', '|');
}

export const convertDate = (pubDate) => {
    return new Date(pubDate).toLocaleDateString('fr-FR', options).replace('à', '|');
}

export const a = {
    b: '_blank',
    r: 'noopener noreferrer'
}