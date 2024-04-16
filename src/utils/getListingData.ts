import type WiseHouseError from "./wise_house_error";
import type { PropertyData } from "./types";

export default async function getListingData(
  id: string,
): Promise<PropertyData | undefined> {
  let wisehouse_key = import.meta.env.WISEHOUSE_API_KEY;
  let response: Response = await fetch(
    `https://api1-2v6xvmx6xq-as.a.run.app/listings?id=${id}`,
    {
      headers: {
        "WiseHouse-API-Key": wisehouse_key,
      },
    },
  );

  let propertyData: PropertyData | undefined = undefined;
  try {
    if (response.ok) {
      const ret = await response.json();
      propertyData = ret;
    } else {
      let err: WiseHouseError = await response.json();
      console.error(`when ${err.moment} : ${err.msg}`);
    }
  } catch (err) {
    console.error(JSON.stringify(err));
  }
  return propertyData;
}
