const testEventConversion = () => {
  const eventsData = SessionStorage.get('events');
  const events = eventsData.map(eventData => new Event(eventData));
  const strigifiedEvents = events.map(event => event.stringify());
  return JSON.stringify(eventsData) === JSON.stringify(strigifiedEvents);
};

const runTests = () => {
  console.log({
    testEventConversion: testEventConversion()
  });
};

// runTests();
