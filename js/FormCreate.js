class FormCreate {
  // instance variables
  errors

  // HMTL elements
  htmlElement;
  fields
  fieldContainers

  constructor(addEvent) {
    this.addEvent = addEvent;
    this.htmlElement = document.createElement('form');
    this.htmlElement.addEventListener('submit', this.handleSubmit);
    this.initView();
  }
 
  setVisibility = (show) =>{
   if (show){
    this.htmlElement.classList.remove('hide')
   }else{
    this.htmlElement.classList.add('hide')
   }
  }

  validate = () => {
    const errors = {};
    const { title, startTime, endTime, date, type } = this.values;
    // individual validations
    if (!title) {
      errors.title = 'Required field';
    } else if (title.length > 50) {
      errors.title = 'Max 50 characters';
    }

    if (!startTime) {
      errors.startTime = 'Required field';
    }

    if (!endTime) {
      errors.endTime = 'Required field';
    }

    if (!date) {
      errors.date = 'Required field';
    }

    if (!type) {
      errors.type = 'Required field';
    }

    // combined validations
    if (startTime && endTime) {
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      const [endHours, endMinutes] = endTime.split(':').map(Number);
      const startTotalMinutes = startHours * 60 + startMinutes;
      const endTotalMinutes = endHours * 60 + endMinutes;
      if (startTotalMinutes >= endTotalMinutes) {
        errors.endTime = 'Wrong end time';
      }
    }
    return errors;
  }

  get values() {
    const values = {};
    for (const name in this.fields) {
      values[name] = this.fields[name].value;
    }
    return values;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.cleanErrors();
    const errors = this.validate();
    if (Object.keys(errors).length === 0 ) {
      this.addEvent(this.values);
      this.clearInputs();
    } else {
      this.displayErrors(errors);
    }
  }

  createError = (parent, message) => {
    const errorBlock = document.createElement('div');
    errorBlock.className = 'error';
    errorBlock.innerHTML = message;
    parent.append(errorBlock);
  }

  displayErrors = (errors) => {
    for (const name in errors) {
      const errorMessage = errors[name];
      const fieldContainer = this.fieldContainers[name];
      this.createError(fieldContainer, errorMessage);
    }
  }

  cleanErrors = () => {
    const allErrors = Array.from(document.querySelectorAll('.error'));
    const inputs = Array.from(document.querySelectorAll('input'))
    inputs.map (input =>{
      input.onchange = 
      allErrors.map(error =>{
        error.innerHTML = ''
      })
    })
   
  }
  clearInputs = ()=>{
    const inputs = Array.from(document.querySelectorAll('input'))
    inputs.map(input =>{
      input.value = ''
    })
    const selectOption = Array.from(document.querySelectorAll('option'));
    document.getElementById("type").selectedIndex = 0
  }
  
  initView = () => {
    
    this.htmlElement.className = 'create-view';
    this.htmlElement.innerHTML = `
    <div class="create-view__grid"  >
      <div class="form-group grid-x-s-1 grid-x-e-3">
        <label for="title" class="form-group__label">Title</label>
        <input type="text" class="form-group__input" name="title" id="title">
      </div>
      <div class="form-group  grid-x-s-1 grid-x-e-3">
        <label for="description" class="form-group__label">Description</label>
        <input type="text" class="form-group__input" name="description" id="description">
      </div>
      <div class="form-group">
        <label for="date" class="form-group__label">Date</label>
        <input type="date" class="form-group__input" name="date" id="date">
      </div>
      <div class="form-group">
        <label for="type" class="form-group__label">Type</label>
        <select class="form-group__input" name="type" id="type">
          <option value="" selected disabled>-- select type</option>
          <option value="MEETING">Meeting</option>
          <option value="CALL">Call</option>
          <option value="OUT">Out of Office</option>
        </select>
      </div>
      <div class="form-group">
        <label for="startTime" class="form-group__label">Start Time</label>
        <input type="time" class="form-group__input" name="startTime" id="startTime">
      </div>
      <div class="form-group">
        <label for="endTime" class="form-group__label">End Time</label>
        <input type="time" class="form-group__input" name="endTime" id="endTime">
      </div>
    </div>
    <div class="text-center mt-3">
      <button class="btn" type="submit">Create Event</button>
    </div>`;
    const { fields, fieldContainers } = Array
      .from(this.htmlElement.querySelectorAll('[name]'))
      .reduce((result, field) => {
        result.fields[field.name] = field;
        result.fieldContainers[field.name] = field.parentElement;
        return result;
      }, {
        fields: {},
        fieldContainers: {}
      });
    this.fields = fields;
    this.fieldContainers = fieldContainers;
  }
}