export async function sendSMS(phoneNumber, text): Promise<boolean> {
  if (!phoneNumber || !text) {
    return false;
  }
  const token = process.env.SMS_TOKEN;
  const bodyId = process.env.SMS_BODY_ID;
  let json = {
    args: [text.toString()],
    to: phoneNumber,
    bodyId: bodyId
  };

  try {
    // let resp =  await axios.post('https://console.melipayamak.com/api/send/shared/'+token, json)
    return true;
  } catch (error) {
    return false;
  }
}
