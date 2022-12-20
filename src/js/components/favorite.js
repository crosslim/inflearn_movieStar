class Favorite{
    constructor(){
        this.favoriteElement = document.querySelector('.content-favorite');
    }
    setup(){
        this.bindEvents();
    }
    bindEvents(){
        this.favoriteElement.addEventListener('click', (event) => {
            const cPath = event.composedPath(); //클릭한 요소의 모든 경로를 배열값으로 반환
            const element = cPath.find(element => element.tagName === 'BUTTON')// 경로배열값에서 버튼태그 찾기
            if(!element){ //만약 없으면
                return;
            }
            //있으면 아래 수행
            element.classList.toggle('on');
        });
    }
}

export default Favorite;