import { Injectable } from '@angular/core';
import { Itinerary } from '../models/itinerary.model';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  private itineraries: Itinerary[] = [
    // India
    {
      id: '1',
      country: 'India',
      place: 'Goa',
      foodPreference: 'Both',
      activities: ['Beach Sports', 'Water Skiing', 'Nightlife'],
      hotel: { type: '5-Star Resort', nights: 3 },
      flightCharges: 15000,
      totalCost: 45000
    },
    {
      id: '2',
      country: 'India',
      place: 'Kerala',
      foodPreference: 'Veg',
      activities: ['Backwater Cruise', 'Ayurveda Spa', 'Tea Plantation'],
      hotel: { type: 'Houseboat', nights: 2 },
      flightCharges: 12000,
      totalCost: 35000
    },
    {
      id: '3',
      country: 'India',
      place: 'Rajasthan',
      foodPreference: 'Veg',
      activities: ['Desert Safari', 'Palace Tours', 'Camel Riding'],
      hotel: { type: 'Heritage Hotel', nights: 4 },
      flightCharges: 18000,
      totalCost: 52000
    },
    {
      id: '4',
      country: 'India',
      place: 'Himachal Pradesh',
      foodPreference: 'Both',
      activities: ['Trekking', 'Paragliding', 'Mountain Biking'],
      hotel: { type: 'Mountain Resort', nights: 5 },
      flightCharges: 16000,
      totalCost: 48000
    },
    
    // Thailand
    {
      id: '5',
      country: 'Thailand',
      place: 'Bangkok',
      foodPreference: 'Non-Veg',
      activities: ['Temple Tours', 'Street Food', 'Shopping'],
      hotel: { type: '4-Star Hotel', nights: 4 },
      flightCharges: 25000,
      totalCost: 55000
    },
    {
      id: '6',
      country: 'Thailand',
      place: 'Phuket',
      foodPreference: 'Both',
      activities: ['Island Hopping', 'Scuba Diving', 'Beach Relaxation'],
      hotel: { type: 'Beach Resort', nights: 5 },
      flightCharges: 28000,
      totalCost: 65000
    },
    {
      id: '7',
      country: 'Thailand',
      place: 'Chiang Mai',
      foodPreference: 'Both',
      activities: ['Elephant Sanctuary', 'Cooking Classes', 'Night Markets'],
      hotel: { type: 'Boutique Hotel', nights: 3 },
      flightCharges: 24000,
      totalCost: 48000
    },
    
    // Japan
    {
      id: '8',
      country: 'Japan',
      place: 'Tokyo',
      foodPreference: 'Both',
      activities: ['City Tours', 'Sushi Making', 'Technology Museums'],
      hotel: { type: 'Business Hotel', nights: 6 },
      flightCharges: 45000,
      totalCost: 95000
    },
    {
      id: '9',
      country: 'Japan',
      place: 'Kyoto',
      foodPreference: 'Veg',
      activities: ['Temple Visits', 'Tea Ceremony', 'Bamboo Forest'],
      hotel: { type: 'Traditional Ryokan', nights: 4 },
      flightCharges: 42000,
      totalCost: 88000
    },
    {
      id: '10',
      country: 'Japan',
      place: 'Osaka',
      foodPreference: 'Non-Veg',
      activities: ['Food Tours', 'Castle Visits', 'Theme Parks'],
      hotel: { type: '4-Star Hotel', nights: 3 },
      flightCharges: 40000,
      totalCost: 75000
    },
    
    // Singapore
    {
      id: '11',
      country: 'Singapore',
      place: 'Marina Bay',
      foodPreference: 'Both',
      activities: ['Gardens by the Bay', 'Marina Bay Sands', 'Shopping'],
      hotel: { type: 'Luxury Hotel', nights: 4 },
      flightCharges: 22000,
      totalCost: 68000
    },
    {
      id: '12',
      country: 'Singapore',
      place: 'Sentosa Island',
      foodPreference: 'Both',
      activities: ['Universal Studios', 'Beach Activities', 'Cable Car'],
      hotel: { type: 'Resort', nights: 3 },
      flightCharges: 20000,
      totalCost: 58000
    },
    
    // Dubai
    {
      id: '13',
      country: 'UAE',
      place: 'Dubai',
      foodPreference: 'Both',
      activities: ['Burj Khalifa', 'Desert Safari', 'Shopping Malls'],
      hotel: { type: '5-Star Hotel', nights: 5 },
      flightCharges: 35000,
      totalCost: 85000
    },
    {
      id: '14',
      country: 'UAE',
      place: 'Abu Dhabi',
      foodPreference: 'Both',
      activities: ['Sheikh Zayed Mosque', 'Ferrari World', 'Louvre Museum'],
      hotel: { type: 'Luxury Resort', nights: 4 },
      flightCharges: 32000,
      totalCost: 78000
    },
    
    // Maldives
    {
      id: '15',
      country: 'Maldives',
      place: 'Male',
      foodPreference: 'Both',
      activities: ['Snorkeling', 'Spa Treatments', 'Sunset Cruises'],
      hotel: { type: 'Water Villa', nights: 6 },
      flightCharges: 38000,
      totalCost: 125000
    },
    {
      id: '16',
      country: 'Maldives',
      place: 'Baa Atoll',
      foodPreference: 'Both',
      activities: ['Diving', 'Dolphin Watching', 'Private Beach'],
      hotel: { type: 'Overwater Bungalow', nights: 7 },
      flightCharges: 40000,
      totalCost: 145000
    },
    
    // Sri Lanka
    {
      id: '17',
      country: 'Sri Lanka',
      place: 'Colombo',
      foodPreference: 'Both',
      activities: ['City Tours', 'Temple Visits', 'Local Markets'],
      hotel: { type: '4-Star Hotel', nights: 3 },
      flightCharges: 18000,
      totalCost: 42000
    },
    {
      id: '18',
      country: 'Sri Lanka',
      place: 'Kandy',
      foodPreference: 'Veg',
      activities: ['Cultural Shows', 'Botanical Gardens', 'Tea Factory'],
      hotel: { type: 'Hill Country Resort', nights: 4 },
      flightCharges: 16000,
      totalCost: 38000
    },
    
    // Nepal
    {
      id: '19',
      country: 'Nepal',
      place: 'Kathmandu',
      foodPreference: 'Veg',
      activities: ['Heritage Sites', 'Mountain Views', 'Local Culture'],
      hotel: { type: 'Heritage Hotel', nights: 4 },
      flightCharges: 14000,
      totalCost: 35000
    },
    {
      id: '20',
      country: 'Nepal',
      place: 'Pokhara',
      foodPreference: 'Both',
      activities: ['Boating', 'Paragliding', 'Sunrise Views'],
      hotel: { type: 'Lake Resort', nights: 3 },
      flightCharges: 15000,
      totalCost: 32000
    }
  ];

  getDestinations(): string[] {
    return [...new Set(this.itineraries.map(i => i.country))];
  }

  getItinerariesByDestination(destination: string): Itinerary[] {
    return this.itineraries.filter(i => i.country === destination);
  }

  addToCart(itinerary: Itinerary): void {
    const cart = this.getCart();
    cart.push(itinerary);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(): Itinerary[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  removeFromCart(id: string): void {
    const cart = this.getCart().filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getTotalCost(): number {
    return this.getCart().reduce((total, item) => total + item.totalCost, 0);
  }
}
