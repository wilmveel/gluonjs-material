const regex = /\@?[\#\.\w\-\,\s\n\r\t:\(\)]+(?=\s*\{)/g

module.exports = function (style) {

  const res = style.replace(regex, (selectorList) => {
    const res = selectorList.split(',')
      .filter(x => x !== 'to')
      .filter(x => x !== ' ')
      .map(x => `::slotted(${x})`)
      .map(x => {

        if(x.indexOf(':before') !== -1){
          x = x.replace(':before', '') + ':before'
        }

        if(x.indexOf(':after') !== -1){
          x = x.replace(':after', '') + ':after'
        }

        if(x.indexOf('@keyframes ') !== -1){
          x = '@keyframes ' + x.replace('@keyframes ', '')
        }

        if(x.indexOf('@') !== -1){
          x = '@' + x.replace('@', '')
        }

        return x
      })
      .join(',')

    return res
  });

  return res
}