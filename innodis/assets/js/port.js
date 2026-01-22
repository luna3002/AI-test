// More 버튼으로 3개씩 로드
var $portlist = $('.portlist');
var $allItems = $portlist.find('li');
var itemsPerLoad = 6; // 한 번에 로딩할 아이템 수 (6개 = 2줄)
var initialItems = 9; // 처음 보여줄 아이템 수
var currentIndex = 0;

// 초기화: 모든 아이템 숨기기
$allItems.hide();

// 처음 9개 아이템 보여주기
function showInitialItems() {
    $allItems.slice(0, initialItems).show();
    currentIndex = initialItems;
    
    // More 버튼 보이기 (남은 아이템이 있을 때만)
    if (currentIndex < $allItems.length) {
        $('#btnAddList').removeClass('hidden');
    } else {
        $('#btnAddList').hide();
    }
}

// 다음 3개 아이템 로드
function loadMoreItems() {
    if (currentIndex >= $allItems.length) return;
    
    // 다음 3개 아이템 보여주기
    var nextItems = $allItems.slice(currentIndex, currentIndex + itemsPerLoad);
    nextItems.fadeIn(400);
    
    currentIndex += itemsPerLoad;
    
    // 모든 아이템을 다 보여줬으면 More 버튼 숨기기
    if (currentIndex >= $allItems.length) {
        $('#btnAddList').fadeOut();
    }
}

// More 버튼 클릭 이벤트
$('#btnAddList').on('click', function(e) {
    e.preventDefault();
    loadMoreItems();
});

// 페이지 로드 시 초기 아이템 표시
$(document).ready(function() {
    showInitialItems();
});