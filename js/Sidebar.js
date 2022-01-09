class Sidebar {
  //instance variables
  showForm;
  showDetails;
  // HTML elements
  htmlElement;
  constructor(selector, addEvent, deleteEvent) {
    this.showForm = true;
    this.showDetails = false;
    this.addEvent = addEvent;
    this.deleteEvent = deleteEvent;
    this.htmlElement = document.querySelector(selector);
    this.initView();
  }

  setDetails = (event)=>{
    this.showForm = false;
    this.showDetails = true;
    this.formCreate.setVisibility(this.showForm);
    this.detailsView.setDetails(event);
    this.detailsView.setVisibility(this.showDetails)
  }
  toggleFormView = () => {
    this.showForm = !this.showForm; 
    this.formCreate.setVisibility(this.showForm);
    this.showDetails = !this.showDetails;
    this.detailsView.setVisibility(this.showDetails)
  }
  
  initView = () => {
    this.htmlElement.className = 'side-view';

    this.formCreate = new FormCreate(this.addEvent, this.toggleCreateView);
    this.detailsView = new DetailsView(this.deleteEvent);
    this.header = document.createElement('div');
    this.header.className = 'create-button';
    this.header.innerHTML = '<h1 class="create-view__header">+ Create Event</h1>';

    this.htmlElement.append(
      this.header,
      this.formCreate.htmlElement,
      this.detailsView.htmlElement
    )
    this.button = document.querySelector('.create-button');
    this.button.addEventListener('click', this.toggleFormView);
  }

}
