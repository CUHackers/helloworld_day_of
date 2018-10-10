/*
* @Author: Charlie Gallentine
* @Date:   2018-10-08 11:50:43
* @Last Modified by:   Charlie Gallentine
* @Last Modified time: 2018-10-10 14:34:09
*/

// var startTime = (new Date(year, month, day, eventStartTime, eventStartMinutes)).getTime();
// var endTime = (new Date(year, month, day, eventEndTime)).getTime();

const schedule = [
  {
    event: "Breakfast",
    start: new Date(2018, month, day, 7, 30),
    end: new Date(2018, month, day, 9, 30),
  },
  {
    event: "Idea Jam",
    start: new Date(2018, month, day, 7, 30),
    end: new Date(2018, month, day, 9, 30),
  },
  {
    event: "Opening",
    start: new Date(2018, month, day, 14, 30),
    end: new Date(2018, month, day, 18),
  },
  {
    event: "Lunch",
    start: new Date(2018, month, day, 19),
    end: new Date(2018, month, day, 21, 30),
  },
  {
    event: "Bathroom Break",
    start: new Date(2018, month, day, 18),
    end: new Date(2018, month, day, 22, 30),
  },
  {
    event: "Bedtime",
    start: new Date(2018, month, day, 21),
    end: new Date(2018, month, day, 23),
  },
];


// Object containing boolean key:value pairs concerning event progress
var progress = {
    before: function () {
      return currentTime() < startTime;
    },
    during: function () {
      return startTime <= currentTime() && currentTime() < endTime;
    },
    after: function () {
      return endTime <= currentTime();
    }
};

function set_memo()
{
  const memo = document.getElementById("memo");
	if (progress.before())
	{
		memo.innerHTML = "<h1><strong>HelloWorld is loading...</strong></h1>";
	}
	else if (progress.during())
	{
		memo.innerHTML = "<h1><strong>Countdown to demos</strong></h1>";
	}
	else
	{
		memo.innerHTML = "<h1><strong>You done good kid.</strong></h1>";
	}
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function set_events()
{
  const events = document.getElementById("events");
  events.innerHTML = "";
  var html_string = "";

  if (progress.before())
  {
    html_string = 
      '<div class="col-xs-2"></div> \
      <div class="col-xs-8">  \
        <img  \
          src="./resources/HelloWorld_color_logo.svg" \
          alt="HelloWorld"/>  \
      </div>';
  }
  else if (progress.during())
  {
    for (var i = 0; i < schedule.length; i++)
    {
      if (
        currentTime() >= schedule[i].start 
        && currentTime() <= schedule[i].end)
      {
        html_string += 
        `<div class="row align-items-center"> \
          <div class="col-xs-2"></div> \
          <div class="col-xs-8 event"> \
            <h1 class="event_title"><strong>${schedule[i].event}</strong></h1> \
            <h4>${schedule[i].start.getHours()%12+":"+addZero(schedule[i].start.getMinutes())}-${schedule[i].end.getHours()%12+":"+addZero(schedule[i].end.getMinutes())}</h4> \
          </div> \
        </div>`;
      }
    }
  }
  else
  {
    html_string = "";
  }

  document.getElementById("events").innerHTML = html_string;
}

function set_upcoming()
{
  const upcoming = document.getElementById("upcoming");
  upcoming.innerHTML = "";
  var html_string = "";

  if (progress.during())
  {
    for (var i = 0; i < schedule.length; i++)
    {
      if (
        (schedule[i].start - currentTime()) / 3600000 < 3600000
        && schedule[i].start - currentTime() > 0) 
      {
        html_string += 
        `<div class="row align-items-center"> \
          <div class="col-xs-2"></div> \
          <div class="col-xs-8 upcoming_event"> \
            <h1 class="event_title"><strong>${schedule[i].event}</strong></h1> \
            <h4>${schedule[i].start.getHours()%12+":"+addZero(schedule[i].start.getMinutes())}-${schedule[i].end.getHours()%12+":"+addZero(schedule[i].end.getMinutes())}</h4> \
          </div> \
        </div>`;
      }
    }
  }
  else
  {
    html_string = "";
  }

  document.getElementById("upcoming").innerHTML = html_string;
}


var before, during, after;
function main() {
	set_memo();
  set_events();
  set_upcoming();
  columns = get_columns();
  space = get_space();
  digit = get_digit();

  

  if (progress.after()) {
  	ctx.clearRect(-10, -10, width + 10, height + 10);
  	staticDrawEnd();
  } else {
  	if (updateGrid()) {
  	    ctx.clearRect(-10, -10, width + 10, height + 10);
  	    drawNumbers();
  	}
    // drawGrid();
  	setTimeout(function() { main(); }, 300);
  }
  if (startTime - currentTime() > -1000 && startTime - currentTime() < 0)
  {
    window.location.reload(false);
  }

  if (endTime - currentTime() > -1000 && endTime - currentTime() < 0)
  {
    window.location.reload(false);
  }
}

/*
  Runs above code
 */
main();




