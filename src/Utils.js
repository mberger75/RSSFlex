export default class Utils {

    static cors(url) {
        return 'https://cors-anywhere.herokuapp.com/' + url;
    }

    static convertDate(pubDate) {
        return 'Le ' + new Date(pubDate)
            .toLocaleString('fr-FR', {timeZone: 'Europe/Paris'});
    }
    
    static getSrcImg(name, ext) {
        return require(`./img/${name}.${ext}`);
    }
    
    static getCurTime(long) {
        let optLong = {
            timeZone: 'Europe/Paris',
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };

       let optShort = {
            timeZone: 'Europe/Paris',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };

        if (long === 'long') {
            return new Date()
                .toLocaleString('fr-FR', optLong)
                .replace('à', '|');
        }
        else {
            return new Date()
                .toLocaleDateString('fr-FR', optShort)
                .replace('à', '\n');
        }
    }
}