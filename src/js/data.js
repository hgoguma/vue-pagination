let totalData = 148;

let data = [
    {"id":"181812","original_title":"Star Wars: The Rise of Skywalker","poster_path":"https://image.tmdb.org/t/p/w500/opENUWyvrxvsXrRM3qq4wmJDCo2.jpg","title":"스타워즈: 라이즈 오브 스카이워커"},
    {"id":"38700","title":"나쁜 녀석들: 포에버","original_title":"Bad Boys for Life","poster_path":"https://image.tmdb.org/t/p/w500/anhvhTzdjzMLzGV8oTFNssvMTIw.jpg"},
    {"id":"443791","title":"언더워터","original_title":"Underwater","poster_path":"https://image.tmdb.org/t/p/w500/jlHL2BH176JApGiLnNQLQgdjMFd.jpg"},
    {"id":"454626","original_title":"Sonic the Hedgehog","poster_path":"https://image.tmdb.org/t/p/w500/pMXOlasWr1IzHGH8HWw1ZTXs6rQ.jpg","title":"수퍼 소닉"},
    {"id":"495764","original_title":"Birds of Prey (and the Fantabulous Emancipation of One Harley Quinn)", "poster_path":"https://image.tmdb.org/t/p/w500/cT3NC2gZXFmmQyPVpxJoJTucOFT.jpg", "title":"버즈 오브 프레이: 할리 퀸의 황홀한 해방"},
    {"id":"512200","title":"쥬만지: 넥스트 레벨","original_title":"Jumanji: The Next Level","poster_path":"https://image.tmdb.org/t/p/w500/n7KDDIWOY5IZrGlkeizuFMZfJFl.jpg"},
    {"id":"55555","original_title":"Mortal Kombat Legends: Scorpions Revenge","poster_path":"https://image.tmdb.org/t/p/w500/4VlXER3FImHeFuUjBShFamhIp9M.jpg","title":"모탈 컴뱃 레전드: 스콜피온의 복수"},
    {"id":"539537","title":"판타지 아일랜드","original_title":"Fantasy Island","poster_path":"https://image.tmdb.org/t/p/w500/rbrvkNWDyF1NKzvAlIHepFBSBJq.jpg"},
    {"id":"88888","original_title":"Bloodshot","poster_path":"https://image.tmdb.org/t/p/w500/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg","title":"블러드샷"},
    {"id":"522627","title":"젠틀맨","original_title":"The Gentlemen","poster_path":"https://image.tmdb.org/t/p/w500/361ksMhxn9tCYhVvzfkW8c2ZLYl.jpg"},
    {"id":"446893","title":"트롤: 월드 투어","original_title":"Trolls World Tour","poster_path":"https://image.tmdb.org/t/p/w500/q9KF4CXgK6imiN0Obvg8D7IDRVz.jpg"},
    {"id":"508439","title":"온워드: 단 하루의 기적","original_title":"Onward","poster_path":"https://image.tmdb.org/t/p/w500/5yaqWb6PnJQuASGTe7c1ontBrUt.jpg"},
    {"id":"448119","title":"닥터 두리틀","original_title":"Dolittle","poster_path":"https://image.tmdb.org/t/p/w500/j1EKEu4RzIep2IJMETMrjWDC0Wi.jpg"},
    {"id":"466622","title":"리듬 오브 리벤지","original_title":"The Rhythm Section","poster_path":"https://image.tmdb.org/t/p/w500/vP7pxXNnCGkFXkvx5deGwv3pjIj.jpg"},
    {"id":"530915","original_title":"1917","poster_path":"https://image.tmdb.org/t/p/w500/u2oRQqUashBBIj5UNeOd5TN0bmB.jpg","title":"1917"},
    {"id":"299534","title":"어벤져스: 엔드게임","original_title":"Avengers: Endgame","poster_path":"https://image.tmdb.org/t/p/w500/n78LK2t1uQP68Ud0VXHRe0HmKOp.jpg"},
    {"id":"475557","title":"조커","original_title":"Joker","poster_path":"https://image.tmdb.org/t/p/w500/wrCwH6WOvXQvVuqcKNUrLDCDxdw.jpg"},
    {"id":"330457","title":"겨울왕국 2","original_title":"Frozen II","poster_path":"https://image.tmdb.org/t/p/w500/lVcwSnzhSMWYXUQzyMilCztSE6I.jpg"},
    {"id":"560044","title":"윌러비 가족","original_title":"The Willoughbys","poster_path":"https://image.tmdb.org/t/p/w500/dKgV8T3inB5EnVDg0Jeh2L6ttQ9.jpg"},
    {"id":"526019","original_title":"Like a Boss","poster_path":"https://image.tmdb.org/t/p/w500/9qXVdjkKd00mrQEqK4vmSqkLFek.jpg","title":"라이크 어 보스"}
];


const makeDataArray = (totalData) => {

    let newArray = Array.from(data);
    let length = totalData - newArray.length;
    for(let i = 0; i < length; i++) {
        newArray.push(newArray[i]);
    }
    return newArray;
}

let newArray = makeDataArray(totalData);

const fetchData = (data) => {

    //console.log('fetchData API'); //currentPageIndex, pageOption
    //console.log(data);

    //let array = makeDataArray(totalData); //totalData 개수 만큼 배열 만듦

    //데이터를 dataPerPage 만큼 끊어서 새로 배열 만들기

    let resultArray = []; //ex ) [ [1,2,3,4,5], [6,7,8,9,10], [11,12,13] ]...

    let totalPage = Math.ceil(totalData/data.pageOption.dataPerPage); //총 페이지 개수

    for(let i = 0; i < totalPage; i++) {
        let k = i * Number(data.pageOption.dataPerPage);
        let j = k+Number(data.pageOption.dataPerPage);
        let  arr = newArray.slice(k, j);
        resultArray.push(arr);
    }

    let dummyData = {
        "currentPageIndex" : data.currentPageIndex,
        "totalData" : totalData,
        "results" : resultArray[data.currentPageIndex-1]
    }
        
    return dummyData;
}




const saveData = (formData) => {
    //id (유니크 값) 만들기
    function getUUID() { // UUID v4 generator in JavaScript (RFC4122 compliant)
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 3 | 8);
            return v.toString(16);
        });
    }
    let id = getUUID();
    
    //사진 데이터 넣어주기
    let poster_path = 'https://image.tmdb.org/t/p/w500/zXfQcdTx0jxbH5Atpwjvb5z5VjE.jpg'; //고정값으로 셋팅

    //객체 생성
    let savedData = {
        id : id,
        title : formData.title,
        original_title : formData.original_title,
        poster_path : poster_path
    }

    //기존 배열 앞에 추가
    newArray.unshift(savedData);

    data.push(savedData);

    //전체 데이터 개수 올리기
    totalData++;

    return {result : "success", id : id };
}

const deleteData = (id) => {
    //for문 돌면서 id값이랑 일치하는 거 찾아서 배열에서 삭제
    newArray = newArray.filter(element => element.id !== id);
    totalData--;

    return "success";
}

const getMovieData = (movieId) => {
    //id로 배열에서 값 찾기

    let movieData = data.find( element => element.id === movieId); //객체 가져옴

    //여기서 object를 새로 만들어서 return 해주지 않고 기존 객체(movieData) 그 자체로 return 하면 주소값이 같아서 문제 발생,,
    
    let movieObj = {
        "id" : movieData.id,
        "title" : movieData.title,
        "original_title" : movieData.original_title,
        "poster_path" : movieData.poster_path,
    }
    return movieObj;
}

const modifyData = (modifiedData) => { //data 객체가 들어옴

    //배열(data)에서 값 찾아서 수정
    let data_index = data.findIndex( element => element.id === modifiedData.id ); //해당되는 배열의 index 가져오기
    data[data_index] = modifiedData;

    //뿌리는 배열(newArray)에서 값 찾아서 수정
    let newArray_index = newArray.findIndex( element => element.id === modifiedData.id ); //해당되는 배열의 index 가져오기
    newArray[newArray_index] = modifiedData;

    return "success";

}

module.exports = {
    fetchData,
    saveData,
    deleteData,
    getMovieData,
    modifyData,
}
