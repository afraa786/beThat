/**
 * Notification helpers — Email & WhatsApp
 *
 * TODO: install email provider SDK — e.g. `npm install @sendgrid/mail`
 *       Add SENDGRID_API_KEY to .env.local
 *
 * TODO: install WhatsApp provider SDK — e.g. Twilio or WATI
 *       For Twilio: `npm install twilio`
 *       Add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM to .env.local
 *       For WATI: use their REST API with WATI_API_ENDPOINT + WATI_API_TOKEN
 *
 * TODO: install firebase — `npm install firebase`
 *       Needed by sendOrderStatusNotification and sendBackInStockNotification
 *       to look up user contact details and back-in-stock subscriber lists.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NotificationResult {
  success: boolean;
  /** Provider message ID(s) for tracking / logging */
  messageIds?: string[];
  error?: string;
}

// ---------------------------------------------------------------------------
// Core primitives
// ---------------------------------------------------------------------------

/**
 * Sends a templated email via the configured provider (e.g. SendGrid).
 *
 * @param templateName  Provider template ID or internal template key.
 * @param recipients    Array of recipient email addresses.
 * @param data          Dynamic template variables to inject into the template.
 *
 * TODO: implement with SendGrid:
 *   import sgMail from '@sendgrid/mail';
 *   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
 *   await sgMail.send({
 *     to: recipients,
 *     from: 'hello@bethatpercent.com',
 *     templateId: templateName,
 *     dynamicTemplateData: data,
 *   });
 */
export async function sendEmail(
  templateName: string,
  recipients: string[],
  data: Record<string, unknown>,
): Promise<NotificationResult> {
  // TODO: replace stub with real SendGrid (or other provider) call
  console.warn(
    `[notifications.ts] sendEmail() stub — template="${templateName}", recipients=${JSON.stringify(recipients)}, data=`,
    data,
  );
  return { success: true, messageIds: ["stub-email-id"] };
}

/**
 * Sends a templated WhatsApp message via the configured provider (Twilio / WATI).
 *
 * @param templateName  WhatsApp template name (must be approved by Meta).
 * @param recipients    Array of recipient phone numbers in E.164 format (e.g. '+919876543210').
 * @param data          Template variable values (positional or named, per provider).
 *
 * TODO: implement with Twilio:
 *   import twilio from 'twilio';
 *   const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);
 *   for (const to of recipients) {
 *     await client.messages.create({
 *       from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
 *       to: `whatsapp:${to}`,
 *       contentSid: templateName,
 *       contentVariables: JSON.stringify(data),
 *     });
 *   }
 *
 * TODO: alternatively, implement with WATI REST API:
 *   POST {WATI_API_ENDPOINT}/api/v1/sendTemplateMessages
 *   headers: { Authorization: `Bearer ${process.env.WATI_API_TOKEN}` }
 */
export async function sendWhatsApp(
  templateName: string,
  recipients: string[],
  data: Record<string, unknown>,
): Promise<NotificationResult> {
  // TODO: replace stub with real Twilio / WATI call
  console.warn(
    `[notifications.ts] sendWhatsApp() stub — template="${templateName}", recipients=${JSON.stringify(recipients)}, data=`,
    data,
  );
  return { success: true, messageIds: ["stub-whatsapp-id"] };
}

// ---------------------------------------------------------------------------
// Higher-level notification workflows
// ---------------------------------------------------------------------------

/**
 * Sends an order status update notification (email + WhatsApp) to the customer.
 *
 * TODO: look up the user's email and phone number from Firestore:
 *   const userSnap = await db.collection('users').doc(userId).get();
 *   const { email, phone } = userSnap.data()!;
 *
 * TODO: look up the order document to include order details in the template:
 *   const orderSnap = await db.collection('orders').doc(orderId).get();
 *
 * TODO: map `status` to the correct template names for email and WhatsApp.
 *       Suggested convention: `order_${status}` (e.g. 'order_shipped').
 *
 * @param orderId  Firestore order document ID.
 * @param status   New order status (e.g. 'shipped', 'delivered').
 * @param userId   Firestore user document ID of the customer.
 */
export async function sendOrderStatusNotification(
  orderId: string,
  status: string,
  userId: string,
): Promise<void> {
  // TODO: install firebase — fetch real user + order data from Firestore
  const stubEmail = "customer@example.com";   // TODO: replace with Firestore lookup
  const stubPhone = "+919999999999";           // TODO: replace with Firestore lookup

  const templateData: Record<string, unknown> = {
    orderId,
    status,
    // TODO: add order items, tracking number, estimated delivery, etc.
  };

  const emailTemplate = `order_${status}_email`; // TODO: map to real template IDs
  const waTemplate = `order_${status}_whatsapp`; // TODO: map to approved WA templates

  await Promise.all([
    sendEmail(emailTemplate, [stubEmail], templateData),
    sendWhatsApp(waTemplate, [stubPhone], templateData),
  ]);

  console.info(
    `[notifications.ts] sendOrderStatusNotification — orderId="${orderId}", status="${status}", userId="${userId}"`,
  );
}

/**
 * Notifies all users who requested a back-in-stock alert for a specific
 * product size.
 *
 * TODO: install firebase — query Firestore for the subscriber list:
 *   const snaps = await db
 *     .collection('backInStockRequests')
 *     .where('productId', '==', productId)
 *     .where('sizeId', '==', sizeId)
 *     .where('notified', '==', false)
 *     .get();
 *
 * TODO: for each subscriber, send email + WhatsApp notification, then
 *       mark the document as notified:
 *   await snap.ref.update({ notified: true, notifiedAt: new Date().toISOString() });
 *
 * @param productId  Firestore product document ID.
 * @param sizeId     Size variant ID that is now back in stock.
 */
export async function sendBackInStockNotification(
  productId: string,
  sizeId: string,
): Promise<void> {
  // TODO: install firebase — replace stub with real Firestore subscriber query
  const subscribers: { email: string; phone: string }[] = []; // TODO: fetch from Firestore

  if (subscribers.length === 0) {
    console.info(
      `[notifications.ts] sendBackInStockNotification — no subscribers for productId="${productId}", sizeId="${sizeId}"`,
    );
    return;
  }

  const templateData: Record<string, unknown> = {
    productId,
    sizeId,
    // TODO: add product name, image, URL once Firestore lookup is in place
  };

  await Promise.all(
    subscribers.map(async (sub) => {
      await Promise.all([
        sendEmail("back_in_stock_email", [sub.email], templateData),
        sendWhatsApp("back_in_stock_whatsapp", [sub.phone], templateData),
      ]);
    }),
  );

  console.info(
    `[notifications.ts] sendBackInStockNotification — notified ${subscribers.length} subscriber(s)`,
  );
}
