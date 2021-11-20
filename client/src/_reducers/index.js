import { combineReducers } from 'redux';
import user from './user_reducer';

const rootReducer = combineReducers({
    user //현재는 user_reducer의 reducer만 combine 한 상태
})

export default rootReducer;

/* store에 reducer가 여러개 있을 수 있다.
변환값을 리턴하는게 reducer인데, 여러 컴포넌트에서 각각 변환값을 combineReducers를 통해 하나로 묶음
로그인,로그아웃 등등 여러가지 컴포넌트
*/