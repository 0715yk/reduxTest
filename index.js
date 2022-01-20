import { createStore } from "redux";

const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#decrease');

// 2) 액션 이름 
// - 액션 이름은 문자열 형태로 만든다.
// - 대문자로 작성한다. 
// - 고유값이어야한다(중복X)
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

// 3) 액션 생성 함수
// - 액션 객체는 '반드시' type을 가지고 있어야한다.
// - 추후 상태 업데이트시에 참고하고 싶은 값을 마음대로 넣을 수 있다. 
const toggleSwitch = () => ({type:TOGGLE_SWITCH});
const increase = difference => ({type:INCREASE, difference});
const decrease = () => ({type:DECREASE});

// 4) 초기값 
const initialState = {
    toggle : false,
    counter : 0,
}

// 5) 리듀서(reducer)
const reducer = (state = initialState, action) => { 
    switch(action.type) {
        case TOGGLE_SWITCH:
            return {
                ...state,
                toggle:!state.toggle
            };
        case INCREASE:
            return {
                ...state,
                counter:state.counter + action.difference
            };
        case DECREASE:
            return {
                ...state,
                counter:state.counter-1
            };
        default:
            return state;
    }
}

// 6) 스토어(Store) 만들기
const store = createStore(reducer)


// 7) render 함수 만들기
const render = () => {
    const state = store.getState();
    // 토글 처리
    if(state.toggle) {
        divToggle.classList.add('active');
    } else {
        divToggle.classList.remove('active');
    }
    // 카운터 처리
    counter.innerText = state.counter;
}

render();

// 8) 구독하기
store.subscribe(render);

// 9) 액션 발생시키기(Dispatch)
divToggle.onclick = () => {
    store.dispatch(toggleSwitch());
};

btnIncrease.onclick = () => {
    store.dispatch(increase(1));
}

btnDecrease.onclick = () => {
    store.dispatch(decrease());
}
