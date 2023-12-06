import React from 'react';
import './scss/sub7.scss';
import Sub7NoticeComponentChild from './Sub7NoticeComponentChild';
import axios from 'axios';
import Sub7NoticeLeftComponent from './Sub7NoticeLeftComponent'


export default function Sub7NoticeComponent() {

    const [state,setState] = React.useState({
        공지사항:[],
        공지카운트:0,
        n:0
    });


    React.useEffect(()=>{
        axios({
            url:'http://answotlr12.dothome.co.kr/kurly/green_kurly_notice_table_select.php',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    공지사항:res.data
                })
            }
        })
        .catch((err)=>{
            console.log(err+'실패')
        })
        return;
    },[])

    React.useEffect(()=>{
        if(state.공지사항.length>0){
            let cnt = 0;
            state.공지사항.map((item,idx)=>{
                if(item.타입==='공지'){
                    cnt++;
                }
            })
            setState({
                ...state,
                공지카운트:cnt,
                n:state.공지사항.length
            })
        }
    },[state.공지사항])


    return (
        <main id='sub7'>
            <section id="section1">
                <div className="container">
                    <div className="content">

                        <Sub7NoticeLeftComponent/>

                        <Sub7NoticeComponentChild 공지사항={state.공지사항} 공지카운트={state.공지카운트} n={state.n}/>
                    </div>
                </div>
            </section>
        </main>
    );
};
