// Email service supporting live Resend API or rich simulation for local/portfolio viewing

interface BookingConfirmationDetails {
  reference: string;
  guestName: string;
  guestEmail: string;
  partySize: number;
  date: string;
  timeSlot: string;
  seatingArea: string;
  occasion?: string | null;
  specialRequests?: string | null;
}

export function generateBookingEmailHtml(details: BookingConfirmationDetails): string {
  const areaLabels: Record<string, string> = {
    HEARTH_COUNTER: "Ember Hearth Counter (Chef's View)",
    MAIN_DINING: "Main Dining Room",
    WINE_VAULT: "The Sommelier Wine Vault",
    TERRACE: "Heated Garden Terrace",
    ANY: "Main Dining Room",
  };

  const seatingLabel = areaLabels[details.seatingArea] || details.seatingArea;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #161210; color: #F5EFEB; margin: 0; padding: 40px 20px; }
    .container { max-width: 580px; margin: 0 auto; background-color: #1E1815; border: 1px solid #362A23; padding: 40px; border-radius: 2px; }
    .header { text-align: center; border-bottom: 1px solid #362A23; padding-bottom: 30px; margin-bottom: 30px; }
    .title { font-family: 'Georgia', serif; font-size: 28px; letter-spacing: 2px; color: #F5EFEB; margin: 0; text-transform: uppercase; }
    .subtitle { color: #D97A3F; font-size: 13px; letter-spacing: 3px; margin-top: 8px; text-transform: uppercase; }
    .booking-ref { background: #27201B; border: 1px dashed #C9A962; padding: 16px; text-align: center; margin: 24px 0; }
    .ref-code { font-family: monospace; font-size: 24px; color: #C9A962; font-weight: bold; letter-spacing: 2px; }
    .details-table { width: 100%; border-collapse: collapse; margin: 24px 0; }
    .details-table td { padding: 12px 0; border-bottom: 1px solid #29201A; font-size: 14px; }
    .label { color: #AA9C92; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; }
    .value { color: #F5EFEB; text-align: right; font-weight: 500; }
    .footer { text-align: center; color: #78695F; font-size: 12px; margin-top: 36px; border-top: 1px solid #29201A; padding-top: 24px; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="title">Ember &amp; Oak</h1>
      <div class="subtitle">Modern Bistro &amp; Wood-Fired Hearth</div>
    </div>
    <p>Dear ${details.guestName},</p>
    <p>Your table has been reserved. We eagerly anticipate welcoming you for an evening of wood-fired gastronomy and heritage craft.</p>
    
    <div class="booking-ref">
      <div class="label">Reservation Reference</div>
      <div class="ref-code">${details.reference}</div>
    </div>

    <table class="details-table">
      <tr>
        <td class="label">Date</td>
        <td class="value">${details.date}</td>
      </tr>
      <tr>
        <td class="label">Time</td>
        <td class="value">${details.timeSlot}</td>
      </tr>
      <tr>
        <td class="label">Party Size</td>
        <td class="value">${details.partySize} ${details.partySize === 1 ? "Guest" : "Guests"}</td>
      </tr>
      <tr>
        <td class="label">Seating Area</td>
        <td class="value">${seatingLabel}</td>
      </tr>
      ${details.occasion ? `
      <tr>
        <td class="label">Occasion</td>
        <td class="value">${details.occasion}</td>
      </tr>` : ""}
      ${details.specialRequests ? `
      <tr>
        <td class="label">Notes</td>
        <td class="value">${details.specialRequests}</td>
      </tr>` : ""}
    </table>

    <p style="font-size: 13px; color: #AA9C92; line-height: 1.6;">
      <strong>Dining Policy:</strong> We hold reserved tables for up to 15 minutes past the scheduled time. Should your schedule change, please cancel or notify our concierge at least 24 hours in advance.
    </p>

    <div class="footer">
      Ember &amp; Oak &bull; 412 Artisan Way, Historic Arts District<br>
      Reservations Concierge: +1 (555) 362-3762 &bull; concierge@emberandoak.restaurant
    </div>
  </div>
</body>
</html>
`;
}

export async function sendReservationConfirmationEmail(
  details: BookingConfirmationDetails
): Promise<{ success: boolean; simulated: boolean; html: string }> {
  const html = generateBookingEmailHtml(details);
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Ember & Oak <reservations@emberandoak.restaurant>",
          to: details.guestEmail,
          subject: `Your Reservation at Ember & Oak [${details.reference}]`,
          html,
        }),
      });

      if (response.ok) {
        return { success: true, simulated: false, html };
      }
    } catch (err) {
      console.warn("Failed to send real Resend email, falling back to simulated:", err);
    }
  }

  // Simulated confirmation for portfolio demo / dev mode
  return { success: true, simulated: true, html };
}
