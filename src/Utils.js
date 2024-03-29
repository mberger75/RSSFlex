export default class Utils {

    static cors(url) {
        return 'https://cors-anywhere.herokuapp.com/' + url;
    }
}

export class Time {

    static beautify(pubDate) {
        if (String(new Date(pubDate)) !== 'Invalid Date') {
            return 'Le ' + new Date(pubDate)
                .toLocaleString('fr-FR', {timeZone: 'Europe/Paris'});
        }
        else {
            return false;
        }
    }

    static now() {
       let options = {
            timeZone: 'Europe/Paris',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };

        return new Date()
            .toLocaleDateString('fr-FR', options)
            .replace('à', '-');
    }
}