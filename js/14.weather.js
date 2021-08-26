// 7f65332e6d33816b773f35daec5e2d44
// https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=7f65332e6d33816b773f35daec5e2d44&units=metric

// ? 문제 1. ../json/city.list.json의 모든 데이터를 cityList:Array에 담으시오.
// $.ajax, axios, XMLHttpRequest 셋 중에 하나를 선택하시오.

// ? 문제 2. 가져온 데이터에서 한국의 정보만을 korCity:Array에 담으시오.
// ? 문제 3. korCity에서 {도시이름 name, 위도 lat, 경도 lon, 아이디 id} 객체를 city:Array에 담으시오. 

var cityList = [];
// axios
axios.get('../json/city.list.json').then(onResult);

function onResult(v) {
	console.log(v);
	console.log(v.data)
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

