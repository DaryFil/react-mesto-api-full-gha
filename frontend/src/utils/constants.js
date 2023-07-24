export const settings = {
  baseUrl: "http://api.darimon.nomoredomains.xyz",
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json",
  },
};
