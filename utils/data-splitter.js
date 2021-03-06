const fs = require('fs');
const path = require('path');
const rawData = require('../data/raw-data.json');

const dataSpiltter = ({ totalItemsPerPart }) => {
  const totalRestItems = rawData.length % totalItemsPerPart;
  const splittedData = [];
  let soonPushedData = [];
  const restPushedData = [];
  const firstIndexRestData = rawData.length - totalRestItems + 1;
  rawData.forEach((item, index) => {
    soonPushedData.push(item);
    if (index % totalItemsPerPart === 0 && index !== 0) {
      splittedData.push(soonPushedData);
      soonPushedData = [];
    }
  });
  for (let index = firstIndexRestData; index < rawData.length; index++) {
    restPushedData.push(rawData[index]);
  }
  splittedData.push(restPushedData);
  return splittedData;
};

const splittedData = dataSpiltter({
  totalItemsPerPart: 20,
});

const targetPath = path.join(__dirname, '../data/transformed-data.json');
if (fs.existsSync(targetPath)) {
  fs.unlinkSync(targetPath);
}
fs.writeFileSync(targetPath, JSON.stringify(splittedData), {
  flag: 'wx',
  encoding: 'utf-8',
});

splittedData.forEach((element, index) => {
  const splittedTargetPath = path.join(
    __dirname,
    `../data/splitted-data/${index + 1}.json`
  );
  if (fs.existsSync(splittedTargetPath)) {
    fs.unlinkSync(splittedTargetPath);
  }
  fs.writeFileSync(splittedTargetPath, JSON.stringify(element), {
    flag: 'wx',
    encoding: 'utf-8',
  });
});
