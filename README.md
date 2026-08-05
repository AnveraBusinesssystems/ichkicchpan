# Ichkiichpan Cabin Manager

A lightweight cabin operations dashboard for Airbnb, Vrbo, Booking.com, direct, and agency reservations.

## Included
- Password entry (`ICHICH`)
- Dashboard metrics
- Monthly reservation calendar
- Upcoming reservation sidebar/cards
- Pending payment and cleaning alerts
- Reservation create/edit/delete
- Expense tracking
- Revenue and expense reports
- Apps Script endpoint setting
- LocalStorage fallback so the interface works before backend deployment

## Important security note
The static password is only a convenience gate because GitHub Pages serves public client-side files. Real access control must be implemented in the Apps Script/backend layer or through an authentication provider. Do not place calendar URLs, tokens, or private data in this repository.

## Google Apps Script connection
Deploy the Apps Script backend as a Web App, then paste its URL in **Settings → Apps Script URL**.

Expected API actions:
- `GET ?action=getAll`
- `POST saveReservation`
- `POST deleteReservation`
- `POST saveExpense`
- `POST deleteExpense`

The website continues to work locally if the API is unavailable.
