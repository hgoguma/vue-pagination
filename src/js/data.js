const fetchData = (pageIndex = 1) => {
    //페이지 옵션 page index, pagesize 등등 설정하기 -> parameter
    console.log('fetchData func!', pageIndex);
    //let results = []; //20개 들어있는 배열
    let resultArray = [
        [{"id":181812,"original_title":"Star Wars: The Rise of Skywalker","poster_path":"/opENUWyvrxvsXrRM3qq4wmJDCo2.jpg","title":"스타워즈: 라이즈 오브 스카이워커"},
        {"id":38700,"title":"나쁜 녀석들: 포에버","original_title":"Bad Boys for Life","poster_path":"/anhvhTzdjzMLzGV8oTFNssvMTIw.jpg"},
        {"id":443791,"title":"언더워터","original_title":"Underwater","poster_path":"/jlHL2BH176JApGiLnNQLQgdjMFd.jpg"},
        {"id":454626,"original_title":"Sonic the Hedgehog","poster_path":"/pMXOlasWr1IzHGH8HWw1ZTXs6rQ.jpg","title":"수퍼 소닉"},
        {"id":495764,"original_title":"Birds of Prey (and the Fantabulous Emancipation of One Harley Quinn)", "poster_path":"/cT3NC2gZXFmmQyPVpxJoJTucOFT.jpg", "title":"버즈 오브 프레이: 할리 퀸의 황홀한 해방"},
        {"id":512200,"title":"쥬만지: 넥스트 레벨","original_title":"Jumanji: The Next Level","poster_path":"/n7KDDIWOY5IZrGlkeizuFMZfJFl.jpg"},
        {"original_title":"Mortal Kombat Legends: Scorpions Revenge","poster_path":"/4VlXER3FImHeFuUjBShFamhIp9M.jpg","title":"모탈 컴뱃 레전드: 스콜피온의 복수"},
        {"id":539537,"title":"판타지 아일랜드","original_title":"Fantasy Island","poster_path":"/rbrvkNWDyF1NKzvAlIHepFBSBJq.jpg"},
        {"original_title":"Bloodshot","poster_path":"/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg","title":"블러드샷"},
        {"id":522627,"title":"젠틀맨","original_title":"The Gentlemen","poster_path":"/361ksMhxn9tCYhVvzfkW8c2ZLYl.jpg"}],
    
        [{"id":446893,"title":"트롤: 월드 투어","original_title":"Trolls World Tour","poster_path":"/q9KF4CXgK6imiN0Obvg8D7IDRVz.jpg"},
        {"id":508439,"title":"온워드: 단 하루의 기적","original_title":"Onward","poster_path":"/5yaqWb6PnJQuASGTe7c1ontBrUt.jpg"},
        {"id":448119,"title":"닥터 두리틀","original_title":"Dolittle","poster_path":"/j1EKEu4RzIep2IJMETMrjWDC0Wi.jpg"},
        {"id":466622,"title":"리듬 오브 리벤지","original_title":"The Rhythm Section","poster_path":"/vP7pxXNnCGkFXkvx5deGwv3pjIj.jpg"},
        {"id":530915,"original_title":"1917","poster_path":"/u2oRQqUashBBIj5UNeOd5TN0bmB.jpg","title":"1917"},
        {"id":299534,"title":"어벤져스: 엔드게임","original_title":"Avengers: Endgame","poster_path":"/n78LK2t1uQP68Ud0VXHRe0HmKOp.jpg"},
        {"id":475557,"title":"조커","original_title":"Joker","poster_path":"/wrCwH6WOvXQvVuqcKNUrLDCDxdw.jpg"},
        {"id":330457,"title":"겨울왕국 2","original_title":"Frozen II","poster_path":"/lVcwSnzhSMWYXUQzyMilCztSE6I.jpg"},
        {"id":560044,"title":"윌러비 가족","original_title":"The Willoughbys","poster_path":"/dKgV8T3inB5EnVDg0Jeh2L6ttQ9.jpg"},
        {"id":526019,"original_title":"Like a Boss","poster_path":"/9qXVdjkKd00mrQEqK4vmSqkLFek.jpg","title":"라이크 어 보스"}]];

    let dummyData = {
        "pagination": {
            "total": 100,
            "per_page": 20,
            "current_page": pageIndex,
            "last_page": 200,
            "from": 751,
            "to": 800,
        }
    }

    if(pageIndex%2) { //들어온 index가 홀수일 때
        dummyData.results = resultArray[0] 
    } else {
        dummyData.results = resultArray[1] 
    }
        
    return dummyData;
}

export default fetchData;