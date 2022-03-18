const axios = require("axios");

const returnsResults = async (website, search, res, pages, numberItens) => {
  const { cityName, minArea, maxArea, minBedrooms } = search;

  /*Axios*/
  const app = axios.create({
    headers: {
      "x-domain": website,
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36",
    },
    withCredentials: true,
  });

  /*Get cities list*/
  const urlCities = `https://glue-api.vivareal.com/v3/locations?q=${cityName}&fields=neighborhood%2Ccity%2Caccount%2Ccondominium%2Cpoi%2Cstreet&includeFields=address.city%2Caddress.neighborhood%2Caddress.state%2Caddress.locationId%2Curl%2Caddress.zone%2Cadvertiser.name%2CuriCategory.page%2Ccondominium.name%2Caddress.point%2Caddress.street&size=6&portal=VIVAREAL&amenities=Amenity_NONE&constructionStatus=ConstructionStatus_NONE&businessType=SALE&listingType=USED&unitTypes=UnitType_NONE&__vt=`;
  const dataCities = await app.get(urlCities);
  const arrayCities = dataCities.data?.city?.result?.locations;

  /*Extracts informations from the first city*/
  let addressCity = "",
    addressLocationId = "",
    addressState = "",
    addressPointLat = "",
    addressPointLon = "",
    categoryPage = "";

  if (Array.isArray(arrayCities) && arrayCities[0]) {
    const firstCity = arrayCities[0];
    const address = firstCity?.address;

    addressCity = address?.city;
    addressLocationId = address?.locationId;
    addressState = address?.state;
    addressPointLat = address?.point?.lat;
    addressPointLon = address?.point?.lon;
    categoryPage = firstCity?.uriCategory?.page;

    search.cityName = addressCity ? addressCity : "";
  }

  /*Basic url for SALES and RENTALS*/
  let urlResults =
    "https://glue-api.vivareal.com/v2/listings?facets=amenities&parentId=null&includeFields=search(result(listings(listing(displayAddressType%2Camenities%2CusableAreas%2CconstructionStatus%2ClistingType%2Cdescription%2Ctitle%2CunitTypes%2CnonActivationReason%2CpropertyType%2CunitSubTypes%2Cid%2Cportal%2CparkingSpaces%2Caddress%2Csuites%2CpublicationType%2CexternalId%2Cbathrooms%2CusageTypes%2CtotalAreas%2CadvertiserId%2Cbedrooms%2CpricingInfos%2CshowPrice%2Cstatus%2CadvertiserContact%2CvideoTourLink%2CwhatsappNumber%2Cstamps)%2Caccount(id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2Cphones)%2Cmedias%2CaccountLink%2Clink))%2CtotalCount)%2Cpage%2CseasonalCampaigns%2CfullUriFragments%2Cnearby(search(result(listings(listing(displayAddressType%2Camenities%2CusableAreas%2CconstructionStatus%2ClistingType%2Cdescription%2Ctitle%2CunitTypes%2CnonActivationReason%2CpropertyType%2CunitSubTypes%2Cid%2Cportal%2CparkingSpaces%2Caddress%2Csuites%2CpublicationType%2CexternalId%2Cbathrooms%2CusageTypes%2CtotalAreas%2CadvertiserId%2Cbedrooms%2CpricingInfos%2CshowPrice%2Cstatus%2CadvertiserContact%2CvideoTourLink%2CwhatsappNumber%2Cstamps)%2Caccount(id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2Cphones)%2Cmedias%2CaccountLink%2Clink))%2CtotalCount))%2Cexpansion(search(result(listings(listing(displayAddressType%2Camenities%2CusableAreas%2CconstructionStatus%2ClistingType%2Cdescription%2Ctitle%2CunitTypes%2CnonActivationReason%2CpropertyType%2CunitSubTypes%2Cid%2Cportal%2CparkingSpaces%2Caddress%2Csuites%2CpublicationType%2CexternalId%2Cbathrooms%2CusageTypes%2CtotalAreas%2CadvertiserId%2Cbedrooms%2CpricingInfos%2CshowPrice%2Cstatus%2CadvertiserContact%2CvideoTourLink%2CwhatsappNumber%2Cstamps)%2Caccount(id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2Cphones)%2Cmedias%2CaccountLink%2Clink))%2CtotalCount))%2Caccount(id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2Cphones%2Cphones)%2Cfacets%2Cdevelopments(search(result(listings(listing(displayAddressType%2Camenities%2CusableAreas%2CconstructionStatus%2ClistingType%2Cdescription%2Ctitle%2CunitTypes%2CnonActivationReason%2CpropertyType%2CunitSubTypes%2Cid%2Cportal%2CparkingSpaces%2Caddress%2Csuites%2CpublicationType%2CexternalId%2Cbathrooms%2CusageTypes%2CtotalAreas%2CadvertiserId%2Cbedrooms%2CpricingInfos%2CshowPrice%2Cstatus%2CadvertiserContact%2CvideoTourLink%2CwhatsappNumber%2Cstamps)%2Caccount(id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2Cphones)%2Cmedias%2CaccountLink%2Clink))%2CtotalCount))%2Cowners(search(result(listings(listing(displayAddressType%2Camenities%2CusableAreas%2CconstructionStatus%2ClistingType%2Cdescription%2Ctitle%2CunitTypes%2CnonActivationReason%2CpropertyType%2CunitSubTypes%2Cid%2Cportal%2CparkingSpaces%2Caddress%2Csuites%2CpublicationType%2CexternalId%2Cbathrooms%2CusageTypes%2CtotalAreas%2CadvertiserId%2Cbedrooms%2CpricingInfos%2CshowPrice%2Cstatus%2CadvertiserContact%2CvideoTourLink%2CwhatsappNumber%2Cstamps)%2Caccount(id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2Cphones)%2Cmedias%2CaccountLink%2Clink))%2CtotalCount))&levels=CITY";

  if (addressCity) {
    /*Add city parameters to urlResults*/
    const arrayParametersCity = [];
    if (addressCity)
      arrayParametersCity.push(`addressCity=${encodeURI(addressCity)}`);
    if (addressLocationId)
      arrayParametersCity.push(
        `addressLocationId=${encodeURI(addressLocationId)}`
      );
    if (addressState)
      arrayParametersCity.push(`addressState=${encodeURI(addressState)}`);
    if (addressPointLat)
      arrayParametersCity.push(`addressPointLat=${addressPointLat}`);
    if (addressPointLon)
      arrayParametersCity.push(`addressPointLon=${addressPointLon}`);
    if (categoryPage)
      arrayParametersCity.push(`categoryPage=${encodeURI(categoryPage)}`);

    urlResults += "&" + arrayParametersCity.join("&");

    /*Add the remaining parameters from payload to urlResults*/
    if (minArea || maxArea || minBedrooms) {
      const arrayParameters = [];
      if (maxArea) arrayParameters.push(`usableAreasMax=${maxArea}`);
      if (minArea) arrayParameters.push(`usableAreasMin=${minArea}`);
      if (minBedrooms) arrayParameters.push(`bedrooms=${minBedrooms}`);
      urlResults += "&" + arrayParameters.join("&");
    }

    /*Add page and item number parameters to urlResults & create promise array*/
    const promisses = [];
    if (numberItens) {
      urlResults += `&size=${numberItens}`;
      if (pages > 1) {
        for (let index = 1; index < pages; index++) {
          promisses.push(app.get(urlResults + `&from=${numberItens * index}`));
        }
      }
    }
    promisses.unshift(app.get(urlResults));

    /*Get promise results*/
    const resultsPromises = await Promise.all(promisses);

    /*Concatenate pagination results*/
    let listResults = [];
    resultsPromises.forEach((result) => {
      const listResultsPage = result.data?.search?.result?.listings;
      if (Array.isArray(listResultsPage)) {
        listResults = listResults.concat(listResultsPage);
      }
    });
    /*Returns concatenated results*/
    return listResults;
  } else {
    return [];
  }
};

module.exports = { returnsResults };
