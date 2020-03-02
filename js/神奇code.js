//更新需要的旅遊資料    
var upData = []
for (var i = 0; i < data[0].result.records.length; i++) {
    upData.push(data[0].result.records[i])
    //測試console.log(upData[0].Zone) "三民區" 
}




//選取option和button和content
var listDown = document.getElementById('listDown');
var hotspaceBtn = document.querySelector('.hotspaceBtn');
var content = document.querySelector('.content');



//手動增加選單Zone區域
function addSelect() {
    var zones = [];
    var str = '<option value="請選擇行政區" >- - 請選擇行政區 - -</option>';
    //array.forEach() 方法會將陣列內的每個元素，皆傳入並執行給定的函式一次。
    //forEach()、indexOf() - 過濾重複篩選區域
    //forEach()判斷陣列裡面所有值是否有吻合

    //舉例  //var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
    //0         1        2       3  總共4筆資料
    //console.log(beasts.indexOf('bison', 2));
    // expected output: 4

    upData.forEach(function (item) {
        //自己思考是因為upData[]中並沒有item.Zone這筆資料所以回傳失敗-1執行下面的code
        //indexOf(iitem.Zone)，item：要在陣列中搜尋的項目。 Zone：起始搜尋索引，由此索引位置開始向後搜尋。
        //傳回值：匹配成功則傳回該元素所在位置的索引，失敗則傳回-1。
        if (zones.indexOf(item.Zone) == -1) {           /*一開始zones內是空陣列，沒有任何一筆資料 */
            zones.push(item.Zone);
        }
    });
    for (var j = 0; j < zones.length; j++) {
        str += '<option value="' + zones[j] + '">' + zones[j] + '</option>';
    }
    listDown.innerHTML = str;
}
addSelect();


//渲染到html網頁內容
function updateList(Items) {
    var str2 = '';
    for (var k = 0; k < upData.length; k++) {
        if (Items == upData[k].Zone) {
            if (upData[k].Ticketinfo == '') {  /*不是免費的*/
                str2 += '<div data-num="' + k + '" class="frameBox"><div class="imgBox"><div class="imgPic" style="background-image:url('
                    + upData[k].Picture1 + ')"></div><div class="imgpic_Text"><h3>' + upData[k].Name + '</h3><h5>'
                    + upData[k].Zone + '</h5></div></div><ul class="icons_Space"><li class="icons _openTime">' + upData[k].Opentime
                    + '</li><li class="icons _adress">'
                    + upData[k].Add + '</li><li class="icons _tel">'
                    + upData[k].Tel + '</li></ul></div>';

            } else {
                str2 += '<div data-num="' + k + '" class="frameBox"><div class="imgBox"><div class="imgPic" style="background-image:url('
                    + upData[k].Picture1 + ')"></div><div class="imgpic_Text"><h3>' + upData[k].Name + '</h3><h5>' + upData[k].Zone +
                    '</h5></div></div><ul class="icons_Space"><li class="icons _openTime">' + upData[k].Opentime + '</li><li class="icons _adress">' + upData[k].Add +
                    '</li><li class="icons _tel">' + upData[k].Tel + '</li><li class="icons _forFree">'
                    + upData[k].Ticketinfo + '</li></ul></div>';
            }

        }

    }
    content.innerHTML = '<h2 class="zoneTitle">' + Items + '</h2><div class="wrap_allData">' + str2 + '</div>';
}

function selectDown(e) {             //change事件
    var select = e.target.value;
    if (select == '請選擇行政區') {
        alert('請選擇行政區域');
        content.innerHTML = '';
        return;

    }
    updateList(select);//重新渲染到網頁上
    list_down.innerHTML = ''
    aunmt()//計算頁數
}


//事件監聽
listDown.addEventListener('change', selectDown);

hotspaceBtn.addEventListener('click', function hotspaceBtn(e) {  //click事件
    console.log(e)//查看資訊
    var select = e.target.value;
    if (e.target.nodeName !== 'INPUT') { return };
    updateList(select); //重新渲染到網頁上
    list_down.innerHTML = ''
    aunmt()//計算頁數
});



//prev next上下一頁btn
var nextpage = document.querySelector('.nextpage');
var pageNum = document.querySelector('.pageNum');
var list_down = document.querySelector('.list_down');
var zoneTitle = document.querySelector('.zoneTitle');


// 每一個分頁要顯示的數量
var show_per_page = 4;

// 選取出 .content 這個 div 下有多少個 framebox /
var number_of_items = 0;
var number_of_pages = 0;
function aunmt() {
    number_of_items = document.querySelectorAll('.frameBox').length;
    // 用『總數量』除以『每一頁分頁要顯示的數量』= 要有多少頁
    number_of_pages = Math.ceil(number_of_items / show_per_page);
    console.log(number_of_items);
    console.log(number_of_pages);

    // 頁數顯示：算出 number_of_pages 後就可以新增下方的分頁數列
    for (var i = 1; i < number_of_pages + 1; i++) {
        var textnode = `<li class="page-item" onclick="changePage(${i - 1})"><a class="page-link" href="#">${i}</a></li>`;
        list_down.innerHTML += textnode;
    }

// 首次內容顯示
    var arr = [];
    for (var i = 0; i < number_of_items; i++) {
        // 先將 .container 中的所有內容都 display: none
        document.querySelectorAll('.frameBox')[i].style.display = 'none';
        // 將每一筆內容都依序推入 arr 這個陣列
        arr.push(document.querySelectorAll('.frameBox')[i]);
       
    }
    for(var j = 0;j < show_per_page; j++){
        arr.slice(0, show_per_page)[j].style.display = 'block';
      }
}


// 切換頁數
function changePage(page_num) {
   
    // 開始選取的陣列位置：用頁碼乘以每頁顯示數量
    var start_from = page_num * show_per_page;
    // 結束選取的陣列位置：用開始選取的陣列位置加上每頁顯示數量
    var end_on = start_from + show_per_page;
    // 先把 .container 下所有內容都 display: none
    var arr = [];
    for (var i = 0; i < number_of_items; i++) {
        var container = document.querySelectorAll('.frameBox')[i].style.display = 'none';
        arr.push(document.querySelectorAll('.frameBox')[i]);
        //console.log(container)
    }
    // 再用 slice 去切出陣列中 (開始選取的陣列位置, 結束選取的陣列位置) 這兩個位置間的資料來 display: block
    for(var k = 0;k < 5; k++){
        arr.slice(start_from, end_on)[k].style.display = 'block';
      }
}