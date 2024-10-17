const graphApiCall = async (url, method, token, data = null) => {
  const accessToken = await cca.acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });

  const config = {
    method: method,
    url: `https://graph.microsoft.com/v1.0${url}`,
    headers: {
      Authorization: `Bearer ${accessToken.accessToken}`,
      'Content-Type': 'application/json',
    },
    data: data,
  };
  return axios(config);
};
