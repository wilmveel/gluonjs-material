const regex = /\@?[\#\.\w\-\,\s\n\r\t:\(\)]+(?=\s*\{)/g

module.exports = function (style) {

  const res = style.replace(regex, (selectorList) => {
    const res = selectorList.split(',')
      .map(x => {

        if (x.trim() === 'to') {
          return x;
        }

        if (x.indexOf('@keyframes ') !== -1) {
          return x;
        }

        x = `::slotted(${x})`;

        if (x.indexOf(':before') !== -1) {
          x = x.replace(':before', '') + ':before'
        }

        if (x.indexOf(':after') !== -1) {
          x = x.replace(':after', '') + ':after'
        }


        return x
      })
      .join(',')

    //console.log(res)

    return res
  });

  return res
}