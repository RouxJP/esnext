let favoriteCityId = 'rome' 
console.log(favoriteCityId)
favoriteCityId = 'paris'
console.log(favoriteCityId)

const citiesId = ['paris', 'nyc', 'rome', 'rio-de-janero']
console.log(...citiesId)

//citiesId = {}
citiesId.push('tokyo')
console.log(...citiesId)


// Créer objet
function getWeather(cityId) {
    let city = cityId.toUpperCase()
    let temperature = 20
    console.log(city + '-' + temperature)

    return { city: city, temperature: temperature }
}

const getW = getWeather('favoriteCityId')
console.log(getW)

const { city } = getW
const { temperature } = getW

// Affectation destructurée
console.log(city)
console.log(temperature)

// Rest operator
const [parisId, nycId, ...othersCitiesId] = citiesId
console.log('parisId : ' + parisId)
console.log('nycId : ' + nycId)
console.log('othersCitiesId.length : ' + othersCitiesId.length)


// Classe
class Trip {
    static getDefaultTrip() {
        return new Trip('rio-de-janero', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg');
    }

    constructor(id, name, imageUrl) {
        this.id = id
        this.name = name
        this.imageUrl = imageUrl
    }

    get price() {
        return this._price
    }

    set price(valeur) {
        this._price = valeur
    }

    toString() {
        console.log('Trip [ ' + this.id + ', ' + this.name + ', ' + this.imageUrl + ']')
    }
}

// Héritage
class FreeTrip extends Trip {
    constructor(id, name, imageUrl, price = 0) {
        super(id, name, imageUrl)
        this.price = price
    }

    toString() {
        return `Free${super.toString()}`;
    }    
}

parisTrip1 = { id: 'paris', name: 'Paris', imageUrl: 'img/paris.jpg' }
parisTrip2 = new Trip('paris', 'Paris', 'img/paris.jpg')
console.log(parisTrip1)
console.log(parisTrip2)
parisTrip2.toString();

parisTrip2.price = 100
parisTrip2.toString();


const defaultTrip = Trip.getDefaultTrip()
console.log('-------')
console.log(defaultTrip)
console.log('-------')

const freeTrip = new FreeTrip('nantes', 'Nantes', 'img/nantes.jpg')
console.log(freeTrip)




// Promise, Set, Map, Arrow
class TripService {
    constructor() {
        // new Trip('paris', 'Paris', 'img/paris.jpg')
        // new Trip('nantes', 'Nantes', 'img/nantes.jpg')
        // new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg
        this.trips = new Set();
        this.trips.add(new Trip('paris', 'Paris', 'img/paris.jpg'))
        this.trips.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'))
        this.trips.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'))

    }

    findByName(tripName) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                //console.log("debut code asynchrone")

                for (const trip of this.trips) {
                    //console.log( trip.name)

                    if (trip.name === tripName) {
                        console.log( trip)
                        resolve(trip);

                    }

                }
                // Promesse retournée : non trouvée 
                reject('No trip with name ' + tripName)
                //console.log("fin code asynchrone")

            }, 1000)
        });
    }

    toString() {

        return `Free${super.toString()}`;

    }

}

class PriceService {
    constructor() {
        // TODO Map of 2 trips
        // 'paris' --> price == 100
        // 'rio-de-janeiro' --> price == 800)
        // no price for 'nantes'
        this.prices = new Map();
        this.prices.set('paris', 100)
        this.prices.set('rio-de-janeiro', 800)
    }
    findPriceByTripId(tripId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // ici l'exécution du code est asynchrone
                // TODO utiliser resolve et reject en fonction du résultat de
                //la recherche
                const price = this.prices.get(tripId);

                if (price) {
                    resolve(price);
                } else {
                    reject(`No price for trip id ${tripId}`);
                }

            }, 2000)
        });
    }
}
/*
console.log('--- Test Promesse ----')
TripService1 = new TripService();
TripService1.findByName( 'Paris')
*/

console.log('--- Test Promesse ----')
const TripService2 = new TripService();

TripService2.findByName("Paris")
    .then(tripFind => console.log(`Trip found : ${tripFind}`))
    .catch(err => console.log(err));

TripService2.findByName("Toulouse")
    .then(tripFind => console.log(`Trip found : ${tripFind}`))
    .catch(err => console.log(err)); // là


const priceService = new PriceService();
priceService.findPriceByTripId("rio-de-janeiro")
    .then(priceFound => console.log(`Price found : ${priceFound}`)) // ici
    .catch(err => console.log(err));

priceService.findPriceByTripId("nantes")
    .then(tripFind => console.log(`Price found : ${tripFind}`))
    .catch(err => console.log(err)); // là


// du nom au prix
// nom => findByName => id => findById => prix
const nomVoyage = 'Paris';
const TripService3 = new TripService();
TripService3.findByName(nomVoyage)
    .then(trip => trip.id)
    .then(tripId => priceService.findPriceByTripId(tripId))
    .then(price => console.log(`Price Found ${price} for ${nomVoyage}`))
    .catch(err => console.log(err));
