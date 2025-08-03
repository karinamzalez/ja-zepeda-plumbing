const twilio = require('twilio');
require('dotenv').config({ path: '.env.local' });

async function testTwilio() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;
  const toNumber = process.env.SMS_TARGET_NUMBER || '210-355-2804';

  console.log('🔍 Testing Twilio Configuration...\n');

  console.log('📱 Configuration Check:');
  console.log('Account SID:', accountSid ? '✅ Set' : '❌ Missing');
  console.log('Auth Token:', authToken ? '✅ Set' : '❌ Missing');
  console.log('From Number:', fromNumber ? '✅ Set' : '❌ Missing');
  console.log('To Number:', toNumber);
  console.log('');

  if (!accountSid || !authToken || !fromNumber) {
    console.log('❌ Twilio credentials not configured');
    console.log('Please set the following in your .env.local file:');
    console.log('TWILIO_ACCOUNT_SID=your_account_sid_here');
    console.log('TWILIO_AUTH_TOKEN=your_auth_token_here');
    console.log('TWILIO_PHONE_NUMBER=your_twilio_phone_number_here');
    console.log('');
    console.log('📋 Setup Steps:');
    console.log('1. Go to https://www.twilio.com/ and sign up');
    console.log('2. Get your Account SID and Auth Token from the console');
    console.log('3. Get a Twilio phone number');
    console.log('4. Update your .env.local file with the credentials');
    return;
  }

  try {
    console.log('📤 Creating Twilio client...');
    const client = twilio(accountSid, authToken);

    const testMessage = 'Test SMS from J.A. Zepeda Plumbing contact form';
    console.log('Sending test SMS...');
    console.log('From:', fromNumber);
    console.log('To:', toNumber);
    console.log('Message:', testMessage);
    console.log('');

    const result = await client.messages.create({
      body: testMessage,
      from: fromNumber,
      to: toNumber
    });

    console.log('✅ SMS sent successfully!');
    console.log('Message SID:', result.sid);
    console.log('Status:', result.status);
    console.log('');

    console.log('🎉 Twilio integration is working!');
    console.log('Your contact form should now send SMS messages.');

  } catch (error) {
    console.log('❌ Error sending SMS:');
    console.log('Error:', error.message);
    console.log('Error Code:', error.code);
    console.log('');

    if (error.code === 21211) {
      console.log('💡 This might be a phone number format issue');
      console.log('Make sure the phone number is in E.164 format (+1XXXXXXXXXX)');
    } else if (error.code === 21214) {
      console.log('💡 This might be a trial account restriction');
      console.log('Trial accounts can only send to verified numbers');
      console.log('Verify your target number in Twilio Console');
    } else if (error.code === 20003) {
      console.log('💡 This might be an authentication issue');
      console.log('Check your Account SID and Auth Token');
    }
  }
}

testTwilio(); 