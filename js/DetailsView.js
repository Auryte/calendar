class DetailsView{
  htmlElement;

  constructor() {
    this.initView();
  }

  setVisibility = (show) =>{
    if (show){
     this.htmlElement.classList.remove('hide')
    }else{
     this.htmlElement.classList.add('hide')
    }
   }

   setDetails = (event, deleteEvent)=>{
    this.deleteEvent = deleteEvent;
    this.event = event;
    this.title = event.title;
    this.description = event.description;
    this.date = event.date;
    this.startTime = event.startTime;
    this.endTime = event.endTime;
    this.type = event.type;
    this.render();
   }
   handleClick =()=>{
     deleteEvent(this.event);
     this.htmlElement.classList.add('hide');
   }
   initView = () => {
     this.htmlElement = document.createElement('div');
     this.htmlElement.className = 'details-view hide';
   };
 
  render = ()=>{
    const { title, description, startTime, endTime, date, type } = this;
    const renderDate = `${date.getFullYear()} - ${date.getMonth() + 1 } - ${date.getDate()}`
    this.htmlElement.innerHTML = `
    <h3>Event Details </h3>
    <div class="details-view__grid"  >
    <div class="details-group grid-x-s-1 grid-x-e-3">
     <h5>Title <span>${title}</span></h5>
    </div>
    <div class="details-group  grid-x-s-1 grid-x-e-3">
    <h5>Description <span>${description}</span></h5>
    </div>
    <div class="details-group">
      <h5>StartTime <span>${startTime}</span></h5>
    </div>
    <div class="details-group">
      <h5>EndTime <span>${endTime}</span></h5>
    </div>
    <div class="details-group">
      <h5>Date <span>${renderDate}</span></h5>
    </div>
    <div class="details-group">
      <h5>Type <span>${type}</span></h5>
    </div>
    <div class="text-center mt-3">
          <button class="btn" >Delete Event</button>
        </div>
  </div>`;
  this.button = this.htmlElement.querySelector('button');
  this.button.addEventListener('click', () => this.handleClick());
  }

}