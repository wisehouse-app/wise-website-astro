export default async function getDynamicListing(
  id: string,
  sessionID: string | null,
): Promise<string[] | undefined> {
  if (!sessionID) {
    return undefined;
  }
  let wisehouse_key = import.meta.env.WISEHOUSE_API_KEY;

  const dynamicResponse: Response = await fetch(
    `https://api1-2v6xvmx6xq-as.a.run.app/dynamic_listing?id=${id}&session_id=${sessionID}`,
    {
      headers: {
        "WiseHouse-API-Key": wisehouse_key,
      },
    },
  );
  let dynamicDecription: string[] | undefined = undefined;
  if (dynamicResponse.ok) {
    const r = await dynamicResponse.json();
    dynamicDecription = r.listing.split("\\n");
  }
  return dynamicDecription;
}
