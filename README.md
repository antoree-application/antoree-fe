# Antoree Clone - Online English Learning Platform

A modern, full-stack clone of the Antoree platform built with Next.js 15, featuring a comprehensive online English learning ecosystem with both student and teacher portals.

## 🌟 Overview

Antoree Clone is a sophisticated online education platform that connects English learners with qualified teachers for personalized 1-on-1 lessons. The platform supports Vietnamese and English languages and provides a complete learning management system.

## ✨ Key Features

### For Students
- **Teacher Discovery**: Browse and search qualified English teachers with advanced filtering
- **Lesson Booking**: Real-time calendar booking system with trial lessons
- **Authentication**: Secure registration and login system
- **Profile Management**: Personalized dashboard and learning progress tracking
- **💳 Demo Distributed Payment System**: Advanced payment processing with multiple gateways
  - Trial lesson payments (50% discount)
  - Course package purchases
  - Credit card, bank transfer, and digital wallet support
  - Real-time payment processing with VNPay integration
- **Multilingual Support**: Vietnamese and English language options

### For Teachers
- **Teacher Portal**: Dedicated dashboard for managing lessons and students
- **Booking Management**: Accept/decline lesson requests and manage schedules
- **Student Management**: Track student progress and manage ongoing classes
- **Profile Verification**: Certificate and qualification verification system
- **💰 Earnings Distribution**: Automated revenue sharing and payout system
  - 80% teacher earnings for trial lessons
  - 85% teacher earnings for course purchases
  - Weekly automated payouts
  - Detailed financial reporting
- **Analytics Dashboard**: Performance metrics and financial tracking

### Platform Features
- **Responsive Design**: Mobile-first approach with excellent UX across all devices
- **Certificate System**: Professional certificates (TESOL, IELTS, Business English)
- **Real-time Booking**: Interactive calendar with availability management
- **Review System**: Student-teacher rating and feedback system
- **Community Features**: FAQs, testimonials, and learning resources
- **🚀 Demo Distributed Payment System**: 
  - Multi-gateway payment processing (VNPay, Stripe simulation)
  - Automated revenue distribution
  - Real-time transaction monitoring
  - Comprehensive financial reporting
  - Mobile payment optimization

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4.1.9
- **UI Components**: Radix UI + Custom Components
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context API

### Backend
- **API**: Next.js API Routes
- **Authentication**: JWT-based authentication
- **Database**: Mock API with planned real database integration
- **File Handling**: Next.js built-in file handling

### Development Tools
- **Package Manager**: pnpm
- **Type Checking**: TypeScript 5
- **Linting**: ESLint (disabled during builds)
- **CSS Processing**: PostCSS with Tailwind

## 📁 Project Structure

```
antoree-clone/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── bookings/             # Booking management
│   │   └── teachers/             # Teacher data endpoints
│   ├── teacher/                  # Teacher portal pages
│   │   ├── dashboard/            # Teacher dashboard
│   │   ├── bookings/             # Booking management
│   │   ├── students/             # Student management
│   │   └── login/                # Teacher authentication
│   ├── (student pages)/          # Student-facing pages
│   │   ├── home/                 # Landing page
│   │   ├── teachers/             # Teacher search
│   │   ├── login/                # Student authentication
│   │   └── dashboard/            # Student dashboard
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   ├── ui/                       # UI components (shadcn/ui)
│   ├── AuthProvider.tsx          # Authentication context
│   └── BookingCalendarDemo.tsx   # Booking calendar component
├── contexts/                     # React contexts
│   └── LanguageContext.tsx       # Internationalization
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts                # Authentication hook
│   └── useApi.ts                 # API interaction hook
├── lib/                          # Utility libraries
│   ├── api.ts                    # API client
│   └── utils.ts                  # Helper functions
├── types/                        # TypeScript type definitions
├── public/                       # Static assets
└── docs/                         # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd antoree-clone
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### Tailwind Configuration
The project uses Tailwind CSS v4.1.9 with custom configuration in `postcss.config.mjs` and global styles in `app/globals.css`.

### TypeScript Configuration
TypeScript is configured with strict mode enabled and path aliases for clean imports:
- `@/*` maps to the root directory
- Includes Next.js types and optimizations

## 🎨 UI Components

The project uses a modern design system built with:
- **Radix UI**: Accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first styling
- **Custom Components**: Built with shadcn/ui architecture
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Theme switching support

### Key Components
- Booking Calendar with real-time availability
- Teacher profile cards with ratings and certifications
- Interactive dashboards for students and teachers
- Modal systems for bookings and certificates
- Form components with validation

## 🌐 Internationalization

The platform supports multiple languages:
- **English**: Default language
- **Vietnamese**: Full translation support
- **Context-based**: Language switching with React Context
- **Persistent**: Language preference saved locally

## 📱 Mobile Responsiveness

The application is fully responsive with:
- Mobile-first design approach
- Touch-friendly interactive elements
- Optimized layouts for all screen sizes
- Progressive enhancement for larger screens

## 🔐 Authentication & Security

### Authentication System
- JWT-based authentication
- Separate student and teacher login flows
- Secure password handling
- Session management
- Protected routes and API endpoints

### Security Features
- CSRF protection
- Input validation with Zod
- Secure API endpoints
- Environment variable protection

## 📊 API Documentation

### Endpoints Overview

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Token refresh

#### Teachers
- `GET /api/teachers/search` - Search teachers with filters
- `GET /api/teachers/[id]` - Get teacher details
- `PUT /api/teachers/[id]` - Update teacher profile

#### Payments & Bookings
- `POST /api/bookings/trial` - Create trial lesson booking
- `POST /api/payments/simple/course` - Process course payment
- `GET /api/payments/{paymentId}/status` - Check payment status
- `GET /api/teachers/{teacherId}/earnings` - Get teacher earnings
- `GET /api/bookings` - Get user bookings
- `PUT /api/bookings/[id]` - Update booking status

#### Payment API Examples

##### Trial Lesson Booking
```typescript
POST /api/bookings/trial
{
  teacherId: string,
  scheduledAt: string, // ISO format
  duration: number,    // minutes
  notes: string
}

// Response
{
  statusCode: 201,
  message: "Trial lesson booked successfully",
  data: {
    id: string,
    studentId: string,
    teacherId: string,
    scheduledAt: string,
    duration: number,
    status: "PENDING",
    isTrialLesson: true,
    // ... additional booking details
  }
}
```

##### Course Payment Processing
```typescript
POST /api/payments/simple/course
{
  courseId: string,
  paymentMethod: "captureWallet" | "payWithATM" | "payWithCC",
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  preferredStartDate: string,
  specialRequests?: string,
  couponCode?: string,
  bankCode?: string
}

// Response
{
  success: boolean,
  data: {
    paymentId: string,
    orderId: string,
    paymentUrl: string,
    amount: number,
    course: CourseDetails,
    student: StudentInfo
  }
}
```

## 🎯 Features in Detail

### Teacher Search & Discovery
- Advanced filtering by specialty, rating, price, availability
- Real-time search with debouncing
- Teacher profile pages with comprehensive information
- Certificate verification system

### 💳 Distributed Payment System

Our platform features a sophisticated **distributed payment ecosystem** that handles multiple payment scenarios with automated revenue distribution.

#### Core Payment Components
- **Payment Gateway Integration**: Multiple payment methods (Credit Card, ATM, Digital Wallet)
- **Distributed Ledger**: Smart revenue sharing between platform and teachers
- **Trial Lesson Booking**: Discounted introductory lessons (50% off)
- **Course Purchase System**: Full course package payments
- **Teacher Payout System**: Automated earnings distribution

#### Payment Flow Architecture

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

#### Revenue Distribution Model

| Payment Type | Platform Fee | Teacher Share | Processing Fee |
|-------------|-------------|---------------|----------------|
| Trial Lesson | 20% | 80% | 2.9% + $0.30 |
| Course Purchase | 15% | 85% | 2.9% + $0.30 |
| Regular Lesson | 18% | 82% | 2.9% + $0.30 |
| Group Class | 12% | 88% | 2.9% + $0.30 |

#### Supported Payment Methods

##### 1. Credit Card Processing
- **Provider**: Stripe/VNPay integration
- **Supported Cards**: Visa, Mastercard, AMEX, JCB
- **Security**: 3D Secure, CVV Verification, Fraud Detection
- **Processing Time**: Instant
- **Fees**: 2.9% + $0.30

##### 2. ATM/Bank Transfer
- **Provider**: VNPay/NAPAS integration
- **Supported Banks**: Vietcombank, Techcombank, BIDV, MB Bank
- **Processing Time**: 1-3 business days
- **Features**: QR Code Payment, Internet Banking, Mobile Banking

##### 3. Digital Wallets
- **Providers**: MoMo, ZaloPay, ViettelPay, PayPal
- **Processing Time**: Instant
- **Features**: One-touch Payment, Biometric Authentication

#### Payment Security & Compliance
- **PCI DSS Level 1** compliance for card data
- **GDPR** compliance for EU users
- **Vietnamese Banking Regulations** compliance
- **Anti-Money Laundering (AML)** procedures
- **Know Your Customer (KYC)** verification
- Advanced fraud detection algorithms
- SSL/TLS encryption for all transactions
- Real-time transaction monitoring

#### Financial Analytics Dashboard
- **Revenue Metrics**: Real-time tracking and reporting
- **Teacher Earnings**: Individual and aggregate analytics
- **Payment Success Rates**: Conversion and performance metrics
- **Transaction Monitoring**: Error tracking and processing analytics
- **Automated Reporting**: Weekly/monthly financial summaries

### Booking System
- Interactive calendar with real-time availability
- Trial lesson booking functionality
- Booking confirmation and management
- Payment integration ready

### Teacher Portal
- Comprehensive dashboard with analytics
- Student management system
- Booking request handling
- Schedule management
- Certificate showcase

### Student Experience
- Intuitive teacher discovery
- Easy booking process
- Learning progress tracking
- Review and rating system

## 🔮 Future Enhancements

### Future Enhancements

### Planned Features
- Real database integration (PostgreSQL/MongoDB)
- Video calling integration for lessons
- **Enhanced Payment Features**:
  - Cryptocurrency payment support (Bitcoin, Ethereum)
  - Subscription-based learning plans
  - Dynamic pricing algorithms
  - International payment methods
  - Advanced fraud detection
- Advanced analytics and reporting
- Mobile app development
- Real-time notifications
- Advanced search with AI recommendations

### Technical Improvements
- Performance optimizations
- SEO enhancements
- Advanced caching strategies
- Microservices architecture
- Real-time features with WebSocket

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use semantic commit messages
- Maintain responsive design principles
- Write comprehensive tests
- Document new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [Your Name]
- **Design**: Based on Antoree platform
- **Architecture**: Next.js 15 App Router

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in `/docs`

## 🙏 Acknowledgments

- [Antoree](https://antoree.com) - Original platform inspiration
- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Styling framework
- [Radix UI](https://radix-ui.com) - UI primitives
- [shadcn/ui](https://ui.shadcn.com) - Component architecture

---

**Built with ❤️ using Next.js 15 and modern web technologies**

## 📊 Demo Payment System Highlights

The Antoree Clone features a **sophisticated distributed payment system** that demonstrates:

- **Multiple Payment Gateways**: VNPay integration with credit card, ATM, and digital wallet support
- **Automated Revenue Distribution**: Smart splitting between platform (15-20%) and teachers (80-85%)
- **Real-time Processing**: Instant payment confirmation and booking creation
- **Security First**: PCI DSS compliant with fraud detection and secure token handling
- **Mobile Optimized**: Responsive payment flows for all devices
- **Comprehensive Analytics**: Detailed financial reporting and transaction monitoring

For detailed technical documentation, see [**Payment Flow Documentation**](PAYMENT_FLOW_DOCUMENTATION.md)

For detailed API documentation, see [docs/teachers-search-api.md](docs/teachers-search-api.md)
