const twilio = require('twilio');
const requestPromise = require('request-promise');
const accountSID = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const authToken = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const client = new twilio(accountSID, authToken);
var phoneNumbers = ['+1917xxxxxxx', '+1917xxxxxxx'];
var overallWeather;

const options = {
    url: 'http://api.openweathermap.org/data/2.5/forecast?id=5128581&APPID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&units=imperial'
};

function callback (error, response, body) {

    if (!error && response.statusCode == 200) {
        var weatherData = JSON.parse(body);
        overallWeather = dailyWeather(weatherData);
        //console.log(overallWeather);
        return overallWeather;

    } else {
        console.log('Something went wrong!');
    }

}

function dailyWeather(weatherData) {

    var temperatureString = 'Current temperature: ';
    var temperatureData = weatherData.list[0].main.temp.toString() + ' degrees fahrenheit';
    var temperaturePackage = temperatureString + temperatureData;

    var atmosphericString = 'Current atmopsheric condition: ';
    var atmosphericDescription = weatherData.list[0].weather[0].description;
    atmosphericDescription = atmosphericDescription.replace(atmosphericDescription.charAt(0),atmosphericDescription.charAt(0).toUpperCase());
    var atmosphericPackage = atmosphericString + atmosphericDescription;

    return temperaturePackage + "\n" + "\n" + atmosphericPackage;
}

function sendMessage() {

    for (var i = 0; i < 2; i++) {

        client.messages.create({
            body: overallWeather,
            from:'+xxxxxxxxxxx',
            to: phoneNumbers[i],
        }).then(message => console.log(message.sid));

    }

}

requestPromise(options, callback).then(sendMessage);