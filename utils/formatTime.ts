const formatTime = (total: number ) => {
  const hours = Math.floor(total / 3600)
  const mins = Math.floor(total / 60) - (hours * 60)
  const secs = Math.floor(total - (hours * 3600) - (mins * 60))

  if (hours <= 0 ) {
    return {
      formatedStr: `${mins}m`, secs
    }
  } else {
    return {
      formatedStr: `${hours}h ${mins}m`, secs
    }
  }
}

export default formatTime