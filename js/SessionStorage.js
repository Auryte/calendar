
// Singleton pattern
const SessionStorage = new (class SessionStorage {
  static mockEvents = [
    { title: 'Pavadinimas 1', description: 'aprasymas', startTime: '10:22', endTime: '11:34', date: '2022-01-24', type: 'OUT' },
    { title: 'Pavadinimas 2', description: 'aprasymas', startTime: '10:22', endTime: '11:34', date: '2022-01-25', type: 'MEETING' },
    { title: 'Pavadinimas 3', description: 'aprasymas', startTime: '10:22', endTime: '11:34', date: '2022-01-24', type: 'OUT' },
    { title: 'Pavadinimas 4', description: 'aprasymas', startTime: '10:22', endTime: '11:34', date: '2022-01-26', type: 'CALL' },
    { title: 'Pavadinimas 5', description: 'aprasymas', startTime: '10:22', endTime: '11:34', date: '2022-01-24', type: 'CALL' },
  ];

  constructor() {
    if (!this.get('events')) {
      this.set('events', SessionStorage.mockEvents)
    }
  }
  set = (name, value) => {
    window.sessionStorage.setItem(name, JSON.stringify(value))
  }

  get = (name) => {
    const events = window.sessionStorage.getItem(name);
    return events ? JSON.parse(events) : undefined;
  }
})();
