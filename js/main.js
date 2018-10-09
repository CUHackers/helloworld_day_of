/*
* @Author: Charlie Gallentine
* @Date:   2018-10-08 11:50:43
* @Last Modified by:   Charlie Gallentine
* @Last Modified time: 2018-10-09 19:03:30
*/

var startTime = (new Date(2018, month, day, 8)).getTime();
var endTime = (new Date(2018, month, day, 20)).getTime();

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
    start: new Date(2018, month, day, 10),
    end: new Date(2018, month, day, 15, 30),
  },
  {
    event: "Bathroom Break",
    start: new Date(2018, month, day, 18),
    end: new Date(2018, month, day, 19),
  },
  {
    event: "Bedtime",
    start: new Date(2018, month, day, 19),
    end: new Date(2018, month, day, 23),
  },
];

/*
  Gets the number of milliseconds since 1/1/1970

  Return: integer, milliseconds since the epoch
 */
function currentTime() {
    return (new Date()).getTime();
}

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
		memo.innerHTML = "<h1>HelloWorld is loading...</h1>";
	}
	else if (progress.during())
	{
		memo.innerHTML = "<h1>Countdown to demos</h1>";
	}
	else
	{
		memo.innerHTML = "";
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
        new Date().getTime() >= schedule[i].start 
        && new Date().getTime() <= schedule[i].end)
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
  console.log(events.innerHtml);
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
        (schedule[i].start - new Date().getTime()) / 3600000 < 3600000
        && schedule[i].start - new Date().getTime() > 0) 
      {
        html_string += 
        `<div class="row align-items-center"> \
          <div class="col-xs-2"></div> \
          <div class="col-xs-8 upcoming_event"> \
            <h3 class="event_title"><strong>${schedule[i].event}</strong></h3> \
            <h5>${schedule[i].start.getHours()%12+":"+addZero(schedule[i].start.getMinutes())}-${schedule[i].end.getHours()%12+":"+addZero(schedule[i].end.getMinutes())}</h5> \
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
  console.log(upcoming.innerHtml);
}



function main() {
	set_memo();
  set_events();
  set_upcoming();
  if (progress.after()) {
  	ctx.clearRect(-10, -10, width + 10, height + 10);
  	staticDrawEnd();
  } else {
  	if (updateGrid()) {
  	    ctx.clearRect(-10, -10, width + 10, height + 10);
  	    drawNumbers();
  	}
  	setTimeout(function() { main(); }, 300);
  }
}

/*
  Runs above code
 */
main();




