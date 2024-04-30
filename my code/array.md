# JAVASCRIPT ARRAY

## METHODS

### Array remove duplicates
```javascript
 RRUs = [ ... new Set(RRUs) ];
```

### Array each element manipulation
```javascript
const array = [1,2,3]
const arrayTwoTimes.map(element => element * 2) // [2,4,6]
```

### Array slice
```javascript
```

### Array splice
```javascript
```

### Array concatenation
```javascript
// suppose we have two arrays
const array1 = [1,2,3];
const array2 = [4,5,6];

// to concate those two arrays
const newArray = [...array1, array2];
```

### Array reduce

```javascript

const array = [
  {
    additionalInfo: [],
    ManagedElement: 'WL-MEN056,SystemFunctions=1,Fm=1,FmAlarm=8757',
    activeSeverity: 'Warning',
    additionalText: 'Configured NTP server is not used as basis for time of day clock',
    eventType: 'COMMUNICATIONSALARM',
    isNotified: 'NOTIFIED',
    lastEventTime: { date: '2024-02-01', hour: '18:29:12' },
    majorType: '193',
    minorType: '9175059',
    originalAdditionalText: 'Configured NTP server is not used as basis for time of day clock',
    originalEventTime: { date: '2024-02-01', hour: '18:29:12' },
    originalSeverity: 'Warning',
    probableCause: '14',
    sequenceNumber: '18230',
    source: 'ManagedElement=WL-MEN056,SystemFunctions=1,SysM=1,TimeM=1,Ntp=1,NtpServer=1',
    specificProblem: 'Calendar Clock NTP Server Unavailable',
    value: '{"C":[{"I":"94750000-f324-11eb-8e92-58454c72d9d5","n":"RadioNode"}]}'
  },
  {
    additionalInfo: [{ name: 'PLMN ID-eNB ID 1 ', value: ' 6464-404017' }],
    ManagedElement: 'WL-MEN056,SystemFunctions=1,Fm=1,FmAlarm=8778',
    activeSeverity: 'Minor',
    additionalText: 'X2 link problem to one or several neighbouring eNodeBs.',
    eventType: 'EQUIPMENTALARM',
    isNotified: 'NOTIFIED',
    lastEventTime: { date: '2024-03-21', hour: '08:22:43' },
    majorType: '193',
    minorType: '9175110',
    originalAdditionalText: 'X2 link problem to one or several neighbouring eNodeBs.',
    originalEventTime: { date: '2024-03-21', hour: '08:22:43' },
    originalSeverity: 'Minor',
    probableCause: '517',
    sequenceNumber: '18281',
    source: 'ManagedElement=WL-MEN056,ENodeBFunction=1',
    specificProblem: 'External Link Failure'
  }
];

const mostRecentElement = array.reduce((max, current) => {
  const maxTime = new Date(max.lastEventTime.date + ' ' + max.lastEventTime.hour);
  const currentTime = new Date(current.lastEventTime.date + ' ' + current.lastEventTime.hour);
  return currentTime > maxTime ? current : max;
}, array[0]);

console.log(mostRecentElement);

```
