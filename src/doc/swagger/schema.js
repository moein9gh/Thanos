/**
 * @swagger
 * components:
 *   schemas:
 *     SmsVerificationResponse200:
 *       example:
 *          success: true
 *          errorMessage: null
 *          message: "CREATED"
 *          body:
 *            type: object
 *            properties:
 *              phoneNumber:
 *                type: string
 *                description: phone number you sent
 *                example: 09224514124
 *
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     SmsVerificationResponse422:
 *       example:
 *          success: false
 *          errorMessage: invalid phone number
 *          message: "UNPROCESSABLE_ENTITY"
 *          body:
 *            type: object
 *            properties:
 *              phoneNumber:
 *                type: string
 *                description: phone number you sent
 *                example: testPhoneNumber
 */