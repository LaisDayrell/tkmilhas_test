const formatResults = (website, listResults) => {
  const results = [];

  listResults.forEach((listResult) => {
    const arrayPrices = [],
      iptu = [],
      condoFee = [];

    const {
      bedrooms,
      bathrooms,
      suites,
      description,
      title,
      usableAreas,
      pricingInfos,
      address,
    } = listResult.listing;

    if (Array.isArray(pricingInfos)) {
      pricingInfos.forEach((pricingInfo) => {
        const { price, yearlyIptu, monthlyCondoFee } = pricingInfo;
        arrayPrices.push(price);
        iptu.push(yearlyIptu);
        condoFee.push(monthlyCondoFee);
      });
    }

    const { city, complement, street, streetNumber, zipCode } = address;

    const link = listResult?.link?.href;

    results.push({
      bedrooms,
      bathrooms,
      suites,
      description,
      title,
      usableAreas,
      price: arrayPrices,
      iptu,
      condoFee,
      address: { city, complement, street, streetNumber, zipCode },
      link: website + (link ? link : ""),
    });
  });

  return results;
};

module.exports = { formatResults };
