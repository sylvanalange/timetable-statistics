
function createNewTimetable(subjects) {
	var timetable = {
		"weekdays" : [
			{
				"name" : "Monday",
			},
			{
				"name" : "Tuesday"
			},
			{
				"name" : "Wednesday"
			},
			{
				"name" : "Thursday"
			},
			{
				"name" : "Friday"
			}
		],
		"columns" : 0,
		"creditSum" : 0
	}
	// Each array gets a starting new Day Column which is empty
	timetable.weekdays.forEach(function(weekday) {
		weekday.dayColumns = new Array();
		weekday.dayColumns.push(createNewDayColumn());
	})
	
	
	// do the fucking iteration to the subjects

	var creditSum = 0
	subjects.forEach(function(subject) {
		if (subject.taken) {
			if (Number(subject.sp) !== -1)
				creditSum += Number(subject.sp)
			if (subject.sp !== -1)
			subject.lectures.forEach(function(lecture) {
				var weekdayOfLecture = timetable.weekdays[getDay(lecture.day) - 1]
				var dayColumns = weekdayOfLecture.dayColumns
				var alreadyInserted = false
								
				// Try to insert in already defined column
				dayColumns.forEach(function(dayColumn) {
					if (!alreadyInserted) {
						alreadyInserted = insertIn(dayColumn, lecture, subject)
					}
				});
				
				// create new day column and insert it
				if (!alreadyInserted) {
					dayColumns.push(createNewDayColumn())
					insertIn(dayColumns[dayColumns.length - 1], lecture, subject)
				}
				
			});
		}

		timetable.creditSum = creditSum
	});
	
	// Calculate the count of columns
	timetable.weekdays.forEach(function(value) {
		timetable.columns += value.dayColumns.length
	})
	console.log(timetable)
	// return the timeblel
	return timetable
}

// Insert lecture, if it fits then it returns true otherwise false
function insertIn(dayColumn, lecture, subject) {
	
	if(dayColumn[""+lecture.startTime] == null && dayColumn[""+(lecture.startTime+1)] == null) {
		dayColumn[""+lecture.startTime] = {
			"subject" : subject,
			"lecture" : lecture
		}
		for (var i=1; i < lecture.duration; i++) {
			dayColumn[""+(lecture.startTime+i)] = "notNull"
		}
		return true
	}
	
	return false
}

function createNewDayColumn() {
	var object = new Array();
	return object
}
