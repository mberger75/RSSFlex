export default class Utils {

    constructor() {
        this.optLong = {
            timeZone: 'Europe/Paris',
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };

       this.optShort = {
            timeZone: 'Europe/Paris',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
    }
    
    static getCurTime(long) {
        if (long === 'long') {
            return new Date()
                .toLocaleString('fr-FR', this.optLong)
                .replace('à', '|');
        }
        else {
            return new Date().toLocaleDateString('fr-FR', this.optShort)
                .replace('à', '\n');
        }
    }
    
    static convertDate(pubDate) {
        return 'Le ' + new Date(pubDate).toLocaleString('fr-FR', {timeZone: 'Europe/Paris'});
    }
    
    static getSrcImg(name, ext) {
        return require(`./img/${name}.${ext}`);
    }
}