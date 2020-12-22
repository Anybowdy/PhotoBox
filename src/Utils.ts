const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const getReadableFromTimestamp = (timestamp: number) => {
  let now = new Date().getTime();
  var result: number = -1;
  var timeType: string = '';

  let sec = Math.floor((now - timestamp) / 1000);
  let min = Math.floor(sec / 60);
  let hour = Math.floor(min / 60);

  if (sec < 60) {
    result = sec;
    timeType = 'seconde';
  } else if (min < 60) {
    result = min;
    timeType = 'minute';
  } else if (hour < 24) {
    result = hour;
    timeType = 'heure';
  }
  return 'Il y a ' + result + ' ' + timeType + (result > 1 ? 's' : '');
};

export { uuidv4, getReadableFromTimestamp };
