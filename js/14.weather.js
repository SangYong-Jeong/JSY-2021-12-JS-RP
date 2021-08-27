// 7f65332e6d33816b773f35daec5e2d44
// https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=7f65332e6d33816b773f35daec5e2d44&units=metric
// https://openweathermap.org/img/wn/10d@2x.png

// ? 문제 1. ../json/city.list.json의 모든 데이터를 cityList:Array에 담으시오.
// ? .ajax, axios, XMLHttpRequest 셋 중에 하나를 선택하시오.
// ? 문제 2. 가져온 데이터에서 한국의 정보만을 korCity:Array에 담으시오.
// ? 문제 3. korCity에서 {도시이름 name, 위도 lat, 경도 lon, 아이디 id} 객체를 city:Array에 담으시오. 
/* 
var cityList = [];
// axios
axios.get('../json/city.list.json').then(onResult);

function onResult(v) {
	for(var i = 0; i < v.data.length; i++) {
		cityList.push(v.data[i]);
	}
	var korCity;
	korCity = cityList.filter(function(v) {
		return v.country === "KR";
	});
	console.log(korCity)
	var city = korCity.map(function(v) {
		v.city = {name: v.name, lat: v.coord.lat , lon: v.coord.lon, id: v.id}
		return v.city
	}) 
	console.log(city);
}
 */

navigator.geolocation.getCurrentPosition(onCoordSuccess, onCoordError);

function onCoordSuccess(r) {
	let {latitude: lat, longitude: lon} = r.coords;
	console.log(lat, lon)
}

function onCoordError(err) {
	// 1835848
	console.log(err);
}

// navigator.clipboard.writeText("<Hello World>").then(() => {
// 	console.log('카피되었습니다.');
// })

/************* Global init ***************/
const appid = '7f65332e6d33816b773f35daec5e2d44';
const url = 'https://api.openweathermap.org/data/2.5/weather';
const icons =  ['https://openweathermap.org/img/wn/', '@2x.png'];
const param = {units: 'metric', appid};



/************* user function *************/
function init() {
	navigator.geolocation.getCurrentPosition(onCoordSuccess, onCoordError);

	function onCoordSuccess(r) {
	let {latitude: lat, longitude: lon} = r.coords;
	axios.get(url, {params: {...param, lat, lon} }).then(onGetWeather).catch(onError);
	}

	function onCoordError(err) {
		axios.get(url, {params: {...param, id: '1835848'} }).then(onGetWeather).catch(onError);
	}
}

/************* event callback ************/
function onGetWeather(r) {
	console.log(r);
	let {main, name, weather} = r.data;
	let {temp} = main;
	// let [{main: title, description, icon}] = weather; // 이렇게도 구조분해 할당을 할 수 있다. check
	let {main: title, description, icon} = weather[0];
	const $wrap = $('.weather-wrap');
	$wrap.find('.city span').text(name);
	let html = `<img src="${icons[0]+icon+icons[1]}" alt="${icon}" class="w100">`;
	$wrap.find('.img-wp').html(html);
	//$wrap.find('.img-wp img').attr('src', icons[0]+icon+icons[1]);
	$wrap.find('.temp-wp span').text(temp);
	$wrap.find('.desc-wp .main').text(title);
	$wrap.find('.desc-wp .description').text(description);
}

function onError(err) {
	console.log(err);
}

/************* event init ****************/


/************* start init ****************/
init();

