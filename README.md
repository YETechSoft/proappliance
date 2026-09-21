### Pro Appliance Express

The Book Online page reads service and appliance types from the admin backend.
Set `ADMIN_API_URL=http://localhost:8082/api` for local development. Production
defaults to `https://api.proapplianceexpress.com/api`.

For Book Online order creation, set the same server-side secret in the web host
and admin backend as `PUBLIC_BOOKING_API_KEY`. This secret is never sent to the browser.
