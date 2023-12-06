## 깃허브 배포

01. 리파지토리 생성
  - kurly

02. setting
   *  pages 클릭 > GitHub Pages > Build and deployment (Branch) > None 선택 master > 배포주소.io

03. package.json
                    https://jaesik16.github.io/kurly => 배포주소
  - "homepage" : "https://jaesik16.github.io/kurly"
  - "homepage" : "http://myusername.github.io/my-app/"

04. git 설정
    - git init

05. git 환경(config) 설정(name, email)
    - git config user.name 'answotlr12'
    - git config user.email 'qweqwexz@naver.com'

06. 리모트 오리진 추가
    - git remote add origin https://github.com/jaesik16/kurly.git

07. add(스테이징)
    - git add *

08. commit(커밋)
    - git commit -m 'Kurly 배포'

09. push(푸쉬)
    - git push origin master

10. Deployment
    
    ### GitHub pages

    Step 1 : Add homepage to package.json
        - "homepage" : "https://jaesik16.github.io/kurly"

    Step 2: Install gh-pages and add deploy to scripts in package.json
        - npm install --save gh-pages
        - npm install save gh-pages
        - package.json 속성 추가하기
           * branch 배포
            "predeploy": "npm run build",
            "deploy": "gh-pages -d build",

        -  master 배포 
        -  package.json script에 속성 추가하기
---        
            "predeploy": "npm run build",
            "deploy": "gh-pages -b master -d build"
---        
        - 저장한다.

---

    Step 3: Deploy the site by running npm run deploy
        - build
        - npm run deploy
        .
        .
        .
        - Published => 배포완료!
        
---

11. 깃허브
    - 새로고침
    - settings
    - pages
    - GitHub Pages
    - pages 클릭 > GitHub Pages > Build and deployment (Branch) > None 선택 
      > master선 택 > Save
    - 새로고침
    - 1분이상 대기
    - 새로고침
    - Visit site 클릭 웹사이트 열린다

12. 버그
    - 새로고침
      * 404 페이지 오류
      * HashRouter 로 수정한다.
    - https => http 통신 CORS 오류 발생 웹서버에 접근 허용 안됨
     * 닷홈 SSL 인증서 발급
       a. 유료 도메인을 구입
       b. 유료 웹호스팅으로 변경신청
       c. SSL 인증서 무료 발급한다.
       * 그리고 2-3일 기다린다.
       * 닷홈 도메인 정보 > SSL 연결 도메인 >SSL 인증서 (사용중) 확인
    
    -  전체 컴포넌트 REST API 수정
       * url 내용을 수정한다.
           수정 전
           http://answotlr12.dothome.co.kr
           
           수정 후
           https://유료도메인.co.kr 







# 자바스크립트
## 자바코딩
```
    const selector = useSelector((state)=>state);
    const dispatch = useDispatch();

    React.useEffect(()=>{
        // 상태관리 변수에 
        // 새로고침해도 계속 로그인 정보를 유지하도록
        // 로컬스토레이지 데이터를 가져온다.
        if(localStorage.getItem('KURLY_SIGNIN_DATA')!==''){
            const res = JSON.parse(localStorage.getItem('KURLY_SIGNIN_DATA'))
            dispatch(signIn(res))
        }
    },[])
```