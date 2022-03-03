const transformedData = require('../data/transformed-data.json');
const startEndIndexFinder = require('../utils/startEndIndexFinder');

const partsController = async (req, res) => {
  const querySection = req.query.section || '1';
  const itemsPerSection =
    +req.query.itemsPerSection || transformedData.length + 1;
  const { endIndex, section, startIndex } = startEndIndexFinder({
    querySection,
    itemsPerSection,
  });
  const maxSection = Math.ceil(transformedData.length / itemsPerSection);
  if (+querySection > maxSection) {
    res.status(404).json({
      status: false,
      message: 'No more sections',
      data: {
        itemsPerSection,
        maxSection,
      },
    });
  }
  const data = transformedData
    .map((item, index) => {
      if (index >= startIndex && index <= endIndex) {
        return {
          id: index + 1,
          name: `Part ${index + 1}`,
          from: item[0].Date,
          to: item[item.length - 1].Date,
          link: `/api/parts/${index + 1}`,
        };
      }
    })
    .filter((item) => item);
  res.status(200).json({
    status: true,
    message: 'Sections of parts were successfully fetched',
    data: {
      itemsPerSection,
      section,
      startIndex,
      endIndex,
      maxSection,
      data,
    },
  });
};

const partController = async (req, res) => {
  const { params } = req;
  const part = params.part ? +params.part - 1 : 1;
  if (part > transformedData.length - 1) {
    res.status(404).json({ status: false, message: 'No more parts' });
  }
  res.status(200).json({
    status: true,
    message: 'List of parts was successfully fetched',
    data: transformedData[part],
  });
};

module.exports = { partsController, partController };
