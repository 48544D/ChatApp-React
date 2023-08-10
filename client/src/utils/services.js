export const baseUrl = "http://localhost:3030";

export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = await response.json();

  console.log(data);

  if (!response.ok) {
    let error;
    if (data?.error) error = data.error;
    else error = "something wrong happened";

    return { isError: true, error: error };
  }

  return data;
};
