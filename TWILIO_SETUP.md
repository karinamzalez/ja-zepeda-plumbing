# Twilio Setup Guide for SMS Integration

## Overview
This guide will help you set up Twilio to send SMS messages from your contact form.

## Prerequisites
- Twilio Account (free trial available)
- Phone number to receive SMS notifications

## Step 1: Create Twilio Account

1. **Sign Up for Twilio**
   - Go to [Twilio.com](https://www.twilio.com/)
   - Click "Sign up for free"
   - Complete the registration process
   - Verify your email and phone number

2. **Get Your Credentials**
   - After signing up, go to your [Twilio Console](https://console.twilio.com/)
   - Find your **Account SID** and **Auth Token** on the dashboard
   - Save these securely

## Step 2: Get a Twilio Phone Number

1. **Purchase a Phone Number**
   - In Twilio Console, go to **Phone Numbers** → **Manage** → **Active numbers**
   - Click **"Get a trial number"** (free with trial account)
   - Choose a number that supports SMS
   - Click **"Choose this number"**

2. **Note Your Twilio Number**
   - Save the phone number you just got
   - This will be your "from" number for sending SMS

## Step 3: Configure Environment Variables

Update your `.env.local` file with your Twilio credentials:

```bash
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=your_twilio_phone_number_here

# Target phone number for SMS notifications
SMS_TARGET_NUMBER=210-355-2804
```

**Replace the placeholder values with your actual Twilio credentials.**

## Step 4: Install Dependencies

The Twilio package is already installed. If you need to reinstall:

```bash
npm install twilio
```

## Step 5: Test the Integration

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Test the contact form:**
   - Fill out the contact form on your website
   - Check the console logs for SMS delivery status

3. **Or test via API directly:**
   ```bash
   curl -X POST http://localhost:3000/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","phone":"555-123-4567","message":"Test message"}'
   ```

## Troubleshooting

### Common Issues:

1. **"Invalid credentials"**
   - Check your Account SID and Auth Token
   - Make sure they're copied correctly from Twilio Console

2. **"Phone number format"**
   - Twilio requires E.164 format (+1XXXXXXXXXX for US)
   - The system automatically formats your numbers

3. **"Trial account restrictions"**
   - Trial accounts can only send to verified numbers
   - Verify your target phone number in Twilio Console

### Trial Account Limitations:
- Can only send SMS to verified phone numbers
- Limited number of free SMS per month
- Need to upgrade for production use

### To Verify Your Target Number:
1. Go to Twilio Console
2. Navigate to **Phone Numbers** → **Manage** → **Verified Caller IDs**
3. Click **"Add a new Caller ID"**
4. Enter your target phone number
5. Verify with the code sent via SMS

## Pricing

### Trial Account (Free):
- $15-20 credit included
- Can send SMS to verified numbers only
- Perfect for testing and development

### Production Account:
- Pay-as-you-go pricing
- ~$0.0079 per SMS (US numbers)
- Can send to any valid phone number
- No monthly fees

## Security Notes

- Never commit `.env.local` to version control
- Keep your Auth Token secure
- Use environment variables in production
- Monitor your Twilio usage and billing

## Getting Help

- [Twilio Documentation](https://www.twilio.com/docs)
- [Twilio Support](https://support.twilio.com/)
- [Twilio Community](https://community.twilio.com/)

## Next Steps

1. Set up your Twilio credentials in `.env.local`
2. Test the contact form
3. Verify your target phone number (if using trial account)
4. Upgrade to production account when ready for live use 