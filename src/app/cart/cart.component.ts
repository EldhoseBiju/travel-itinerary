import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ItineraryService } from '../services/itinerary.service';
import { Itinerary } from '../models/itinerary.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="cart-hero">
      <div class="hero-content">
        <h1 class="hero-title">Your Travel Cart</h1>
        <p class="hero-subtitle">
          Review and manage your selected travel packages
        </p>
      </div>
    </section>

    <div class="container">
      <div *ngIf="cartItems.length === 0" class="empty-state">
        <div class="empty-illustration">
          <div class="empty-icon">🛍️</div>
          <div class="empty-text">
            <h2>Your cart is empty</h2>
            <p>
              Discover amazing destinations and start planning your next
              adventure!
            </p>
            <a routerLink="/" class="btn btn-primary">
              <span>🌍 Explore Destinations</span>
            </a>
          </div>
        </div>
      </div>

      <div *ngIf="cartItems.length > 0" class="cart-layout">
        <div class="cart-items-section">
          <div class="section-header">
            <h2>Selected Packages</h2>
            <span class="item-count"
              >{{ cartItems.length }}
              {{ cartItems.length === 1 ? 'item' : 'items' }}</span
            >
          </div>

          <div class="cart-items-list">
            <div
              *ngFor="let item of cartItems; trackBy: trackByItemId"
              class="cart-item-card"
            >
              <div class="item-main">
                <div class="item-header">
                  <div class="destination-info">
                    <h3 class="destination-name">{{ item.place }}</h3>
                    <p class="destination-country">{{ item.country }}</p>
                  </div>
                  <div class="item-price">
                    <span class="price-amount">₹{{ item.totalCost }}</span>
                  </div>
                </div>

                <div class="item-details">
                  <div class="details-grid">
                    <div class="detail-card">
                      <span class="detail-icon">🍽️</span>
                      <div class="detail-content">
                        <span class="detail-label">Cuisine</span>
                        <span class="detail-value">{{
                          item.foodPreference
                        }}</span>
                      </div>
                    </div>

                    <div class="detail-card">
                      <span class="detail-icon">🏨</span>
                      <div class="detail-content">
                        <span class="detail-label">Stay</span>
                        <span class="detail-value"
                          >{{ item.hotel.type }} •
                          {{ item.hotel.nights }} nights</span
                        >
                      </div>
                    </div>

                    <div class="detail-card">
                      <span class="detail-icon">✈️</span>
                      <div class="detail-content">
                        <span class="detail-label">Flight</span>
                        <span class="detail-value"
                          >₹{{ item.flightCharges }}</span
                        >
                      </div>
                    </div>

                    <div class="detail-card activities">
                      <span class="detail-icon">🎯</span>
                      <div class="detail-content">
                        <span class="detail-label">Activities</span>
                        <span class="detail-value">{{
                          item.activities.join(', ')
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="item-actions">
                <button (click)="removeFromCart(item.id)" class="btn-remove">
                  <span>🗑️</span>
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="cart-summary-section">
          <div class="summary-card">
            <div class="summary-header">
              <h3>Order Summary</h3>
            </div>

            <div class="summary-content">
              <div class="summary-breakdown">
                <h4>Cost Breakdown</h4>

                <div class="breakdown-section">
                  <div class="breakdown-header">Package Costs</div>
                  <div *ngFor="let item of cartItems" class="breakdown-item">
                    <span class="breakdown-name">{{ item.place }} (Base)</span>
                    <span class="breakdown-price"
                      >₹{{ item.totalCost - item.flightCharges }}</span
                    >
                  </div>
                </div>

                <div class="breakdown-section">
                  <div class="breakdown-header">Flight Costs</div>
                  <div *ngFor="let item of cartItems" class="breakdown-item">
                    <span class="breakdown-name">{{ item.place }} Flight</span>
                    <span class="breakdown-price"
                      >₹{{ item.flightCharges }}</span
                    >
                  </div>
                </div>

                <div class="breakdown-divider"></div>

                <div class="breakdown-item subtotal">
                  <span class="breakdown-name">Subtotal</span>
                  <span class="breakdown-price"
                    >₹{{ getSubtotal() + getFlightTotal() }}</span
                  >
                </div>

                <div class="breakdown-item">
                  <span class="breakdown-name"
                    >Service Fee ({{ cartItems.length }} packages)</span
                  >
                  <span class="breakdown-price">₹{{ getServiceFee() }}</span>
                </div>

                <div class="breakdown-item">
                  <span class="breakdown-name">Taxes & GST (18%)</span>
                  <span class="breakdown-price">₹{{ getTaxes() }}</span>
                </div>

                <div class="breakdown-divider"></div>

                <div class="breakdown-total">
                  <span class="total-label">Total Amount</span>
                  <span class="total-amount">₹{{ getFinalTotal() }}</span>
                </div>
              </div>

              <div class="summary-actions">
                <button class="btn btn-primary btn-full">
                  <span>💳 Proceed to Checkout</span>
                </button>
                <button class="btn-continue" routerLink="/">
                  <span>← Continue Shopping</span>
                </button>
              </div>
            </div>
          </div>

          <div class="trust-indicators">
            <div class="trust-item">
              <span class="trust-icon">🔒</span>
              <span class="trust-text">Secure Payment</span>
            </div>
            <div class="trust-item">
              <span class="trust-icon">📞</span>
              <span class="trust-text">24/7 Support</span>
            </div>
            <div class="trust-item">
              <span class="trust-icon">✈️</span>
              <span class="trust-text">Instant Booking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .cart-hero {
        background: var(--primary-gradient);
        color: white;
        padding: 4rem 0;
        text-align: center;
      }

      .hero-content {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 2rem;
      }

      .hero-title {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1rem;
        letter-spacing: -0.02em;
      }

      .hero-subtitle {
        font-size: 1.25rem;
        opacity: 0.9;
        font-weight: 400;
      }

      .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 2rem;
      }

      .empty-state {
        padding: 6rem 2rem;
      }

      .empty-illustration {
        text-align: center;
        max-width: 500px;
        margin: 0 auto;
      }

      .empty-icon {
        font-size: 6rem;
        margin-bottom: 2rem;
        opacity: 0.7;
      }

      .empty-text h2 {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: var(--text-primary);
      }

      .empty-text p {
        font-size: 1.1rem;
        color: var(--text-secondary);
        margin-bottom: 2rem;
        line-height: 1.6;
      }

      .cart-layout {
        display: grid;
        grid-template-columns: 1fr 400px;
        gap: 3rem;
        margin: -2rem auto 4rem;
        position: relative;
      }

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 50px;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid var(--border-color);
      }

      .section-header h2 {
        font-size: 1.75rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0;
      }

      .item-count {
        background: var(--bg-accent);
        color: var(--text-secondary);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 600;
      }

      .cart-items-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .cart-item-card {
        background: var(--bg-primary);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-md);
        overflow: hidden;
        transition: var(--transition);
      }

      .cart-item-card:hover {
        box-shadow: var(--shadow-lg);
      }

      .item-main {
        padding: 2rem;
      }

      .item-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
      }

      .destination-name {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0 0 0.25rem 0;
      }

      .destination-country {
        color: var(--text-secondary);
        margin: 0;
        font-size: 1rem;
      }

      .item-price {
        text-align: right;
      }

      .price-amount {
        font-size: 2rem;
        font-weight: 700;
        color: #667eea;
      }

      .details-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
      }

      .detail-card {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem;
        background: var(--bg-secondary);
        border-radius: var(--border-radius);
      }

      .detail-card.activities {
        grid-column: 1 / -1;
      }

      .detail-icon {
        font-size: 1.25rem;
        width: 40px;
        height: 40px;
        background: var(--bg-primary);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        box-shadow: var(--shadow-sm);
      }

      .detail-content {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .detail-label {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .detail-value {
        color: var(--text-primary);
        font-weight: 500;
        font-size: 0.95rem;
      }

      .item-actions {
        padding: 1rem 2rem;
        background: var(--bg-secondary);
        border-top: 1px solid var(--border-color);
        display: flex;
        justify-content: flex-end;
      }

      .btn-remove {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: var(--danger-gradient);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: var(--border-radius);
        cursor: pointer;
        font-weight: 600;
        font-size: 0.875rem;
        transition: var(--transition);
      }

      .btn-remove:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
      }

      .cart-summary-section {
        position: sticky;
        top: 2rem;
        height: fit-content;
      }

      .summary-card {
        background: var(--bg-primary);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-lg);
        overflow: hidden;
        margin-bottom: 2rem;
      }

      .summary-header {
        background: var(--primary-gradient);
        color: white;
        padding: 1.5rem 2rem;
      }

      .summary-header h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
      }

      .summary-content {
        padding: 2rem;
      }

      .summary-breakdown h4 {
        margin: 0 0 1.5rem 0;
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text-primary);
      }

      .breakdown-section {
        margin-bottom: 1.5rem;
      }

      .breakdown-header {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.75rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--border-color);
      }

      .breakdown-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;
        font-size: 0.9rem;
      }

      .breakdown-item.subtotal {
        font-weight: 600;
        color: var(--text-primary);
        border-top: 1px solid var(--border-color);
        padding-top: 0.75rem;
        margin-top: 0.5rem;
      }

      .breakdown-name {
        color: var(--text-secondary);
      }

      .breakdown-price {
        font-weight: 600;
        color: var(--text-primary);
      }

      .breakdown-divider {
        height: 1px;
        background: var(--border-color);
        margin: 1rem 0;
      }

      .breakdown-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
        font-size: 1.25rem;
        font-weight: 700;
        background: var(--bg-secondary);
        margin: 1rem -2rem 0;
        padding-left: 2rem;
        padding-right: 2rem;
      }

      .total-label {
        color: var(--text-primary);
      }

      .total-amount {
        color: #667eea;
      }

      .summary-actions {
        margin-top: 2rem;
      }

      .btn-full {
        width: 100%;
        margin-bottom: 1rem;
      }

      .btn-continue {
        width: 100%;
        background: transparent;
        color: var(--text-secondary);
        border: 2px solid var(--border-color);
        padding: 0.75rem 1.5rem;
        border-radius: var(--border-radius);
        cursor: pointer;
        font-weight: 500;
        transition: var(--transition);
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .btn-continue:hover {
        border-color: #667eea;
        color: #667eea;
      }

      .trust-indicators {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .trust-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
        background: var(--bg-primary);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-sm);
      }

      .trust-icon {
        font-size: 1.25rem;
        width: 40px;
        height: 40px;
        background: var(--success-gradient);
        color: white;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .trust-text {
        font-weight: 600;
        color: var(--text-primary);
        font-size: 0.9rem;
      }

      @media (max-width: 1024px) {
        .cart-layout {
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .cart-summary-section {
          position: static;
          order: -1;
        }

        .details-grid {
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        }
      }

      @media (max-width: 768px) {
        .hero-title {
          font-size: 2.2rem;
        }

        .container {
          padding: 0 1rem;
        }

        .cart-layout {
          margin-top: -1rem;
        }

        .details-grid {
          grid-template-columns: 1fr;
        }

        .detail-card.activities {
          grid-column: 1;
        }

        .item-header {
          flex-direction: column;
          gap: 1rem;
          align-items: flex-start;
        }

        .item-main {
          padding: 1.5rem;
        }

        .item-actions {
          padding: 1rem 1.5rem;
        }

        .trust-indicators {
          flex-direction: row;
          overflow-x: auto;
          gap: 0.5rem;
          padding-bottom: 0.5rem;
        }

        .trust-item {
          flex-shrink: 0;
          min-width: 140px;
        }

        .section-header {
          flex-direction: column;
          gap: 0.5rem;
          align-items: flex-start;
        }

        .breakdown-total {
          margin-left: -1.5rem;
          margin-right: -1.5rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
      }

      @media (max-width: 480px) {
        .hero-title {
          font-size: 1.8rem;
        }

        .item-main {
          padding: 1rem;
        }

        .item-actions {
          padding: 1rem;
        }

        .summary-content {
          padding: 1.5rem;
        }

        .summary-header {
          padding: 1rem 1.5rem;
        }

        .breakdown-total {
          margin-left: -1.5rem;
          margin-right: -1.5rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }

        .detail-card {
          padding: 0.75rem;
        }

        .trust-item {
          min-width: 120px;
          padding: 0.75rem;
        }
      }
    `,
  ],
})
export class CartComponent implements OnInit {
  cartItems: Itinerary[] = [];
  totalCost: number = 0;

  constructor(private itineraryService: ItineraryService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.itineraryService.getCart();
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.totalCost = this.cartItems.reduce(
      (sum, item) => sum + item.totalCost,
      0
    );
  }

  getSubtotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + (item.totalCost - item.flightCharges),
      0
    );
  }

  getFlightTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.flightCharges, 0);
  }

  getTaxes(): number {
    return Math.round(this.getSubtotal() * 0.18); // 18% GST
  }

  getServiceFee(): number {
    return this.cartItems.length * 500; // ₹500 per package
  }

  getFinalTotal(): number {
    return (
      this.getSubtotal() +
      this.getFlightTotal() +
      this.getTaxes() +
      this.getServiceFee()
    );
  }

  removeFromCart(id: string): void {
    this.itineraryService.removeFromCart(id);
    this.loadCart();
  }

  trackByItemId(index: number, item: Itinerary): string {
    return item.id;
  }
}
