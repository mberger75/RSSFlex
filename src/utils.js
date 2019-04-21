export const getCurTime = () => {
    let options = {
        timeZone: 'Europe/Paris',
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    return new Date().toLocaleString('fr-FR', options).replace('à', '|');
}

export const a = {
    b: '_blank',
    r: 'noopener noreferrer'
}