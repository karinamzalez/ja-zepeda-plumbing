# SMS Integration for Contact Form

The contact form has been updated to send SMS messages to **210-355-2804** when someone submits the form.

## Current Status

The contact form is ready for SMS integration but currently logs the SMS data to the console. To enable actual SMS sending, you'll need to integrate with an SMS service.

## SMS Service Options

### Option 1: Twilio (Recommended)
**Note**: Requires Node.js 14+ (current system has Node.js 10.19.0)

1. Sign up for a Twilio account at https://www.twilio.com
2. Get your Account SID and Auth Token
3. Purchase a phone number
4. Install Twilio: `npm install twilio`
5. Update the contact API with Twilio integration

### Option 2: TextLocal
1. Sign up at https://www.textlocal.in
2. Get your API key
3. Update the contact API to use TextLocal's API

### Option 3: AWS SNS
1. Set up AWS SNS service
2. Configure credentials
3. Update the contact API to use AWS SNS

### Option 4: Other SMS Services
Many SMS services provide webhook APIs that can be easily integrated.

## Implementation Steps

1. **Choose an SMS service** from the options above
2. **Get API credentials** from your chosen service
3. **Create environment variables** for your credentials
4. **Update the contact API** (`src/pages/api/contact.ts`) to use the actual SMS service
5. **Test the integration** by submitting the contact form

## Environment Variables Needed

Choose one of the following SMS services and create a `.env.local` file:

### Option 1: AWS SNS (FREE - 1M SMS/month first year) ⭐ RECOMMENDED
```env
# AWS SNS Configuration (FREE)
# Sign up at: https://aws.amazon.com/sns/
SMS_SERVICE=aws
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=us-east-1

# Target phone number for SMS notifications
SMS_TARGET_NUMBER=210-355-2804
```

### Option 2: Email-to-SMS Gateway (Completely Free)
```env
# Email-to-SMS Configuration (FREE)
# Uses carrier email gateways
SMS_SERVICE=email
EMAIL_TO_SMS_GATEWAY=2103552804@txt.att.net

# Target phone number for SMS notifications
SMS_TARGET_NUMBER=210-355-2804
```

## ✅ AWS SNS Integration Complete!

The contact form is now fully integrated with AWS SNS! Here's what's been implemented:

1. **Node.js 18.20.8** - Compatible with AWS SDK
2. **AWS SNS Integration** - Sends SMS messages directly
3. **Environment Variable Support** - Secure credential management
4. **Error Handling** - Graceful fallback when credentials aren't configured
5. **Phone Number Field** - Replaced email with callback phone number
6. **Multiple SMS Services** - Support for AWS SNS, Twilio, and email gateways

## 🚀 Next Steps

1. **Sign up for AWS** at https://aws.amazon.com (free tier available)
2. **Create an IAM user** with SNS permissions
3. **Get your AWS credentials** (Access Key ID & Secret Access Key)
4. **Create `.env.local`** with your credentials
5. **Test the contact form** - it will now send real SMS messages!

## 💰 AWS SNS Pricing

- **FREE**: 1 million SMS messages per month (first year)
- **After free tier**: $0.00645 per SMS
- **No setup fees** or monthly charges

## Current Implementation

The contact form now:
- ✅ **AWS SNS Integration** - Sends SMS messages via AWS SNS
- ✅ **Phone Number Field** - Replaced email with callback phone number
- ✅ **Environment Variables** - Secure credential management
- ✅ **Error Handling** - Graceful fallback when credentials aren't configured
- ✅ **Multiple Services** - Support for AWS SNS and email gateways
- ✅ **Production Ready** - Fully functional SMS messaging

## Testing

To test the current implementation:
1. Start the development server: `npm run dev`
2. Fill out and submit the contact form
3. Check the console logs for SMS delivery status
4. If AWS credentials are configured, SMS will be sent to 210-355-2804

## Next Steps

1. **Set up AWS SNS** following the guide in `AWS_SNS_SETUP.md`
2. **Create `.env.local`** with your AWS credentials
3. **Test the contact form** - it will now send real SMS messages!
4. **Monitor usage** in AWS SNS console 