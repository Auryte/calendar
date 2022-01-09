const eventDataArr = SessionStorage.get('events');
const events = eventDataArr.map(event => new Event(event));

const addEvent = (event) => {
  const newEvent = new Event(event);
  eventDataArr.push(newEvent);
  SessionStorage.set('events', eventDataArr);

  calendar.addEvent(newEvent);
};

const showDetails = (event) => {
  sidebar.setDetails(event);
};

const deleteEvent = (eventToDelete) => {
  const eventIndex = eventDataArr.findIndex(event => event.id === eventToDelete.id);
  eventDataArr.splice(eventIndex, 1);
  SessionStorage.set('events', eventDataArr);

  calendar.deleteEvent(eventToDelete);
};
const calendar = new Calendar('#calendar', events, showDetails);
const sidebar = new Sidebar('#sidebar', addEvent, deleteEvent);
