import React from 'react';
import './scss/sub6_pw_reset.scss';
import { useNavigate, useLocation, Link }  from  'react-router-dom';
import axios from 'axios';
import { confirmModal } from '../../reducer/confirmModal';
import { useDispatch,useSelector } from 'react-redux';

export default function Sub6SignInPwResetComponent() {

    const location = useLocation();
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const navigate = useNavigate();

    
    const[state,setState] = React.useState({
        아이디:'',
        휴대폰:'',
        새비밀번호1:'',
        새비밀번호2:'',
        pw1box:false,
        pw2box:false,
        pw1Guid1:null,
        pw1Guid2:null,
        pw1Guid3:null,
        pw2Guid1:null,
    })

    React.useEffect(()=>{
        if(location.state.아이디 !=='' && location.state.휴대폰 !=='' ){
            setState({
                ...state,
                아이디:location.state.아이디,
                휴대폰:location.state.휴대폰
            })
        }
    },[])

    const pw1RegExp=(value)=>{
        const regexp1 = /^(.){10,16}$/g;
        const regexp2 = /((?=.*[A-Za-z])+(?=.*[0-9])+)|((?=.*[A-Za-z])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?])+)|((?=.*[0-9])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?])+)/g;
        const regexp3 = /\s/g;
        const regexp4 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const regexp5 = /(\d)\1\1/g;
        let pw1Guid1=null;
        let pw1Guid2=null;
        let pw1Guid3=null;
        if(regexp1.test(value)===false){
            pw1Guid1 = false;
        }
        else{
            pw1Guid1=true;
        }
        if(regexp2.test(value)===false || regexp3.test(value)===true || regexp4.test(value)===true){
            pw1Guid2 = false;
        }
        else{
            pw1Guid2 = true;
        }
        if(regexp5.test(value)===true){
            pw1Guid3 = true;
        }
        else{
            pw1Guid3=false;
        }
        setState({
            ...state,
            pw1Guid1:pw1Guid1,
            pw1Guid2:pw1Guid2,
            pw1Guid3:pw1Guid3,
            새비밀번호1:value
        })
    }

    const pw2RegExp=(value)=>{
        let pw2Guid1=null;
        if(value !== state.새비밀번호1){
            pw2Guid1=false
        }
        else{
            pw2Guid1=true
        }
        setState({
            ...state,
            pw2Guid1:pw2Guid1,
            새비밀번호2:value
        })
    }

    const onChangePw1=(e)=>{
        pw1RegExp(e.target.value)
    }
    const onChangePw2=(e)=>{
        pw2RegExp(e.target.value)
    }

    const onFocusPw1=()=>{
        setState({
            ...state,
            pw1box:true
        })
    }
    const onFocusPw2=()=>{
        pw2RegExp(state.새비밀번호2)
    }
    const onBlurPw1=()=>{
        pw1RegExp(state.새비밀번호1);
    }
    const onBlurPw2=()=>{
        pw2RegExp(state.새비밀번호2)
    }



    // 리덕스 디스패쳐 컨펌모달메서드 => 반복구현
    const confirmModalMethod=(msg)=>{
        const obj = {
            isConfirmModal: true,
            confirmMsg: msg,
            회원가입완료: false
        }
        dispatch(confirmModal(obj));

        const htmlEl = document.getElementsByTagName('html')[0];
        htmlEl.classList.add('on');
    }

    // 전송
    const onSubmitPwReset=(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('userId',state.아이디);
        formData.append('userHp',state.휴대폰);
        formData.append('userPw',state.새비밀번호1);
        axios({
            url:'http://answotlr12.dothome.co.kr/kurly/Kurly_pw_reset.php',
            method:'Post',
            data:formData
        })
        .then((res)=>{
            console.log(res);
            if(res.data==1){
                confirmModalMethod('비밀번호가 변경되었습니다.')
            }
            else{
                confirmModalMethod('다시 확인하고 시도해주세요')
            }
        })
        .catch((err)=>{
            console.log(err)
            console.log('실패');
        })
    }
    React.useEffect(()=>{
        if(selector.confirmModal.회원가입완료===true){
            navigate('/sub6');
        }
    },[selector.confirmModal.회원가입완료]);
    
    const onClickDelPw1=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            새비밀번호1: ''
        });
    }
    const onClickDelPw2=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            새비밀번호2: ''
        });
    }




    return (
        <main id='sub6' className='pw-reset-form'>
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2 className="title-text">비밀번호 재설정</h2>
                    </div>
                    
                    <div className="content sub6-content">
                       <form onSubmit={onSubmitPwReset}>
                            <ul>
                                <li>
                                    <div className="gap">
                                        <label htmlFor="userPw1">새 비밀번호 등록</label>
                                        <input 
                                        type="password" 
                                        value={state.새비밀번호1}
                                        name='userPw1' 
                                        id='userPw1' 
                                        placeholder='새 비밀번호를 입력해주세요.'
                                        onChange={onChangePw1}
                                        onFocus={onFocusPw1}
                                        onBlur={onBlurPw1} 
                                        maxLength={16}
                                        />
                                        <button 
                                            className='delete-btn' 
                                            onClick={onClickDelPw1}>
                                            <img src="./images/sub/sub6/icon_del.svg" alt="" />
                                        </button>  
                                    </div>
                                    {   state.pw1box &&
                                        <div className="p-box">
                                            <p className={state.pw1Guid1===null?'':(state.pw1Guid1===false?'red':'blue')}>10자 이상 입력</p>
                                            <p className={state.pw1Guid2===null?'':(state.pw1Guid2===false?'red':'blue')}>영문/숫자/특수문자(공백제외)만 허용하며, 2개이상 조함</p>
                                            <p className={state.pw1Guid3===null?'':(state.pw1Guid3===true?'red':'blue')}>동일한 숫자 3개이상 연속 사용 불가</p>
                                        </div>
                                    }
                                </li>
                                <li>
                                    <div className="gap">
                                        <label htmlFor="userPw2">새 비밀번호 확인</label>
                                        <input 
                                        onChange={onChangePw2} 
                                        type="password" 
                                        value={state.새비밀번호2} 
                                        name='userPw2' 
                                        id='userPw2' 
                                        placeholder='새 비밀번호를 한번 더 입력해주세요.' 
                                        onFocus={onFocusPw2}
                                        onBlur={onBlurPw2}
                                        maxLength={16} 
                                        />
                                        <button 
                                        className='delete-btn' 
                                        onClick={onClickDelPw2}>
                                        <img src="./images/sub/sub6/icon_del.svg" alt="" />
                                        </button>  
                                    </div>
                                    { state.pw2box &&
                                        <div className="p-box">
                                            <p className={state.pw2Guid1===null?'':(state.pw2Guid1===false?'red':'blue')}>동일한 비밀번호를 입력해주세요.</p>
                                        </div>
                                    }
                                </li>
                                <li>
                                    <div className="gap">
                                        <span>
                                            <a href="!#" >아이디 찾기</a>
                                            <i>|</i>
                                            <a href="!#" >비밀번호 찾기</a>
                                        </span>                                        
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <input type="submit" name='submitBtn' id='submitBtn' value={'확인'} />
                                    </div>
                                </li>
                            </ul>
                       </form>
                    </div>
                </div>
            </section>
        </main>
    );
};
