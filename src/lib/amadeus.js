// src/lib/amadeus.js
import axios from 'axios';

class AmadeusAPI {
  constructor() {
    this.baseURL = 'https://test.api.amadeus.com/v1';
    this.apiKey = 'hKQcTksZSWT2ujMpwplvkTp7E4U0OZUb';
    this.apiSecret = '8WImA9Y6ufl6TdnH';
    this.token = null;
    this.tokenExpiry = null;
  }

  async getToken() {
    // Check if token exists and is not expired
    if (this.token && this.tokenExpiry && new Date() < this.tokenExpiry) {
      return this.token;
    }

    try {
      const response = await axios({
        method: 'post',
        url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: `grant_type=client_credentials&client_id=${this.apiKey}&client_secret=${this.apiSecret}`
      });

      this.token = response.data.access_token;
      // Set token expiry (subtract 5 minutes to be safe)
      const expiresIn = response.data.expires_in - 300;
      this.tokenExpiry = new Date(new Date().getTime() + expiresIn * 1000);
      
      return this.token;
    } catch (error) {
      console.error('Error getting Amadeus token:', error);
      throw error;
    }
  }

  async searchFlights(params) {
    try {
      const token = await this.getToken();
      
      const response = await axios({
        method: 'get',
        url: `${this.baseURL}/shopping/flight-offers`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          originLocationCode: params.originLocationCode,
          destinationLocationCode: params.destinationLocationCode,
          departureDate: params.departureDate,
          returnDate: params.returnDate,
          adults: params.adults || 1,
          currencyCode: params.currencyCode || 'USD',
          max: params.max || 10
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error searching flights:', error);
      throw error;
    }
  }

  async getAirportSearch(keyword) {
    try {
      const token = await this.getToken();
      
      const response = await axios({
        method: 'get',
        url: `${this.baseURL}/reference-data/locations`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          keyword,
          subType: 'AIRPORT,CITY',
          'page[limit]': 10
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error searching airports:', error);
      throw error;
    }
  }

  async getFlightPrice(flightOfferId) {
    try {
      const token = await this.getToken();
      
      const response = await axios({
        method: 'post',
        url: `${this.baseURL}/shopping/flight-offers/pricing`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: {
          data: {
            type: 'flight-offers-pricing',
            flightOffers: [flightOfferId]
          }
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error getting flight price:', error);
      throw error;
    }
  }
}

export default new AmadeusAPI();
