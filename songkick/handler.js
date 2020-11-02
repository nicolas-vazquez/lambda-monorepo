'use strict';

const axios = require('axios');
const _ = require('lodash');

module.exports.getArtisTours = async event => {
  try {
    const response = await axios.get("https://api.songkick.com/api/3.0/events.json", {
      params: {
        apikey: process.env.API_KEY,
        artist_name: decodeURIComponent(event.pathParameters.name)
      }
    });
    return {
      statusCode: 200,
      body: JSON.stringify(mapResultsAndNext(response.data.resultsPage))
    }
  } 
  catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
};

const mapResultsAndNext = data => {
  return _.get(data, 'results.event', []).map(event => (
    {
      id: event.id.toString(),
      date: `${event.start.date}T${event.start.time || "00:00:00"}`,
      ticket_status: event.status,
      ticket_url: event.uri,
      location: {
        place: event.venue.displayName,
        country: event.venue.metroArea.country.displayName,
        region: event.venue.region,
        city: event.location.city,
        latitude: event.location.lat,
        longitude: event.location.lng
      },
      artists: _.map(event.performance, 'displayName').join(', ')
    } 
  ));
};
