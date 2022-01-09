class CalendarDay {
  date;
  events;
  isCurrentMonth;

  // HTML elements
  htmlElement;
  eventContainer;

  constructor({ date, isCurrentMonth, showDetails }) {
    this.showDetails = showDetails;
    this.events = [];
    this.date = new Date(new Date(date.getTime()));
    this.isCurrentMonth = isCurrentMonth;
    this.initView();
    this.render();
  }

  addEvent = (event) => {
    this.events.push(event);
    this.render();
  }

  initView = () => {
    this.htmlElement = document.createElement('span');
    this.htmlElement.className = 'calendar__month-day';
    if (!this.isCurrentMonth) {
      this.htmlElement.classList.add('muted');
    }
    this.htmlElement.innerHTML = `
      <span class="calendar__month-day__number">${this.date.getDate()}</span>
      <div class="calendar__month-day__events"></div>
    `;
    this.eventContainer = this.htmlElement.querySelector('.calendar__month-day__events');
  }
  
  createEventView = (event) => {
    const eventView = document.createElement('span');
    eventView.className = 'calendar__month-day__event';
    let classModifier;
    switch (event.type) {
      case Event.Type.OUT:
        classModifier = 'out'
        break;
      case Event.Type.MEETING:
        classModifier = 'meeting'
        break;
      case Event.Type.CALL:
        classModifier = 'call'
        break;
      default:
        break;
    }
    eventView.classList.add(classModifier);
    eventView.innerHTML = `
      <div class="calendar__month-day__event__dot"></div>
      <div class="calendar__month-day__event__title ">${event.title}</div>`;
      eventView.addEventListener('click', ()=> showDetails(event))
    return eventView;
  }

  render = () => {
    this.eventContainer.innerHTML = '';
    if (this.events.length !== 0) {
      const eventViewArr = this.events.map(this.createEventView)
      this.eventContainer.append(...eventViewArr);
    }
  }

}