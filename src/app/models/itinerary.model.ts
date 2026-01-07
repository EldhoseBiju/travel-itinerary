export interface Itinerary {
  id: string;
  country: string;
  place: string;
  foodPreference: 'Veg' | 'Non-Veg' | 'Both';
  activities: string[];
  hotel: {
    type: string;
    nights: number;
  };
  flightCharges: number;
  totalCost: number;
}
