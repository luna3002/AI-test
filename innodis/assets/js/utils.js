/**
 * summerNote 셋팅정보
 */
var summNoteOp = {
	height: 300,
	toolbar: [
		// [groupName, [list of button]]
		['style', ['bold', 'italic', 'underline', 'clear']],
		['font', ['strikethrough', 'superscript', 'subscript']],
		['fontsize', ['fontsize']],
		['color', ['color']],
		['para', ['ul', 'ol', 'paragraph']],
		['height', ['height']],
		['table', ['table']],
		['insert', ['link', /*'picture', */'video']],
		['view', ['fullscreen', 'codeview', 'undo', 'redo']]
	]/*
	callbacks: {
		onBlurCodeview: function(contents, $editable) {
			$(this).html(contents);
		}
	}*/
};

/**
 * 배열의 모든 정보 조회
 */
var print_r = function(tar){ 
    var str = ''; 
    for (var p in tar) { 
        var tmp = tar[p]; 
        if (tmp != null && tmp.toString != null && tmp.toString() != ''){ 
            if (str != '') str += ", "; 
            str += p.toString() + " = " + tmp.toString(); 
        } 
    } 
    return str; 
};

/**
 * 쿠키 정보 저장
 */
function SetCookie(name, value) {
	var argv = SetCookie.arguments;
	var argc = SetCookie.arguments.length;
	var expires = (2 < argc) ? argv[2] : new Date(getDatePlus(365));	// 365일 동안 쿠키 저장
	var path = (3 < argc) ? argv[3] : null;
	var domain = (4 < argc) ? argv[4] : null;
	var secure = (5 < argc) ? argv[5] : false;
	document.cookie = name + "=" + escape (value) +
		((expires == null) ? "" :
		("; expires=" + expires.toUTCString())) +
		((path == null) ? "" : ("; path=" + path)) +
		((domain == null) ? "" : ("; domain=" + domain)) +
		((secure == true) ? "; secure" : "");
}

/**
 * 쿠키 정보 조회
 */
function getCookie(name) {
	var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return value? value[2] : null;
};

/**
 * 문자열의 특수문자로 치환
 * @param {Object} str
 * @param {Object} s1
 * @param {Object} s2
 */
function replaceAll(str, s1, s2) {
	return str.split(s1).join(s2);
}

/**
 * 엔티티코드를 일반 태그로 변경
 */
function unhtmlspecialchars(str) {
	str = replaceAll(str, '&amp;', '&');
	str = replaceAll(str, '&#039;', '\'');
	str = replaceAll(str, '&quot;', '\"');
	str = replaceAll(str, '&lt;', '<');
	str = replaceAll(str, '&gt;', '>');
	str = replaceAll(str, '&middot;', 'ㆍ');

	return str;
}

/**
 * INPUT 유효성 검사
 */
function isEmpty(input) {
	var checkType = false;
	var result = false;

	if(input.length) {
		if(input.length > 0) {
			if(input[0].type == "checkbox" || input[0].type == "radio") {
				checkType = true;
			}
		}
	}

	if(checkType) {
		for(var i=0; i<input.length; i++) {
			if(!input[i].checked) {
				result = true;
			} else {
				result = false;
				break;
			}
		}
	} else {
		if (input.value == null || input.value.replace(/ /gi,"") == "") {
			result = true;
		}
	}

	return result;
}

/**
 * 전체 선택 체크 박스 선택시 리스트 체크박스 전체 채크
 */
function toggleCheck(obj) {
	
	if($('.chkKey') == undefined) {

	} else {
		$('.chkKey').each(function(idx, item) {
			$(this).prop('checked', obj.checked);
		});
	}
}

/**
 * 정렬 정보 초기화
 */
function orderByReset(orderBy) {
	if($('#data-table tbody td.dataTables_empty').length == 0) {
		// 순서 정보 초기화
		var orderArr = orderBy.split(" ");
		
		var sort = (orderArr[1] == "desc")? "asc" : "desc";
		$("#data-table").find("th").each(function(idx, item) {
			if($(this).attr("id") == orderArr[0]) {
				$(this).attr("onclick", "changeOrder(this, '" + sort + "');");
				$(this).attr("class", "sorting_" + orderArr[1]);
			} else if($(this).attr("id") == undefined) {
				
			} else {
				$(this).attr("onclick", "changeOrder(this, 'asc');");
				$(this).attr("class", "sorting");
			}
		});
	}
}

/**
 * 정보 리스트 정렬 변경
 */
function changeOrder(obj, v) {
	var f = document.forms['frm'];
	
	f.orderBy.value = $(obj).attr("id") + " " + v;
	f.pageIndex.value = "1";
	f.method = "get";
	f.submit();
}

if($('#data-table').prop("tagName") != undefined && $('#data-table tbody td.dataTables_empty').length == 0) {
	$('#data-table').DataTable({
		paging: false,
		searching: false,
		ordering: false,
		language: {
			infoEmpty: ""
		}
	});
}

if($('.exit_datepicker').prop("tagName") != undefined) {
	$(".exit_datepicker").datepicker({
		changeMonth: true, // 월을 바꿀수 있는 셀렉트 박스를 표시한다.
		changeYear: true, // 년을 바꿀 수 있는 셀렉트 박스를 표시한다.
		currentText: '오늘 날짜' , // 오늘 날짜로 이동하는 버튼 패널
		closeText: '닫기',  // 닫기 버튼 패널
		dateFormat: "yy-mm-dd", // 텍스트 필드에 입력되는 날짜 형식.
		showMonthAfterYear: true , // 월, 년순의 셀렉트 박스를 년,월 순으로 바꿔준다.
		dayNamesMin: ['월', '화', '수', '목', '금', '토', '일'], // 요일의 한글 형식.
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] // 월의 한글 형식.
	});
}

/**
 * 파일 체크
 * 수정 2021.05.27 jmw
 */
function chkFile(obj, type, f, flag, size) {
	if($(obj).val() == "") {
		return false;
	}
	
	var ext = obj.value.split(".").pop().toLowerCase();
	var imgArray = '*';

	if(type == 'img') {
		imgArray = new Array("jpg", "jpeg", "gif", "png");
	} else if(type == 'ico') {
		imgArray = new Array("ico");
	} else if(type == 'bizr') {
		// 사업자등록증
		imgArray = new Array("jpg", "jpeg", "gif", "png", "pdf");
	} else if(type != 'file') {
		imgArray = new Array(type);
	}
	
	// 엑셀 파일이 아닐시 리턴
	if(imgArray != "*") {
		if(imgArray.length >= 1 && !array_search(ext, imgArray)) {
			alert(imgArray.toString() + " 파일만 업로드 가능 합니다.");
			$(obj).val("");
			return false;
		} 
	}
	
	if(size == '' || size == null) {
		size = 10;
	}
	
	if(this.chkFileSize(obj, f, size) && flag) {
		__setFileData(f);
	}
}

/**
 * 파일 확장자 체크
 * 수정 2021.05.27 jmw
 */
function array_search(str, arr){
	var rst = true;
    for( var key in arr ){
        if( arr[key] == str ){
        	return true;
        }
        rst = false;
    }
    return rst;
}

/**
 * 파일 용량 체크
 */
function chkFileSize(obj, f, size) {
	var maxSize  = size * 1048576;
	var fileSize = 0;
	
	// 브라우저 확인
	var browser = navigator.appName;
	
	// 익스플로러 체크
	if(browser == "Microsoft Internet Explorer") {
		var oas = new ActiveXObject("Scripting.FileSystemObject");
		
		fileSize += oas.getFile(obj.value).size;
	} else {
		if(obj.files.length > 0) {
			for(var i=0; i<obj.files.length; i++) {
				fileSize += obj.files[i].size;
			}
		}
	}
	
	if(fileSize > maxSize) {
		alert('첨부된 파일이 업로드 가능 용량을 초과 하였습니다. (제한 : ' + size + ' MB)');
		f.reset();
		return false;
	}
	
	return true;
}

// 모바일 기기 체크
function isMobile() {
	var returnAt = false;
	
	var filter = "win16|win32|win64|macintel|mac|"; // PC일 경우 가능한 값
	if(navigator.platform) {
		if(filter.indexOf(navigator.platform.toLowerCase()) < 0) {
			returnAt = true;
		}
	}
	
	return returnAt;
}

// 아이디 정규식 유효성 검사
function idCheck(v) {
	var regularID = /^[a-zA-Z]+[_a-zA-Z0-9]{1,20}$/;
	return regularID.test(v);
}

/** 
 * 특정 엘리먼트 ID의 셀렉트 박스에 정보 추가
 * objNm : 엘리먼트 ID
 * key : 옵션의 Key 값
 * name : 옵션의 Value 값
 * selected : 동일값 체크 true/false
 */
function addSelect(objNm, cd, cdNm, selected) {
	var addOpt = document.createElement('option');
	
	addOpt.value    = cd;
	addOpt.selected = selected;
	addOpt.appendChild(document.createTextNode(cdNm));
	$(objNm).append(addOpt);
}

/**
 * 특정 엘리먼트 ID의 셀렉트 박스를 초기화
 */
function delSelect(objNm) {
	$(objNm).find("option").each(function(){
		$(this).remove();
	});
	$(objNm).find("optgroup").each(function(){
		$(this).remove();
	});
}

/**
 * 각종 화면 활성/비활성 설정
 */
function changeDisplay(cls, bln) {
	$("." + cls).hide();

	if(bln)
		$("." + cls).show();
}

/**
 * 셀렉트 박스 정보 이동
 */
function changeSelectedOp(afterId, beforeId) {
	$("#" + afterId + " option:selected").remove().appendTo("#" + beforeId);
}

/**
 * 버전 체크 정규식
 */
function versionCheck(obj){
	var re = /^(?:(?:[0-9]?[0-9][0-9]?)\.){2}(?:[0-9]?[0-9][0-9]?)$/;
	
	return re.test(obj.value);
}

/**
 * 날짜 형식 변수 숫자만 추출
 */
function getDateReplaceText(str) {
	str = replaceAll(str, "-", "");
	str = replaceAll(str, ":", "");
	str = replaceAll(str, " ", "");
	return str;
}

(function($){
	/*
	 *
	 * 같은 값이 있는 열을 병합함
	 *
	 * 사용법 : $('#테이블 ID').rowspan(0);
	 *
	 */
	$.fn.rowspan = function(colIdx, isStats) {
		return this.each(function(){
			var that;
			$('tr', this).each(function(row) {
				$('td:eq('+colIdx+')', this).filter(':visible').each(function(col) {
					if ($(this).html() == $(that).html()&& ((!isStats || isStats && $(this).prev().html() == $(that).prev().html())
						&& $(this).html() !="소계" )) { // 값이 '소계' 이면 rowspan 안함.
						rowspan = $(that).attr("rowspan") || 1;
						rowspan = Number(rowspan)+1;
	
						$(that).attr("rowspan",rowspan);
						// do your action for the colspan cell here
						$(this).hide();
						//$(this).remove();
						// do your action for the old cell here
					} else {
						that = this;
					}
					
					//$('#roleTb').colspan(row); // row 돌때 마다 colspan
					
					// set the that if not already set
					that = (that == null) ? this : that;
					
				});
			});
		});
	};
	
	/*
	 *
	 * 같은 값이 있는 행을 병합함
	 *
	 * 사용법 : $('#테이블 ID').colspan (0);
	 *
	 */ 
	$.fn.colspan = function(rowIdx) {

		return this.each(function(){

			var that;
			$('tr', this).filter(":eq("+rowIdx+")").each(function(row) {
				$(this).find('td').filter(':visible').each(function(col) {
					if ($(this).html() == $(that).html()) {
						colspan = $(that).attr("colSpan") || 1;
						colspan = Number(colspan)+1;
	
						$(that).attr("colSpan",colspan);
						$(this).hide(); // .remove();
					} else {
						that = this;
					}
					
					// set the that if not already set
					that = (that == null) ? this : that;
					
				});
			});
		});
	};
})(jQuery);

//한글 지우기
function delHangle(evt) {
	var objTarget = evt.srcElement || evt.target;
	var _value = event.srcElement.value;
	if(/[ㄱ-ㅎㅏ-ㅡ가-힣]/g.test(_value)) {
		objTarget.value = null;
	}
}

//숫자와 소수점입력
function isNumberKey(evt, num) {
	
	var charCode = (evt.which) ? evt.which : event.keyCode;
	// Textbox value
	var _value = event.srcElement.value;
	
	if(event.keyCode < 48 || event.keyCode > 57) {
		if(event.keyCode != 46) {
			return false;
		}
	}
	
	//소수점(.) 두번 이상 나오지 못하게
	var _pattern0 = /^\d*[.]\d*$/;	// 현재 value값에 소수점(.)이 있으면 .입력불가
	if (_pattern0.test(_value)){
		if(charCode == 46) {
			return false;
		}
	}

	// 세자리 이하의 숫자만 입력가능
	var _pattern1 = new RegExp('^\\d{'+num+'}$');
	//var _pattern1 = ;	// 현재 value값이 3자리 숫자이면 .만 입력가능
	// {숫자}의 값을 변경하면 자리수를 조정할 수 있다.
	if (_pattern1.test(_value)) {
		if(charCode != 46){
			alert(num+"자리 이하의 숫자만 입력가능합니다.");
			return false;
		}
	}
	
	// 소수점 둘째자리까지만 입력가능
	var _pattern2 = /^\d*[.]\d{2}$/;		// 현재 value값이 소수점 둘째자리 숫자이면 더이상 입력불가
	// {숫자}의 값을 변경하면 자리수를 조정할 수 있다.
	if (_pattern2.test(_value)) {
		alert("소수점 둘째자리까지만 입력가능합니다.");
		return false;
	}
	
	return true;
}

//숫자 자리수
function isNumberLen(evt, num) {
	var charCode = (evt.which) ? evt.which : event.keyCode;
	// Textbox value
	var _value = event.srcElement.value;
	
	if(event.keyCode < 48 || event.keyCode > 57) {
		return false;
	}
	// 세자리 이하의 숫자만 입력가능
	var _pattern1 = new RegExp('^\\d{'+num+'}$');
	// {숫자}의 값을 변경하면 자리수를 조정할 수 있다.
	if (_pattern1.test(_value)) {
		alert(num+"자리 이하의 숫자만 입력가능합니다.");
		return false;
	}
}



//글자수 제한
function TextCount(obj, num) {
	var strValue = obj.value;
	var strLen = strValue.length+1;
	if(strLen > num) {
		alert("제한글자를 초과하였습니다.");
		$(obj).val(strValue.substring(0, num-2));
	}
}

//날짜 유효성 체크 (윤달 포함)
function _fnisDate(vDate) {
	var vValue = vDate;
	var vValue_Num = vValue.replace(/[^0-9]/g, ""); //숫자를 제외한 나머지는 예외처리 합니다.
	
    //_fnToNull 함수는 아래 따로 적어두겠습니다. 
	if (_fnToNull(vValue_Num) == "") {
		alert("날짜를 입력 해 주세요.");
		return false;
	}

	//8자리가 아닌 경우 false
	if (vValue_Num.length != 8) {
		alert("날짜를 20200101 or 2020-01-01 형식으로 입력 해 주세요.");
		return false;
	}
	
    //8자리의 yyyymmdd를 원본 , 4자리 , 2자리 , 2자리로 변경해 주기 위한 패턴생성을 합니다.
	var rxDatePattern = /^(\d{4})(\d{1,2})(\d{1,2})$/; 
	var dtArray = vValue_Num.match(rxDatePattern); 

	if (dtArray == null) {
		return false;
	}

	//0번째는 원본 , 1번째는 yyyy(년) , 2번재는 mm(월) , 3번재는 dd(일) 입니다.
	dtYear = dtArray[1];
	dtMonth = dtArray[2];
	dtDay = dtArray[3];

	//yyyymmdd 체크
	if (dtMonth < 1 || dtMonth > 12) {
		alert("존재하지 않은 월을 입력하셨습니다. 다시 한번 확인 해주세요");
		return false;
	}
	else if (dtDay < 1 || dtDay > 31) {
		alert("존재하지 않은 일을 입력하셨습니다. 다시 한번 확인 해주세요");
		return false;
	}
	else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31) {
		alert("존재하지 않은 일을 입력하셨습니다. 다시 한번 확인 해주세요");
		return false;
	}
	else if (dtMonth == 2) {
		var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
		if (dtDay > 29 || (dtDay == 29 && !isleap)) {
			alert("존재하지 않은 일을 입력하셨습니다. 다시 한번 확인 해주세요");
			return false;
		}
	}

	return true;
}

//Null 값 "" 
function _fnToNull(data) { 
	// undifined나 null을 null string으로 변환하는 함수. 
	if (String(data) == 'undefined' || String(data) == 'null') { 
		return '' 
	} else { 
			return data 
	}
}

//콤마제거
function delComma(num){
	return num.replace(/,/g, "");
}

// 사업자번호 체크
function ckBisNo(bisNo) {
	var bisNo = bisNo.replace(/-/gi, "");
	// 넘어온 값의 정수만 추츨하여 문자열의 배열로 만들고 10자리 숫자인지 확인합니다.
	if ((bisNo = (bisNo+'').match(/\d{1}/g)).length != 10) { 
		return false; 
	}
	
	// 합 / 체크키
	var sum = 0, key = [1, 3, 7, 1, 3, 7, 1, 3, 5];
	
	// 0 ~ 8 까지 9개의 숫자를 체크키와 곱하여 합에더합니다.
	for (var i = 0 ; i < 9 ; i++) { 
		sum += (key[i] * Number(bisNo[i])); 
	}
	
	// 각 8번배열의 값을 곱한 후 10으로 나누고 내림하여 기존 합에 더합니다.
	// 다시 10의 나머지를 구한후 그 값을 10에서 빼면 이것이 검증번호 이며 기존 검증번호와 비교하면됩니다.
	return (10 - ((sum + Math.floor(key[8] * Number(bisNo[8]) / 10)) % 10)) == Number(bisNo[9]);
}

// 주민번호 검사
function check_fgnno(fgnno) {
	var fgnno = fgnno.replace(/-/gi, "");
	var sum=0; 
	var odd=0; 
	buf = new Array(13); 
	
	for(i=0; i<13; i++) { 
		buf[i]=parseInt(fgnno.charAt(i)); 
	} 
	odd = buf[7]*10 + buf[8]; 
	
	if(odd%2 != 0) { 
		return false; 
	} 
	
	if( (buf[11]!=6) && (buf[11]!=7) && (buf[11]!=8) && (buf[11]!=9) ) { 
		return false; 
	} 
	multipliers = [2,3,4,5,6,7,8,9,2,3,4,5]; 

	for(i=0, sum=0; i<12; i++) {
		sum += (buf[i] *= multipliers[i]); 
	} 
	sum = 11 - (sum%11); 
        
	if(sum >= 10) { 
		sum -= 10; 
	}
	sum += 2; 

	if(sum >= 10) {
		sum -= 10;
	} 
        
	if(sum != buf[12]) {
		return false
	} 

	return true; 
} 