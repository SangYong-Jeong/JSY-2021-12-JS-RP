/************* Global init ***************/
var $slide;
var idx = 0, last, prev, next;

/************* user function *************/
function init () {
	$slide = $('.slide-wrap .slide').slice(); // deepcopy
	last = $slide.length - 1; // 5
	slideInit();
}

function slideInit() {
	$('.slide-wrap').css('left', '-100%').empty();
	prev = (idx === 0) ? last : idx - 1;
	next = (idx === last) ? 0 : idx + 1;
		$($slide[idx]).clone().appendTo('.slide-wrap'); // 그냥 배열처럼 값을 부르면 자바스크립트 객체가 된다 $slide가 jQuery 객체이기 때문이다. (그냥 배열 아님)
		$($slide[prev]).clone().prependTo('.slide-wrap');
		$($slide[next]).clone().appendTo('.slide-wrap');
}

/************* event callback ************/
function onPrev () {
	$('.slide-wrap').stop().animate({"left": 0}, 500, function() {
		idx = (idx === 0) ? last : idx - 1;
		slideInit();
	});
}

function onNext () {
	$('.slide-wrap').stop().animate({"left": '-200%'}, 500, function () {
		idx = (idx === last) ? 0 : idx + 1;
		slideInit();
	});
}

/************* event init ****************/
$('.bt-prev').click(onPrev);
$('.bt-next').click(onNext);

/************* start init ****************/
init();
