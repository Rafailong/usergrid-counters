# usergrid-counters
A Node.js package to work with usergrid counter/events.

### Version
0.0.1

## Installation
```sh
npm i usergrid-counter
```

## Methods
### Create an event
You can create an event by setting the counter's name or an array to create multiple at the same time (`'counterName'` or `['counterName1', 'counterName2', ...]`).
```javascript
createEvent(counterName)
```
### Get counter
```javascript
getCounter(counterName)
```
### Get counter by time interval
```javascript
interval = {
  start_time: timeStamp,
  end_time: timeStamp,
  resolution: 'all'|'minute'|'five_minutes'|'half_hour'|'hour'|'six_day'|'day'|'week'|'month'
}

getCounterInterval(counterName, interval)
```
### Increment/Decrease counter
`increment` could be positive (to increment), negative (to decrease) or 0 to reset counter
```javascript
incrementCounter(counterName, increment)
```
### Reset counter
Short method for `incrementCounter(counterName, 0)`
```javascript
resetCounter(counterName)
```