# Antoree Clone - Distributed Payment System Flowchart & Documentation

## 🌟 Overview

The Antoree Clone platform implements a sophisticated **distributed payment system** that handles multiple payment scenarios including trial lessons, course purchases, and teacher earnings distribution. This document provides comprehensive flowcharts and technical documentation for the payment ecosystem.

## 💳 Payment System Architecture

### Core Components
- **Payment Gateway Integration**: Multiple payment methods (Credit Card, ATM, Digital Wallet)
- **Distributed Ledger**: Revenue sharing between platform and teachers
- **Trial Lesson Booking**: Discounted introductory lessons
- **Course Purchase System**: Full course package payments
- **Teacher Payout System**: Automated earnings distribution

---

## 🔄 Main Payment Flow Diagram

```mermaid
graph TD
    A[Student Selects Teacher/Course] --> B{Authentication Check}
    B -->|Not Authenticated| C[Redirect to Login]
    B -->|Authenticated| D[Payment Options]
    
    C --> E[Login/Register] --> D
    
    D --> F{Payment Type}
    F -->|Trial Lesson| G[Trial Lesson Flow]
    F -->|Course Purchase| H[Course Purchase Flow]
    
    %% Trial Lesson Flow
    G --> I[Select Available Time Slot]
    I --> J[Confirm Trial Booking]
    J --> K[Process Payment - 50% Discount]
    K --> L{Payment Success?}
    
    %% Course Purchase Flow  
    H --> M[Select Course Package]
    M --> N[Fill Student Information]
    N --> O[Choose Payment Method]
    O --> P[Process Full Payment]
    P --> Q{Payment Success?}
    
    %% Payment Success Paths
    L -->|Success| R[Create Trial Booking Record]
    L -->|Failed| S[Show Error Message]
    Q -->|Success| T[Create Course Enrollment]
    Q -->|Failed| S
    
    %% Post-Payment Processing
    R --> U[Send Confirmation Email]
    T --> V[Send Course Welcome Email]
    U --> W[Update Teacher Calendar]
    V --> X[Generate Course Access]
    
    %% Revenue Distribution
    W --> Y[Distribute Trial Payment]
    X --> Z[Distribute Course Payment]
    
    Y --> AA[Platform Fee: 20%]
    Y --> BB[Teacher Earnings: 80%]
    Z --> CC[Platform Fee: 15%]
    Z --> DD[Teacher Earnings: 85%]
    
    %% Final Steps
    AA --> EE[Update Platform Revenue]
    BB --> FF[Update Teacher Wallet]
    CC --> EE
    DD --> FF
    
    EE --> GG[Generate Financial Reports]
    FF --> HH[Teacher Payout Schedule]
    
    style A fill:#e1f5fe
    style D fill:#f3e5f5
    style K fill:#fff3e0
    style P fill:#fff3e0
    style Y fill:#e8f5e8
    style Z fill:#e8f5e8
```

---

## 🎯 Trial Lesson Payment Flow

### Detailed Flow Steps

```mermaid
sequenceDiagram
    participant S as Student
    participant UI as Frontend
    participant API as Backend API
    participant PG as Payment Gateway
    participant DB as Database
    participant EMAIL as Email Service
    participant TEACHER as Teacher Portal

    S->>UI: Select Teacher & Click "Book Trial"
    UI->>UI: Check Authentication Status
    
    alt Not Authenticated
        UI->>S: Redirect to Login
        S->>UI: Complete Login
    end
    
    UI->>S: Show Available Time Slots
    S->>UI: Select Preferred Time
    UI->>S: Display Booking Confirmation (50% Price)
    S->>UI: Confirm Booking
    
    UI->>API: POST /api/bookings/trial
    API->>API: Validate Request Data
    API->>DB: Check Teacher Availability
    
    alt Teacher Available
        API->>PG: Initialize Payment Session
        PG->>API: Return Payment URL/Token
        API->>UI: Return Payment Details
        UI->>PG: Redirect to Payment Gateway
        
        S->>PG: Complete Payment
        PG->>API: Payment Webhook/Callback
        API->>DB: Create Booking Record
        API->>DB: Update Teacher Calendar
        
        %% Revenue Distribution
        API->>API: Calculate Revenue Split
        API->>DB: Platform Revenue (20%)
        API->>DB: Teacher Earnings (80%)
        
        API->>EMAIL: Send Confirmation Email
        API->>TEACHER: Notify New Booking
        
        PG->>UI: Redirect to Success Page
        UI->>S: Show Booking Confirmation
    else Teacher Unavailable
        API->>UI: Return Availability Error
        UI->>S: Show Error Message
    end
```

---

## 💰 Course Purchase Payment Flow

### Complete Course Purchase Process

```mermaid
flowchart TD
    A[Student Browses Courses] --> B[Select Course Package]
    B --> C{User Authenticated?}
    C -->|No| D[Login/Register Form]
    C -->|Yes| E[Course Details Page]
    D --> E
    
    E --> F[Fill Personal Information]
    F --> G[Select Payment Method]
    
    G --> H{Payment Method}
    H -->|Credit Card| I[Credit Card Form]
    H -->|ATM/Bank Transfer| J[Bank Selection]
    H -->|Digital Wallet| K[Wallet Integration]
    
    I --> L[Validate Card Details]
    J --> M[Generate Bank Transfer Code]
    K --> N[Wallet Authentication]
    
    L --> O[Process Payment Gateway]
    M --> O
    N --> O
    
    O --> P{Payment Status}
    P -->|Success| Q[Payment Confirmation]
    P -->|Failed| R[Error Handling]
    P -->|Pending| S[Pending Status]
    
    Q --> T[Create Course Enrollment]
    T --> U[Generate Course Access]
    U --> V[Send Welcome Email]
    
    %% Revenue Distribution
    V --> W[Calculate Platform Commission]
    W --> X[Platform Revenue: 15%]
    W --> Y[Teacher Revenue: 85%]
    
    X --> Z[Update Platform Financials]
    Y --> AA[Update Teacher Earnings]
    
    %% Course Access
    U --> BB[Generate Student Dashboard Access]
    BB --> CC[Create Learning Progress Tracker]
    CC --> DD[Schedule First Lesson]
    
    %% Error Handling
    R --> EE[Log Error Details]
    EE --> FF[Send Error Notification]
    FF --> GG[Retry Payment Option]
    
    %% Pending Handling
    S --> HH[Monitor Payment Status]
    HH --> II{Status Update}
    II -->|Completed| Q
    II -->|Failed| R
    II -->|Still Pending| JJ[Send Reminder]
    
    style Q fill:#c8e6c9
    style T fill:#bbdefb
    style X fill:#fff9c4
    style Y fill:#f8bbd9
    style R fill:#ffcdd2
```

---

## 🏦 Distributed Revenue System

### Revenue Sharing Model

| Payment Type | Platform Fee | Teacher Share | Processing Fee |
|-------------|-------------|---------------|----------------|
| Trial Lesson | 20% | 80% | 2.9% + $0.30 |
| Course Purchase | 15% | 85% | 2.9% + $0.30 |
| Regular Lesson | 18% | 82% | 2.9% + $0.30 |
| Group Class | 12% | 88% | 2.9% + $0.30 |

### Financial Flow Architecture

```mermaid
graph LR
    A[Student Payment] --> B[Payment Gateway]
    B --> C[Platform Account]
    
    C --> D{Revenue Distribution}
    D --> E[Platform Revenue]
    D --> F[Teacher Earnings]
    D --> G[Processing Fees]
    
    E --> H[Platform Operations]
    E --> I[Marketing Budget]
    E --> J[Development Fund]
    
    F --> K[Teacher Wallet]
    K --> L[Weekly Payout]
    K --> M[Monthly Statement]
    
    G --> N[Gateway Fees]
    G --> O[Transaction Costs]
    
    %% Teacher Payout Options
    L --> P{Payout Method}
    P --> Q[Bank Transfer]
    P --> R[PayPal]
    P --> S[Digital Wallet]
    
    style A fill:#e1f5fe
    style E fill:#fff3e0
    style F fill:#e8f5e8
    style G fill:#ffebee
```

---

## 📊 Payment Methods Integration

### Supported Payment Gateways

#### 1. Credit Card Processing
```javascript
// Credit Card Payment Flow
const processCreditCardPayment = {
  provider: "Stripe/VNPay",
  supportedCards: ["Visa", "Mastercard", "AMEX", "JCB"],
  securityFeatures: ["3D Secure", "CVV Verification", "Fraud Detection"],
  processingTime: "Instant",
  fees: "2.9% + $0.30"
}
```

#### 2. ATM/Bank Transfer
```javascript
// Bank Transfer Integration
const processBankTransfer = {
  provider: "VNPay/NAPAS",
  supportedBanks: ["Vietcombank", "Techcombank", "BIDV", "MB Bank"],
  processingTime: "1-3 business days",
  fees: "1.5% or fixed fee",
  features: ["QR Code Payment", "Internet Banking", "Mobile Banking"]
}
```

#### 3. Digital Wallets
```javascript
// Digital Wallet Integration
const processWalletPayment = {
  providers: ["MoMo", "ZaloPay", "ViettelPay", "PayPal"],
  processingTime: "Instant",
  fees: "1.5% - 2.5%",
  features: ["One-touch Payment", "Biometric Authentication"]
}
```

---

## 🔐 Security & Compliance

### Payment Security Measures

```mermaid
graph TD
    A[Payment Request] --> B[SSL/TLS Encryption]
    B --> C[Input Validation]
    C --> D[Authentication Check]
    D --> E[Authorization Verification]
    
    E --> F{Security Checks}
    F --> G[Fraud Detection]
    F --> H[Rate Limiting]
    F --> I[IP Filtering]
    
    G --> J[Risk Assessment]
    H --> K[Request Throttling]
    I --> L[Geolocation Check]
    
    J --> M{Risk Level}
    M -->|Low| N[Process Payment]
    M -->|Medium| O[Additional Verification]
    M -->|High| P[Block Transaction]
    
    O --> Q[2FA Verification]
    Q --> R[Manual Review]
    R --> S{Approval?}
    S -->|Approved| N
    S -->|Denied| P
    
    N --> T[Payment Gateway]
    T --> U[Transaction Logging]
    U --> V[Audit Trail]
    
    style A fill:#e1f5fe
    style F fill:#fff3e0
    style N fill:#e8f5e8
    style P fill:#ffcdd2
```

### Compliance Standards
- **PCI DSS Level 1** compliance for card data
- **GDPR** compliance for EU users
- **Vietnamese Banking Regulations** compliance
- **Anti-Money Laundering (AML)** procedures
- **Know Your Customer (KYC)** verification

---

## 📈 Payment Analytics & Reporting

### Key Performance Indicators (KPIs)

#### Revenue Metrics
- **Total Revenue**: Monthly/Quarterly tracking
- **Teacher Earnings**: Individual and aggregate
- **Platform Commission**: Revenue share tracking
- **Payment Success Rate**: Conversion metrics
- **Average Transaction Value**: Student spending patterns

#### Payment Method Analytics
```mermaid
pie title Payment Method Distribution
    "Credit Card" : 45
    "Bank Transfer" : 35
    "Digital Wallet" : 15
    "Other" : 5
```

### Financial Dashboard Components

1. **Revenue Overview**
   - Real-time revenue tracking
   - Monthly growth metrics
   - Teacher payout summaries

2. **Transaction Monitoring**
   - Payment success/failure rates
   - Processing time analytics
   - Error rate tracking

3. **Teacher Earnings**
   - Individual teacher revenue
   - Payout scheduling
   - Performance-based bonuses

---

## 🛠 Technical Implementation

### API Endpoints

#### Payment Processing
```typescript
// Trial Lesson Booking
POST /api/bookings/trial
{
  teacherId: string,
  scheduledAt: string,
  duration: number,
  notes: string
}

// Course Payment
POST /api/payments/simple/course
{
  courseId: string,
  paymentMethod: "captureWallet" | "payWithATM" | "payWithCC",
  studentInfo: StudentInfo,
  couponCode?: string
}

// Payment Status Check
GET /api/payments/{paymentId}/status

// Teacher Earnings
GET /api/teachers/{teacherId}/earnings
```

### Database Schema

#### Payment Records
```sql
CREATE TABLE payments (
  id VARCHAR(255) PRIMARY KEY,
  student_id VARCHAR(255) NOT NULL,
  teacher_id VARCHAR(255),
  course_id VARCHAR(255),
  booking_id VARCHAR(255),
  amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) NOT NULL,
  teacher_earnings DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  status ENUM('pending', 'completed', 'failed', 'refunded'),
  gateway_transaction_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Teacher Earnings
```sql
CREATE TABLE teacher_earnings (
  id VARCHAR(255) PRIMARY KEY,
  teacher_id VARCHAR(255) NOT NULL,
  payment_id VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'available', 'paid'),
  payout_date TIMESTAMP NULL,
  payout_method VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Demo Implementation Guide

### Quick Start Demo

1. **Setup Payment Gateway Demo**
   ```bash
   # Install dependencies
   npm install stripe vnpay-node

   # Configure environment variables
   STRIPE_PUBLIC_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   VNPAY_MERCHANT_ID=...
   VNPAY_SECRET_KEY=...
   ```

2. **Run Demo Transaction**
   ```javascript
   // Demo trial lesson booking
   const demoBooking = {
     teacherId: "teacher-123",
     scheduledAt: "2024-08-26T14:00:00Z",
     duration: 60,
     notes: "Demo trial lesson"
   };

   // Process demo payment
   const paymentResult = await processTrialPayment(demoBooking);
   console.log("Demo payment result:", paymentResult);
   ```

3. **Test Payment Methods**
   - Credit Card: Use test card `4242 4242 4242 4242`
   - Bank Transfer: Use demo bank account
   - Digital Wallet: Use sandbox environment

### Payment Flow Testing

#### Test Scenarios
1. **Successful Payment Flow**
   - Valid payment details
   - Available teacher slot
   - Proper revenue distribution

2. **Failed Payment Scenarios**
   - Invalid card details
   - Insufficient funds
   - Network timeout

3. **Edge Cases**
   - Concurrent bookings
   - Payment gateway downtime
   - Refund processing

---

## 📱 Mobile Payment Integration

### Mobile-Specific Features

```mermaid
graph TD
    A[Mobile App] --> B[Biometric Auth]
    B --> C[Stored Payment Methods]
    C --> D[One-Touch Payment]
    
    D --> E{Payment Type}
    E --> F[In-App Payment]
    E --> G[QR Code Payment]
    E --> H[NFC Payment]
    
    F --> I[Apple Pay/Google Pay]
    G --> J[Dynamic QR Generation]
    H --> K[Contactless Payment]
    
    I --> L[Process Payment]
    J --> L
    K --> L
    
    L --> M[Payment Confirmation]
    M --> N[Push Notification]
    N --> O[Update App State]
    
    style A fill:#e1f5fe
    style D fill:#fff3e0
    style L fill:#e8f5e8
```

---

## 🔮 Future Enhancements

### Planned Features

1. **Cryptocurrency Payments**
   - Bitcoin/Ethereum support
   - Stablecoin integration
   - DeFi payment protocols

2. **Advanced Revenue Sharing**
   - Dynamic commission rates
   - Performance-based bonuses
   - Loyalty reward programs

3. **International Expansion**
   - Multi-currency support
   - Local payment methods
   - Regional compliance

4. **AI-Powered Features**
   - Fraud detection algorithms
   - Dynamic pricing optimization
   - Personalized payment recommendations

---

## 📞 Support & Troubleshooting

### Common Issues

1. **Payment Failures**
   - Check internet connectivity
   - Verify payment method details
   - Contact payment gateway support

2. **Revenue Distribution Errors**
   - Validate teacher account setup
   - Check platform commission settings
   - Review payout schedules

3. **Security Concerns**
   - Enable 2FA authentication
   - Monitor transaction logs
   - Report suspicious activities

### Contact Information
- **Technical Support**: support@antoree.com
- **Payment Issues**: payments@antoree.com
- **Emergency Hotline**: +84-xxx-xxx-xxxx

---

**Built with ❤️ using modern payment technologies and security best practices**

---

## 📄 Documentation Links

- [API Documentation](./docs/api-documentation.md)
- [Security Guidelines](./docs/security-guidelines.md)
- [Teacher Payout Guide](./docs/teacher-payouts.md)
- [Payment Gateway Integration](./docs/payment-gateways.md)
