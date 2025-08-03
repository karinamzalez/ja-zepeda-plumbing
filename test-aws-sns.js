const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

// Test AWS SNS configuration
async function testAWSSNS() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION || 'us-east-1';
  const phoneNumber = process.env.SMS_TARGET_NUMBER || '682-557-6617';

  console.log('Testing AWS SNS Configuration:');
  console.log('Access Key ID:', accessKeyId ? '✅ Set' : '❌ Missing');
  console.log('Secret Access Key:', secretAccessKey ? '✅ Set' : '❌ Missing');
  console.log('Region:', region);
  console.log('Phone Number:', phoneNumber);

  // Format phone number
  let formattedNumber = phoneNumber;
  if (!formattedNumber.startsWith('+')) {
    const digitsOnly = formattedNumber.replace(/\D/g, '');
    formattedNumber = `+1${digitsOnly}`;
  }
  console.log('Formatted Number:', formattedNumber);

  if (!accessKeyId || !secretAccessKey) {
    console.log('❌ AWS credentials not configured');
    return;
  }

  try {
    // Initialize AWS SNS client
    const snsClient = new SNSClient({
      region: region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });

    // Test message
    const testMessage = 'Test SMS from J.A. Zepeda Plumbing contact form';
    
    console.log('Sending test SMS...');
    
    const publishCommand = new PublishCommand({
      Message: testMessage,
      PhoneNumber: formattedNumber,
    });

    const result = await snsClient.send(publishCommand);
    console.log('✅ SMS sent successfully!');
    console.log('Message ID:', result.MessageId);
    
  } catch (error) {
    console.log('❌ Error sending SMS:');
    console.log('Error:', error.message);
    console.log('Error Code:', error.name);
    
    if (error.name === 'InvalidParameter') {
      console.log('💡 This might be a phone number format issue');
    } else if (error.name === 'UnauthorizedOperation') {
      console.log('💡 This might be a permissions issue');
    }
  }
}

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Run test
testAWSSNS(); 