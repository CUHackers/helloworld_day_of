/*
* @Author: Charlie Gallentine
* @Date:   2018-10-08 11:50:43
* @Last Modified by:   Charlie Gallentine
* @Last Modified time: 2018-10-08 12:02:02
*/
var startTime = (new Date(2018, 9, 13, 8)).getTime();
var endTime = (new Date(2018, 9, 13, 20)).getTime();

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

const memo = document.getElementById("memo");

function set_memo()
{
	if (progress.before())
	{
		memo.innerHTML = "<h1>HelloWorld is loading...</h1>";
	}
	else if (progress.during())
	{
		memo.innerHTML = "<h1>It's Hacker Time!</h1>";
	}
	else
	{
		memo.innerHTML = "";
	}
}


function main() {
	set_memo();
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




