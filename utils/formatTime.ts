const formatTime = (total: number ) => {
  const hours = Math.floor(total / 3600)
  const mins = Math.floor(total / 60) - (hours * 60)
  let secs = Math.floor(total - (hours * 3600) - (mins * 60))
  let formatedStr = ''

  if (hours != 0 ) {
    formatedStr = `${hours}h ${mins}m`
  } else if (mins != 0) {
    formatedStr = `${mins}m`
  } else {
    formatedStr = '>1 m'
  }

  if (!secs) {
    secs = 60
  }

  return {
    formatedStr, secs
  }
}

export default formatTime