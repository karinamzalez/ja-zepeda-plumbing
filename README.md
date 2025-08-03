# J.A. Zepeda Plumbing Website

A modern, responsive website for [J.A. Zepeda Plumbing](https://zepedaplumbing.com/) built with Next.js, TypeScript, and Tailwind CSS.

## 🏗️ Technical Architecture

### Frontend Stack
- **Next.js 15.4.4**: React framework with server-side rendering and API routes
- **TypeScript**: Type-safe JavaScript for better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Hooks**: Functional components with state management

### Backend Stack
- **Next.js API Routes**: Serverless functions for backend logic
- **Twilio**: SMS service for contact form notifications
- **Environment Variables**: Secure configuration management

## 📱 Contact Form Implementation

### Technical Decisions Made

#### 1. SMS Integration Journey
The contact form went through several iterations to find the optimal notification solution:

**Initial Approach: Twilio SDK**
- **Decision**: Use Twilio for SMS notifications
- **Challenge**: Node.js version compatibility (required Node 14+, had Node 10.19.0)
- **Solution**: Upgraded Node.js using `nvm` to version 18.20.8

**Alternative Services Explored:**
- **TextLocal**: Free SMS gateway
  - **Decision**: Attempted integration
  - **Challenge**: Platform deprecated, no new sign-ups accepted
  - **Outcome**: Abandoned

- **AWS SNS**: Amazon's Simple Notification Service
  - **Decision**: Implemented as free alternative
  - **Challenge**: Account in SMS sandbox mode, complex configuration
  - **Outcome**: User found configuration difficult, reverted to Twilio

**Final Implementation: Twilio with A2P 10DLC Challenge**
- **Current Status**: SMS messages sent successfully but not delivered
- **Issue**: A2P 10DLC (Application-to-Person 10-Digit Long Code) registration required
- **Impact**: Messages queued but blocked by US regulatory requirements

#### 2. Form Field Changes
**Original**: Email field for contact information
**Decision**: Replace with phone number for callback purposes
**Implementation**: 
- Updated `ContactForm` interface from `email` to `phone`
- Changed input type from `email` to `tel`
- Updated validation and state management

#### 3. Node.js Version Management
**Problem**: Multiple Node.js versions causing compatibility issues
**Solution**: 
- Created `.nvmrc` file specifying Node 18.20.8
- Used `nvm` for version management
- Removed `--turbopack` flag from dev script for compatibility

## 🔧 Development Setup

### Prerequisites
- Node.js 18.20.8 (specified in `.nvmrc`)
- npm or yarn package manager

### Installation
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Twilio credentials

# Start development server
npm run dev
```

### Environment Variables
Create a `.env.local` file with the following variables:

```env
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Target Configuration
SMS_TARGET_NUMBER=210-355-2804
```

## 📁 Project Structure

```
ja-zepeda-plumbing/
├── src/
│   ├── pages/
│   │   ├── api/
│   │   │   └── contact.ts          # Contact form API endpoint
│   │   ├── _app.tsx               # App wrapper
│   │   ├── _document.tsx          # Document wrapper
│   │   └── index.tsx              # Home page with contact form
│   └── styles/
│       └── globals.css            # Global styles
├── public/                        # Static assets
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── next.config.ts                 # Next.js configuration
├── tailwind.config.js             # Tailwind CSS configuration
└── README.md                      # This file
```

## 🚀 API Endpoints

### POST /api/contact
Handles contact form submissions and sends SMS notifications.

**Request Body:**
```typescript
{
  name: string;      // Customer name
  phone: string;     // Callback phone number
  message: string;   // Service request message
}
```

**Response:**
```typescript
{
  message: "Success";
  smsSent: boolean;
  twilioSid?: string;  // Twilio message SID if sent
  note?: string;       // Additional information
}
```

## 🔒 Security Considerations

### Environment Variables
- Sensitive credentials stored in `.env.local` (not committed to git)
- API keys and tokens kept secure
- Production deployment requires proper environment variable setup

### Input Validation
- Server-side validation of required fields
- TypeScript interfaces for type safety
- Sanitization of user inputs

## 🐛 Known Issues

### A2P 10DLC Registration
**Issue**: SMS messages not delivered to US numbers
**Cause**: Twilio requires A2P 10DLC registration for US SMS
**Status**: Messages sent successfully but blocked by regulatory requirements
**Solution Options**:
1. Complete A2P 10DLC registration (1-3 business days)
2. Implement email notifications as alternative
3. Use short codes instead of long codes

## 🧪 Testing

### Twilio Configuration Test
```bash
node test_twilio.js
```
This script verifies Twilio credentials and tests SMS sending capability.

## 📚 Documentation

- `TWILIO_SETUP.md`: Detailed Twilio setup instructions
- `SMS_INTEGRATION.md`: SMS service integration guide

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- Ensure environment variables are configured
- Set Node.js version to 18.20.8
- Configure build settings for Next.js

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to J.A. Zepeda Plumbing.

## 📞 Support

For technical support or questions about the implementation, refer to the documentation files or contact the development team.
