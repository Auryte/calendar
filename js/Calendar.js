const getMondayByWeekDay = (initDate) => {
  const date = new Date(initDate.getTime());
  const monthDay = date.getDate();
  const weekDay = date.getDay();
  const monday = new Date(date.setDate(monthDay - weekDay + 1));

  return monday;
};

const getSundayByWeekDay = (initDate) => {
  const date = new Date(initDate.getTime());
  const monthDay = date.getDate();
  const weekDay = date.getDay();
  const sunday = new Date(date.setDate(monthDay - weekDay + 7));

  return sunday;
};

const getCalendarDays = (date) => {
  const firstMonthDay = new Date(date.getFullYear(), date.getMonth());
  const lastMonthDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const firstCalendarMonday = getMondayByWeekDay(firstMonthDay);
  const lastCalendarSunday = getSundayByWeekDay(lastMonthDay);

  return {
    firstMonthDay,
    lastMonthDay,
    firstCalendarMonday,
    lastCalendarSunday,
  };
};

const createCalendarDays = (date) => {
  const {
    firstMonthDay,
    lastMonthDay,
    firstCalendarMonday,
    lastCalendarSunday,
  } = getCalendarDays(date);

  const calendarDays = [];

  while (firstCalendarMonday < firstMonthDay) {
    const monthDay = firstCalendarMonday.getDate();
    const calendarDay = new CalendarDay({
      date: firstCalendarMonday,
      isCurrentMonth: false,
      showDetails,
    })
    calendarDays.push(calendarDay);
    firstCalendarMonday.setDate(monthDay + 1);
  }

  while (firstMonthDay <= lastMonthDay) {
    const monthDay = firstMonthDay.getDate();
    const calendarDay = new CalendarDay({
      date: firstMonthDay,
      isCurrentMonth: true,
      showDetails
    })
    calendarDays.push(calendarDay);
    firstMonthDay.setDate(monthDay + 1);
  }

  lastMonthDay.setDate(lastMonthDay.getDate() + 1);
  while (lastMonthDay <= lastCalendarSunday) {
    const monthDay = lastMonthDay.getDate();
    const calendarDay = new CalendarDay({
      date: lastMonthDay,
      isCurrentMonth: false,
      showDetails
    })
    calendarDays.push(calendarDay);
    lastMonthDay.setDate(monthDay + 1);
  }

  return calendarDays;
}

const isSameDate = (date1, date2) => {
  if (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  ) return true;
  return false;
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

class Calendar {
  // instance variables
  
  currentMonthDate;
  events;

  // HMTL elements
  htmlElement;
  prevBtn;
  nextBtn;
  dateContainer;
  daysContainer;

  constructor(selector, events, showDetails) {
    this.events = events;
    this.showDetails = showDetails;
    this.htmlElement = document.querySelector(selector);
    this.currentMonthDate = new Date();
    this.initView();
    this.prevBtn.addEventListener('click', this.prevMonth);
    this.nextBtn.addEventListener('click', this.nextMonth);
    this.render()
  }

  prevMonth = () => {
    this.currentMonthDate = new Date(
      this.currentMonthDate.getFullYear(),
      this.currentMonthDate.getMonth() - 1,
      1
    );
    this.render();
  }

  nextMonth = () => {
    this.currentMonthDate = new Date(
      this.currentMonthDate.getFullYear(),
      this.currentMonthDate.getMonth() + 1,
      1
    );
    this.render();
  }

  addEvent = (event) =>{
    this.events.push(event);
    this.render();
  }
  deleteEvent = (eventToDelete)=>{
    const eventIndex = this.events.findIndex(event => event.id === eventToDelete.id);
    this.events.splice(eventIndex, 1);
    this.render();
  }

  initView = () => {
    this.htmlElement.classList.add('calendar');
    this.htmlElement.innerHTML = `
    <header class="calendar__header">
      <div class="calendar__date">2022 vasaris</div>
      <div class="calendar__nav">
        <span class="calendar__nav-link js-prev">&lt;</span>
        <span class="calendar__nav-link js-next">&gt;</span>
      </div>
    </header>
    <header class="calendar__weekdays">
      <span class="calendar__week-day" title="Monday">M</span>
      <span class="calendar__week-day" title="Tuesday">T</span>
      <span class="calendar__week-day" title="Wednesday">W</span>
      <span class="calendar__week-day" title="Thoursday">T</span>
      <span class="calendar__week-day" title="Friday">F</span>
      <span class="calendar__week-day" title="Saturday">S</span>
      <span class="calendar__week-day" title="Sunday">S</span>
    </header>
    <section class="calendar__days"></section>`;
    this.prevBtn = this.htmlElement.querySelector('.js-prev');
    this.nextBtn = this.htmlElement.querySelector('.js-next');
    this.dateContainer = this.htmlElement.querySelector('.calendar__date');
    this.daysContainer = this.htmlElement.querySelector('.calendar__days');
  }

  renderTitle = () => {
    const year = this.currentMonthDate.getFullYear();
    const monthName = monthNames[this.currentMonthDate.getMonth()];
    this.dateContainer.innerHTML = `${year} ${monthName}`;
  }

  renderCalendarDays = () => {
    this.calendarDays = createCalendarDays(this.currentMonthDate, this.showDetails);
    const calendarDaysHTML = this.calendarDays.map(component => component.htmlElement);
    this.daysContainer.innerHTML = '';
    this.daysContainer.append(...calendarDaysHTML);
  }

  loadEvents = () => {
    for (let i = 0; i < this.events.length; i++) {
      const event = this.events[i];
      for (let j = 0; j < this.calendarDays.length; j++) {
        const calendarDay = this.calendarDays[j];
        if (isSameDate(event.date, calendarDay.date)) {
          calendarDay.addEvent(event);
          break;
        }
      }
    }
  }

  render = () => {
    this.renderTitle();
    this.renderCalendarDays();
    this.loadEvents();
  }
}