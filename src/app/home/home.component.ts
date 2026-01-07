import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItineraryService } from '../services/itinerary.service';
import { Itinerary } from '../models/itinerary.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">Discover Your Next Adventure</h1>
          <p class="hero-subtitle">Curated travel experiences tailored to your preferences. From exotic destinations to luxury accommodations.</p>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-number">50+</span>
              <span class="stat-label">Destinations</span>
            </div>
            <div class="stat">
              <span class="stat-number">1000+</span>
              <span class="stat-label">Happy Travelers</span>
            </div>
            <div class="stat">
              <span class="stat-number">24/7</span>
              <span class="stat-label">Support</span>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="floating-card">
            <div class="card-icon">✈️</div>
            <div class="card-text">Premium Packages</div>
          </div>
        </div>
      </div>
    </section>
    
    <div class="container">
      <div class="search-section">
        <div class="search-card">
          <div class="search-header">
            <h2>Find Your Perfect Getaway</h2>
            <p>Choose from our carefully curated destinations</p>
          </div>
          <div class="search-form">
            <div class="form-group">
              <label for="destination" class="form-label">
                <span class="label-icon">🌍</span>
                Destination
              </label>
              <select id="destination" [(ngModel)]="selectedDestination" (change)="onDestinationChange()" class="form-select">
                <option value="">Select your destination</option>
                <option *ngFor="let destination of destinations" [value]="destination">
                  {{destination}}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="compare-section" *ngIf="compareList.length > 0">
        <div class="compare-card">
          <div class="compare-header">
            <div class="compare-title">
              <span class="compare-icon">📊</span>
              <h3>Compare Packages</h3>
              <span class="compare-count">{{compareList.length}}/3</span>
            </div>
            <button (click)="clearCompare()" class="btn-clear">
              <span>Clear All</span>
            </button>
          </div>
          <div class="compare-items">
            <div *ngFor="let item of compareList" class="compare-item">
              <div class="compare-info">
                <span class="compare-name">{{item.place}}</span>
                <span class="compare-price">₹{{item.totalCost}}</span>
              </div>
              <button (click)="removeFromCompare(item.id)" class="btn-remove-compare">
                <span>×</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="packages-section" *ngIf="selectedDestination">
        <div class="section-header">
          <h2>Available Packages</h2>
          <p>{{filteredItineraries.length}} packages found for {{selectedDestination}}</p>
        </div>
        
        <div class="packages-grid">
          <div *ngFor="let itinerary of filteredItineraries" 
               class="package-card" 
               [class.selected]="isInCompare(itinerary.id)">
            
            <div class="package-header">
              <div class="package-location">
                <h3 class="package-title">{{itinerary.place}}</h3>
                <p class="package-country">{{itinerary.country}}</p>
              </div>
              <div class="package-price">
                <span class="price-label">From</span>
                <span class="price-amount">₹{{itinerary.totalCost}}</span>
              </div>
            </div>
            
            <div class="package-content">
              <div class="package-features">
                <div class="feature-item">
                  <span class="feature-icon">🍽️</span>
                  <div class="feature-text">
                    <span class="feature-label">Cuisine</span>
                    <span class="feature-value">{{itinerary.foodPreference}}</span>
                  </div>
                </div>
                
                <div class="feature-item">
                  <span class="feature-icon">🎯</span>
                  <div class="feature-text">
                    <span class="feature-label">Activities</span>
                    <span class="feature-value">{{itinerary.activities.join(', ')}}</span>
                  </div>
                </div>
                
                <div class="feature-item">
                  <span class="feature-icon">🏨</span>
                  <div class="feature-text">
                    <span class="feature-label">Accommodation</span>
                    <span class="feature-value">{{itinerary.hotel.type}} • {{itinerary.hotel.nights}} nights</span>
                  </div>
                </div>
                
                <div class="feature-item">
                  <span class="feature-icon">✈️</span>
                  <div class="feature-text">
                    <span class="feature-label">Flight</span>
                    <span class="feature-value">₹{{itinerary.flightCharges}}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="package-actions">
              <button (click)="addToCompare(itinerary)" 
                      [disabled]="compareList.length >= 3 && !isInCompare(itinerary.id)"
                      class="btn btn-secondary">
                <span *ngIf="!isInCompare(itinerary.id)">📊 Compare</span>
                <span *ngIf="isInCompare(itinerary.id)">✓ Added</span>
              </button>
              <button (click)="addToCart(itinerary)" 
                      [disabled]="isInCart(itinerary.id)"
                      class="btn btn-primary"
                      [class.btn-added]="isInCart(itinerary.id)">
                <span *ngIf="!isInCart(itinerary.id)">🛒 Add to Cart</span>
                <span *ngIf="isInCart(itinerary.id)">✓ Added</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero-section {
      background: var(--primary-gradient);
      color: white;
      padding: 6rem 0;
      position: relative;
      overflow: hidden;
    }
    
    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
      opacity: 0.3;
    }
    
    .hero-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      position: relative;
      z-index: 1;
    }
    
    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      letter-spacing: -0.02em;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      line-height: 1.6;
      opacity: 0.9;
      margin-bottom: 3rem;
      font-weight: 400;
    }
    
    .hero-stats {
      display: flex;
      gap: 3rem;
    }
    
    .stat {
      text-align: center;
    }
    
    .stat-number {
      display: block;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    
    .stat-label {
      font-size: 0.875rem;
      opacity: 0.8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .hero-visual {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .floating-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      padding: 2rem;
      text-align: center;
      animation: float 6s ease-in-out infinite;
    }
    
    .card-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .card-text {
      font-size: 1.1rem;
      font-weight: 600;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    
    .search-section {
      margin: -3rem auto 4rem;
      position: relative;
      z-index: 10;
    }
    
    .search-card {
      background: var(--bg-primary);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-xl);
      padding: 3rem;
      text-align: center;
    }
    
    .search-header h2 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }
    
    .search-header p {
      color: var(--text-secondary);
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }
    
    .form-group {
      max-width: 400px;
      margin: 0 auto;
    }
    
    .form-label {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }
    
    .label-icon {
      font-size: 1.2rem;
    }
    
    .form-select {
      width: 100%;
      padding: 1rem 1.5rem;
      border: 2px solid var(--border-color);
      border-radius: var(--border-radius);
      font-size: 1rem;
      background: var(--bg-primary);
      color: var(--text-primary);
      transition: var(--transition);
      appearance: none;
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6,9 12,15 18,9"></polyline></svg>');
      background-repeat: no-repeat;
      background-position: right 1rem center;
      background-size: 1rem;
    }
    
    .form-select:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    .compare-section {
      margin-bottom: 4rem;
    }
    
    .compare-card {
      background: var(--secondary-gradient);
      color: white;
      border-radius: var(--border-radius-lg);
      padding: 2rem;
      box-shadow: var(--shadow-lg);
    }
    
    .compare-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .compare-title {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .compare-title h3 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
    }
    
    .compare-count {
      background: rgba(255, 255, 255, 0.2);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 600;
    }
    
    .compare-items {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }
    
    .compare-item {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: var(--border-radius);
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .compare-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .compare-name {
      font-weight: 600;
    }
    
    .compare-price {
      font-size: 0.875rem;
      opacity: 0.9;
    }
    
    .btn-remove-compare {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      cursor: pointer;
      font-weight: bold;
      transition: var(--transition);
    }
    
    .btn-remove-compare:hover {
      background: rgba(255, 255, 255, 0.3);
    }
    
    .btn-clear {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.2);
      padding: 0.75rem 1.5rem;
      border-radius: var(--border-radius);
      cursor: pointer;
      font-weight: 600;
      transition: var(--transition);
    }
    
    .btn-clear:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    
    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .section-header h2 {
      font-size: 2.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }
    
    .section-header p {
      color: var(--text-secondary);
      font-size: 1.1rem;
    }
    
    .packages-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }
    
    .package-card {
      background: var(--bg-primary);
      border-radius: var(--border-radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      transition: var(--transition);
      border: 2px solid transparent;
    }
    
    .package-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-xl);
    }
    
    .package-card.selected {
      border-color: #667eea;
      box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    }
    
    .package-header {
      background: var(--primary-gradient);
      color: white;
      padding: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    
    .package-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 0.25rem 0;
    }
    
    .package-country {
      opacity: 0.9;
      margin: 0;
    }
    
    .package-price {
      text-align: right;
    }
    
    .price-label {
      display: block;
      font-size: 0.875rem;
      opacity: 0.8;
      margin-bottom: 0.25rem;
    }
    
    .price-amount {
      font-size: 1.75rem;
      font-weight: 700;
    }
    
    .package-content {
      padding: 2rem;
    }
    
    .package-features {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .feature-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .feature-icon {
      font-size: 1.25rem;
      width: 32px;
      height: 32px;
      background: var(--bg-accent);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .feature-text {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .feature-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .feature-value {
      color: var(--text-primary);
      font-weight: 500;
    }
    
    .package-actions {
      padding: 0 2rem 2rem;
      display: flex;
      gap: 1rem;
    }
    
    .package-actions .btn {
      flex: 1;
      font-size: 0.875rem;
    }
    
    .btn-added {
      background: var(--success-gradient) !important;
      cursor: default;
    }
    
    .btn-added:hover {
      transform: none !important;
    }
    
    @media (max-width: 1024px) {
      .hero-content {
        grid-template-columns: 1fr;
        gap: 3rem;
        text-align: center;
      }
      
      .hero-title {
        font-size: 3rem;
      }
      
      .packages-grid {
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      }
      
      .hero-stats {
        justify-content: center;
      }
    }
    
    @media (max-width: 768px) {
      .hero-section {
        padding: 3rem 0;
      }
      
      .hero-title {
        font-size: 2.2rem;
      }
      
      .hero-subtitle {
        font-size: 1.1rem;
      }
      
      .hero-stats {
        gap: 1.5rem;
        flex-wrap: wrap;
      }
      
      .container {
        padding: 0 1rem;
      }
      
      .search-card {
        padding: 1.5rem;
      }
      
      .search-header h2 {
        font-size: 1.5rem;
      }
      
      .form-select {
        min-width: auto;
        width: 100%;
      }
      
      .packages-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .package-header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }
      
      .package-price {
        align-self: flex-end;
      }
      
      .compare-header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }
      
      .compare-items {
        grid-template-columns: 1fr;
      }
      
      .package-actions {
        flex-direction: column;
        gap: 0.75rem;
      }
      
      .section-header {
        text-align: left;
        margin-bottom: 2rem;
      }
      
      .section-header h2 {
        font-size: 1.8rem;
      }
    }
    
    @media (max-width: 480px) {
      .hero-title {
        font-size: 1.8rem;
      }
      
      .hero-stats {
        flex-direction: column;
        gap: 1rem;
      }
      
      .search-card {
        padding: 1rem;
      }
      
      .package-content {
        padding: 1.5rem;
      }
      
      .package-actions {
        padding: 0 1.5rem 1.5rem;
      }
      
      .feature-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
      
      .feature-icon {
        align-self: flex-start;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  destinations: string[] = [];
  selectedDestination: string = '';
  filteredItineraries: Itinerary[] = [];
  compareList: Itinerary[] = [];
  cartItems: Itinerary[] = [];

  constructor(private itineraryService: ItineraryService) {}

  ngOnInit(): void {
    this.destinations = this.itineraryService.getDestinations();
    this.loadCompareList();
    this.loadCartItems();
  }

  onDestinationChange(): void {
    this.filteredItineraries = this.itineraryService.getItinerariesByDestination(this.selectedDestination);
  }

  addToCart(itinerary: Itinerary): void {
    if (!this.isInCart(itinerary.id)) {
      this.itineraryService.addToCart(itinerary);
      this.loadCartItems();
      alert('Added to cart!');
    }
  }

  isInCart(id: string): boolean {
    return this.cartItems.some(item => item.id === id);
  }

  loadCartItems(): void {
    this.cartItems = this.itineraryService.getCart();
  }

  addToCompare(itinerary: Itinerary): void {
    if (this.isInCompare(itinerary.id)) {
      this.removeFromCompare(itinerary.id);
    } else if (this.compareList.length < 3) {
      this.compareList.push(itinerary);
      this.saveCompareList();
    }
  }

  removeFromCompare(id: string): void {
    this.compareList = this.compareList.filter(item => item.id !== id);
    this.saveCompareList();
  }

  clearCompare(): void {
    this.compareList = [];
    this.saveCompareList();
  }

  isInCompare(id: string): boolean {
    return this.compareList.some(item => item.id === id);
  }

  private loadCompareList(): void {
    const saved = localStorage.getItem('compareList');
    this.compareList = saved ? JSON.parse(saved) : [];
  }

  private saveCompareList(): void {
    localStorage.setItem('compareList', JSON.stringify(this.compareList));
  }
}
