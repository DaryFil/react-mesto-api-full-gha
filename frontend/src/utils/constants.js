export const settings = {
  baseUrl: "https://api.darimon.nomoredomains.xyz",
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json",
  },
};
