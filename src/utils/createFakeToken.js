export const createFakeJWT = (payload) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const base64Encode = (obj) =>
    btoa(unescape(encodeURIComponent(JSON.stringify(obj))));

  const encodedHeader = base64Encode(header);
  const encodedPayload = base64Encode(payload);
  const fakeSignature = 'mocksignature1234567890';

  return `${encodedHeader}.${encodedPayload}.${fakeSignature}`;
};