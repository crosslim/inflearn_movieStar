//호버 상태에 따른 이미지 맵핑 오브젝트배열
const starImageSourceMap = {
    empty: './src/images/icon_star_3.png',
    half: './src/images/icon_star_2.png',
    full: './src/images/icon_star_1.png',
}
class StarPoint{
    constructor(){
        
        // 1. 적용할 요소 가져오기
        //별 갖고있는 부모요소
        this.starContentElement = document.querySelector('.content-star');
        // 위의 부모요소의 자식들중 'star-background'클래스 요소 가져오기
        this.starBackgroundElement = this.starContentElement.querySelector('.star-background');
        //그요소중 이미지요소
        this.starimages = this.starBackgroundElement.querySelectorAll('img');
        this.starPointResetButton = this.starContentElement.querySelector('.icon-remove-star');
        //별점이 클릭으로인해 고정되어있는지 아닌지 상태를 알려주는 변수
        this.lockedStarPoint = false; 
    }
    setup() {
        this.bindEvents();
    }
    
    //별점을 고정된 상태로 만들어주는 함수
    lockStarPoint(){
        this.lockedStarPoint = true;
    }
    
    //별점을 고정되어있지않은 상태로 만들어주는 함수
    unlockStarPoint() {
        this.lockedStarPoint = false;
    }

    //별점의 상태를 반환하는 함수
    isLockedStarPoint(){
        return this.lockedStarPoint;
    }


    bindEvents() {
        this.starBackgroundElement.addEventListener('mousemove', (event)=>{
            
            //별점이 고정되어있다면 이벤트 핸들링 중지
            if(this.isLockedStarPoint()){
                return;
            }
            
            const {target, offsetX: currentUserPoint} = event; //offsetX : 타겟 요소에서의 마우스 포인터의 X축 위치를 반환
            const { point } = target.dataset;
            const starPointIndex = parseInt(point, 10) -1;
            const [starimageClientRect] = target.getClientRects(); //요소의 좌표와 크기에 대한 정보를 반환
            const starImageWidth = starimageClientRect.width;
            const isOverHalf = starImageWidth / 2 < currentUserPoint // 마우스포인터 위치가 별점의 중간을 넘어서면 true, 아니면 false

            this.renderStarPointImages({drawableLimitIndex: starPointIndex, isOverHalf});
        });

        //마우스클릭시 별점고정
        this.starBackgroundElement.addEventListener('click',()=> this.lockStarPoint())

        //리셋버튼 이벤트 할당
        this.starPointResetButton.addEventListener('click',()=>{
            this.unlockStarPoint();
            this.resetStarPointImaages(); 
        })
        //마우스 아웃 당시 별점이 고정상태가 아니라면 별점 초기화
        this.starBackgroundElement.addEventListener('mouseout', ()=>{
            !this.isLockedStarPoint() && this.resetStarPointImaages();
        })
    } 
    renderStarPointImages(payload={}){
        const {drawableLimitIndex = -1, isOverHalf = false} = payload; //초기값 할당
        //NodeList !== Array. call을 통해서 함수를 호출하는 객체를 Array에서 NodeList 객체로 재할당합니다.
        Array.prototype.forEach.call(this.starimages, (starimage, index) => {
            let imageSource = index < drawableLimitIndex ? starImageSourceMap.full : starImageSourceMap.empty;

            if(drawableLimitIndex === index){
                imageSource = isOverHalf ? starImageSourceMap.full : starImageSourceMap.half;
            }
            starimage.src = imageSource;
        });
    }
    resetStarPointImaages(){
        this.renderStarPointImages();
    }
}

export default StarPoint; 