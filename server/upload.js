const fetch = require('node-fetch');
const qs = require('querystring');

const tenantId = 'TU_TENANT_ID';
const clientId = 'TU_CLIENT_ID';
const clientSecret = 'TU_CLIENT_SECRET';

async function getAccessToken() {
  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const body = qs.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials'
  });

  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });

  const data = await res.json();
  if (data.access_token) return data.access_token;
  throw new Error(JSON.stringify(data));
}
