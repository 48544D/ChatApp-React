export const baseUrl = "https://react-chat-app-server-xytc.onrender.com";

export const postRequest = async (url, body, token) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    let error;
    if (data?.error) error = data.error;
    else error = "something wrong happened";

    return { isError: true, error: error };
  }

  return data;
};

export const getRequest = async (url, token) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    let error;
    if (data?.error) error = data.error;
    else error = "something wrong happened";

    return { isError: true, error: error };
  }

  return data;
};
