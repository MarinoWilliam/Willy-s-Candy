import {takeLatest, all, call, put} from 'redux-saga/effects'

import {USER_ACTION_TYPES} from './user.types'

import { signInSuccess, signInFail,signUpSuccess, signUpFail , signOutFail, signOutSuccess} from './user.action'

import { getCurrentUser, 
    createUserDocumentFromAuth, 
    signInWithGooglePopup, 
    signInAuthUserWithEmailAndPassword, 
    createAuthUserWithEmailAndPassword,
    signOutUser
} from '../../utils/firebase/firebase.utils'


export function* getSnapshotFromUserAuth(userAuth, additionalData){
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalData)
        console.log (userSnapshot)
        yield put(signInSuccess({id:userSnapshot.id, ...userSnapshot.data()}))
    } catch (error) {
        console.log('fail happend here')
        yield put(signInFail(error))
        
    }
}

export function* isUserAuth(){
    try {
        const userAuth = yield call(getCurrentUser)
        if (!userAuth) {
            return
        };
        yield call(getSnapshotFromUserAuth, userAuth)
    } catch (error) {
        yield put(signInFail(error))
    }
}

export function* signInWithGoogle(){
    try {
        const {user} = yield call(signInWithGooglePopup)
        console.log(user)
        yield call(getSnapshotFromUserAuth, user)
    } catch (error) {
        yield put(signInFail(error))
    }
}

export function* signInWithEmail({payload : {email, password}}){
    try {
        const {user} = yield call(signInAuthUserWithEmailAndPassword, email, password)
        yield call(getSnapshotFromUserAuth, user)
    } catch (error) {
        yield put(signInFail(error))
    }
}

export function* signUp({payload : {email, password,displayName}}){
    try {
        const {user} = yield call(createAuthUserWithEmailAndPassword, email, password)
        yield put(signUpSuccess(user, {displayName}))
    } catch (error) {
        yield put(signUpFail(error))
    }
}

export function* signInAfterSignUp({payload : {user,additionalData}}){
    try {
        yield call(getSnapshotFromUserAuth, user, additionalData )
    } catch (error) {
        yield put(signUpFail(error))
    }
}

export function* signOut(){
    try {
        yield call(signOutUser )
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFail(error))
    }
}

export function* onCheckUserSession(){
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuth)
}

export function* onGoogleSignInStart(){
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart(){
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onSignUpStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSaga(){
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onSignUpStart), 
        call(onSignUpSuccess),
        call(onSignOutStart),
    ])
}
