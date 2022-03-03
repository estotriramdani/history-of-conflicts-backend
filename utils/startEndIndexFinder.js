function startEndIndexFinder({ querySection, itemsPerSection }) {
  const section = +querySection < 1 ? 1 : +querySection;
  const startIndex = (section - 1) * itemsPerSection;
  const endIndex = section * itemsPerSection - 1;
  return { section, startIndex, endIndex };
}

module.exports = startEndIndexFinder;
