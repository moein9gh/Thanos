/**
 * @swagger
 * /api/auth/sms-verification:
 *   get:
 *     summary: send a verification code to specific phone number
 *     tags: [auth(get)]
 *     parameters:
 *       - in: query
 *         name: phoneNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: The user phone number
 *     responses:
 *       200:
 *         description: sms will send to phone number
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SmsVerificationResponse200'
 *       422:
 *         description: sms will not send to phone number because received data is invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SmsVerificationResponse422'
 *       500:
 *         description: Some server error
 *
 */