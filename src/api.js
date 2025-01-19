export async function getDirectoryInfo(id) {
  const response = await fetch(
    `https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/${
      id ?? ""
    }`,
    {
      method: "GET",
    }
  );
  const json = await response.json();
  return json;
}
