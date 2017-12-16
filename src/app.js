const moment = require('moment');
moment().format();
const {Button, DateDialog, TextView, ui} = require('tabris');

// Tabis will pop up console log in application view for a few seconds
console.warn(moment.locale()); // en
console.error(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));

const DAY = moment().format("dddd, MMM Do YYYY")
const TIME = moment().format("h:mm:ss a")

let button = new Button({
  centerX: 0, top: 100,
  text: 'Show Date and Time'
}).appendTo(ui.contentView);

let textViewDay = new TextView({
  centerX: 0, top: [button, 50],
  font: '20px',
  textColor: '#ff0000'
}).appendTo(ui.contentView);

let textViewTime = new TextView({
  centerX: 0, top: [textViewDay, 50],
  font: '48px',
  textColor: 'blue'
}).appendTo(ui.contentView);

button.on('select', () => {
  textViewDay.text = DAY;
  textViewTime.text = TIME;
});

// this will PREVENT a date selection before or after 5 days
const FIVE_DAYS = 432000000;

new Button({
  left: 16, right: 16, top: 16,
  text: 'Show DateDialog'
}).on({select: showDateDialog})
  .appendTo(ui.contentView);

let selectionTextView = new TextView({
  left: 16, right: 16, top: ['prev()', 16],
  alignment: 'center'
}).appendTo(ui.contentView);

function showDateDialog() {
  let date = new Date();
  new DateDialog({
    date: date,
    // minDate: new Date(date.getTime() - FIVE_DAYS),
    // maxDate: new Date(date.getTime() + FIVE_DAYS)
  }).on({
    // select: ({date}) => selectionTextView.text = date,

    select: ({date}) => selectionTextView.text = 'The date you picked is: \n' + moment(date).fromNow(),
    close: () => console.log('DateDialog closed')
  }).open();
}
