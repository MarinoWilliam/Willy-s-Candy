import {takeLatest, all, call, put} from 'typed-redux-saga/macro'

import {USER_ACTION_TYPES} from './user.types'

import { signInSuccess, signInFail,signUpSuccess, signUpFail , signOutFail, signOutSuccess, EmailSignInStart, SignUpStart, SignUpSuccess} from './user.action'

import { getCurrentUser, 
    createUserDocumentFromAuth, 
    signInWithGooglePopup, 
    signInAuthUserWithEmailAndPassword, 
    createAuthUserWithEmailAndPassword,
    signOutUser,
    AdditionalInformation
} from '../../utils/firebase/firebase.utils'
import { User } from '@firebase/auth'


export function* getSnapshotFromUserAuth(userAuth :User, additionalData ?: AdditionalInformation){
    try { 
        const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalData)
        if (userSnapshot) {
            yield* put(signInSuccess({id:userSnapshot.id, ...userSnapshot.data()}))            
        }
    } catch (error) {
        console.log('fail happend here')
        yield* put(signInFail(error as Error))
        
    }
}

export function* isUserAuth(){
    try {
        const userAuth = yield* call(getCurrentUser)
        if (!userAuth) {
            return
        };
        yield* call(getSnapshotFromUserAuth, userAuth)
    } catch (error) {
        yield* put(signInFail(error as Error))
    }
}

export function* signInWithGoogle(){
    try {
        const {user} = yield* call(signInWithGooglePopup)
        console.log(user)
        yield* call(getSnapshotFromUserAuth, user)
    } catch (error) {
        yield* put(signInFail(error as Error))
    }
}

export function* signInWithEmail({payload : {email, password}}: EmailSignInStart){
    try {
        const UserCredentials = yield* call(signInAuthUserWithEmailAndPassword, email, password)
        if (UserCredentials) {
            const {user} = UserCredentials 
            yield* call(getSnapshotFromUserAuth, user)
        }
    } catch (error) {
        yield* put(signInFail(error as Error))
    }
}

export function* signUp({payload : {email, password,displayName}}:SignUpStart){
    try {
        const UserCredentials = yield* call(createAuthUserWithEmailAndPassword, email, password)
        if (UserCredentials){
            const {user} =UserCredentials
            yield* put(signUpSuccess(user, {displayName}))
        }
    } catch (error) {
        yield* put(signUpFail(error as Error))
    }
}

export function* signInAfterSignUp({payload : {user,additionalData}} : SignUpSuccess){
    try {
        yield* call(getSnapshotFromUserAuth, user, additionalData )
    } catch (error) {
        yield* put(signUpFail(error as Error))
    }
}

export function* signOut(){
    try {
        yield* call(signOutUser )
        yield* put(signOutSuccess())
    } catch (error) {
        yield* put(signOutFail(error as Error))
    }
}

export function* onCheckUserSession(){
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuth)
}

export function* onGoogleSignInStart(){
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart(){
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onSignUpStart(){
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess(){
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart(){
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSaga(){
    yield* all([
        call(onCheckUserSession),
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onSignUpStart), 
        call(onSignUpSuccess),
        call(onSignOutStart),
    ])
}
