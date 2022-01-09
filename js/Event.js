// ENUM

const createIdGenerator = (idBase) => () => {
  idBase++;
  return String(idBase);
}
const createUniqId = createIdGenerator(1);

class Event {
  static Type = {
    OUT: 'OUT',
    MEETING: 'MEETING',
    CALL: 'CALL',
  };

  id;
  title;
  description;
  startTime;
  endTime;
  date;
  type;

  constructor({ title, description, startTime, endTime, date, type }) {
    // if type is incorrect, instance.type is undefined
    this.id = createUniqId();
    this.title = title;
    this.description = description;
    this.date = new Date(date);
    this.startTime = startTime;
    this.endTime = endTime;
    this.type = Event.Type[type];
  }

  stringify = () => {
    const { title, description, startTime, endTime, date, type } = this;
    const year = date.getFullYear();
    const rawMonth = date.getMonth() + 1;
    const month = rawMonth < 10 ? '0' + rawMonth : String(rawMonth);
    const day = date.getDate();

    return {
      title,
      description,
      startTime,
      endTime,
      date: `${year}-${month}-${day}`,
      type,
    }
  }
}

