const regex = /[\#\.\w\-\,\s\n\r\t:\(\)]+(?=\s*\{)/g

module.exports = function (style) {

  const res = style.replace(regex, (selector) => {
    const res = selector.split(',')
      .filter(x => x !== 'to')
      .map(x => `::slotted(${x})`)
      .map(x => {

        if(x.indexOf(':before') !== -1){
          x = x.replace(':before', '') + ':before'
        }

        if(x.indexOf(':after') !== -1){
          x = x.replace(':after', '') + ':after'
        }

        if(x.indexOf('@') !== -1){
          x = '@' + x.replace('@', '')
        }

        if(x.indexOf('@keyframes ') !== -1){
          x = '@keyframes ' + x.replace('@keyframes ', '')
        }

        return x
      })
      .join(',')

    //console.log(res)
    return res
  });

  return res
}