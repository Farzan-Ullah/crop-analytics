// Treat missing values as 0
export const processData = (data) => {
  return data.map((item) => ({
    ...item,
    "Crop Production (UOM:t(Tonnes))":
      item["Crop Production (UOM:t(Tonnes))"] || 0,
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))":
      item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || 0,
    "Area Under Cultivation (UOM:Ha(Hectares))":
      item["Area Under Cultivation (UOM:Ha(Hectares))"] || 0,
  }));
};

// Analytics functions
export const getMaxMinProductionPerYear = (data) => {
  const result = {};
  data.forEach((item) => {
    const year = item.Year.match(/\d+/)[0];
    if (!result[year]) result[year] = { max: item, min: item };
    if (
      item["Crop Production (UOM:t(Tonnes))"] >
      result[year].max["Crop Production (UOM:t(Tonnes))"]
    ) {
      result[year].max = item;
    }
    if (
      item["Crop Production (UOM:t(Tonnes))"] <
      result[year].min["Crop Production (UOM:t(Tonnes))"]
    ) {
      result[year].min = item;
    }
  });
  return result;
};

export const getAverageYieldAndArea = (data) => {
  const cropStats = {};
  data.forEach((item) => {
    const crop = item["Crop Name"];
    if (!cropStats[crop]) cropStats[crop] = { yield: 0, area: 0, count: 0 };
    cropStats[crop].yield +=
      item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"];
    cropStats[crop].area += item["Area Under Cultivation (UOM:Ha(Hectares))"];
    cropStats[crop].count += 1;
  });

  const result = Object.keys(cropStats).map((crop) => ({
    crop,
    avgYield: (cropStats[crop].yield / cropStats[crop].count).toFixed(3),
    avgArea: (cropStats[crop].area / cropStats[crop].count).toFixed(3),
  }));

  return result;
};
