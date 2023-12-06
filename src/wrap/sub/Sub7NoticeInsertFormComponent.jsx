import React from 'react';
import Sub7NoticeLeftComponent from './Sub7NoticeLeftComponent';
import './scss/sub7.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { confirmModal } from '../../reducer/confirmModal';
import { useDispatch } from 'react-redux';

export default function Sub7NoticeInsertFormComponent(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const [state,setState] = React.useState({
        isSelect:false,
        유형:'',
        작성자:'깁갑수',
        아이디:'answotlr12',
        제목:'',
        내용:''
    })
    const onClickArrow=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isSelect:!state.isSelect
        })
    }

    const onChangeSelect=(e)=>{
        setState({
            ...state,
            유형:e.target.value
        })
    }
    const onChangeSubject=(e)=>{
        setState({
            ...state,
            제목:e.target.value
        })
    }
    const onChangeContent=(e)=>{
        setState({
            ...state,
            내용:e.target.value
        })
    }
    const onsubmitInsert=(e)=>{
        e.preventDefault();
        if(state.제목===''){
            confirmModalMethod('제목을 입력해 주세요.');
        }
        else if(state.내용===''){
            confirmModalMethod('내용을 입력해 주세요');
        }
        else{
            const formData = new FormData()
            formData.append('wType',state.유형);
            formData.append('wName',state.작성자);
            formData.append('wId',state.아이디);
            formData.append('wSubject',state.제목);
            formData.append('wContent',state.내용);
            axios({
                url:'http://answotlr12.dothome.co.kr/kurly/green_kurly_notice_table_insert.php',
                method:'POST',
                data:formData
            })
            .then((res)=>{
                if(res.status===200){
                    if(res.data===1){
                        confirmModalMethod('공지사항이 등록되었습니다.')
                        navigate('/sub7')
                    }
                    else{
                        confirmModalMethod('정보가 보내지지않았습니다.')
                    }
                }
            })
            .catch((err)=>{
                console.log('전송실패')
            })
        }
    }
    return (
        <main id='sub7' className='sub7'>
            <section id="section1">
                <div className="container">
                    <div className="content">
                        <Sub7NoticeLeftComponent/>
                        <div className="right sub7-insert-form">
                            <div className="right-header">
                                <h2>공지사항</h2>
                            </div>
                            <div className="right-list">
                                {/* 공지사항 글쓰기 입력폼 */}
                                <form autoComplete='none' onSubmit={onsubmitInsert}>
                                    <div className="insert-form">
                                        <ul>
                                            <li>
                                                <div className="gap">
                                                    <label className='left-label' htmlFor="wType">유형<i>*</i></label>
                                                    <select onClick={onClickArrow} name="wType" id="wType" onChange={onChangeSelect}>
                                                        <option value="">게시글</option>
                                                        <option value="공지">공지</option>
                                                    </select>
                                                    <span className={`icon-arrow-down ${state.isSelect?'on':''}`}></span>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="gap">
                                                    <span className='left-label'>작성자<i>*</i></span>
                                                    <div className="admin-name">{'깁갑수'}</div>
                                                </div>
                                            </li>
                                            
                                            <li>
                                                <div className="gap">
                                                    <span className='left-label'>아이디<i>*</i></span>
                                                    <div className="admin-id">{'answotlr12'}</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="gap">
                                                    <label className='left-label'>제목<i>*</i></label>
                                                    <input 
                                                        type="text"
                                                        name='subject'
                                                        id='subject'
                                                        onChange={onChangeSubject}
                                                        value={state.제목}
                                                     />
                                                </div>
                                            </li>
                                            <li>
                                                <div className="gap">
                                                    <label className='left-label'>내용<i>*</i></label>
                                                     <textarea 
                                                        name="content" 
                                                        id="content" 
                                                        cols="30" 
                                                        rows="10"
                                                        onChange={onChangeContent}
                                                        value={state.내용}
                                                     ></textarea>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="button-box">
                                        <button type='submit'>등록</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};