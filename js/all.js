var wholeBody = document.body;
wholeBody.addEventListener('click',founding);
var title = document.querySelector('.view_title');
var content = document.querySelector('.view_holder');
var button = ["苓雅區","三民區","新興區","旗津區"];
var hotArea = document.querySelector('.looking');
var sel = document.querySelector('.districtSty');
always()

function founding(e){
// 假使SELECT或BUTTON不只有一個怎麼辦?NODENAME這方式就不行了
	if (e.target.nodeName == 'SELECT') {
		sel.addEventListener('change',printer(e));
	}else if (e.target.nodeName =='BUTTON') {
		hotArea.addEventListener('click',printer(e));
	}
}

xx();
function xx(e){
	if (sel.options[0].value == 'origin') {
			title.innerHTML = "請選擇行政區";
		}
}


function always(){
	var str = '';
	for (var i = 0; i < button.length; i++) {
		str += '<button value="'+button[i]+'">'+button[i]+'</button>'
	}
	hotArea.innerHTML = str;
}

function printer(e){
	var Tstr = "";
	var str = "";
	for (var i = 0; i < data.length; i++) {
		if(e.target.value == data[i].Zone){
			console.log(data[i].Zone);
			Tstr = data[i].Zone;
			str += 
			'<div class="view_box">'+
				'<div class="view_head">'+
					'<img src="'+data[i].Picture1+'">'+
					'<span>'+data[i].Name+'</span>'+
					'<span>'+data[i].Zone+'</span>'+
				'</div>'+
				'<div class="view_detail">'+
				'<p><span><img src="assets/icons_clock.png" alt></span>'+data[i].Opentime+'</p>'+
				'<p><span><img src="assets/icons_pin.png" alt></span>'+data[i].Add+'</p>'+
				'<p><span><img src="assets/icons_phone.png" alt></span>'+data[i].Tel+'</p>'+
				'<p><span><img src="assets/icons_tag.png" alt></span>免費參觀</p>'+
				'</div>'+
			'</div>';
		}
	}
	title.innerHTML = Tstr;
	content.innerHTML = str;
}
// var searching = document.querySelector('body');
// searching.addEventListener('click',look);
// function look(e){
// 	console.log(e.target.value);
// }