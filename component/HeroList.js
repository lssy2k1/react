//HeroList.js : 벡엔드 서버로부터 데이터 가져온다.
//axios : 설치 필요 npm install axios
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HeroList(props){
    const [heroList, setHeroList] = useState([]);
    const [loading, setLoading] = useState(false);//데이터를 수신하면 true로 바꾸기 위함.
    //useState함수가 값을 초기화를 해주면 해당 값을 저장할 변수와 해당값을 변경하는 함수를 반환함.
    //[] => 배열을 저장할 변수를 반환, 배열값을 변환할 함수 주소를 반환.


    //첫번째 매개변수 - mount 될 때, update 될 때, unmount 될 때 호출되어진다.
    //[] - 변수 : 변수들이 바뀔 때 호출된다.
    useEffect(() => {
        //window.onload랑 비슷.
        //서버에서 데이터를 불러온다.
        // console.log("나 호출된다.");
        // setHeroList( heroList.concat([
        //     {id : 1, name : "이순신", desc : "임진왜란"},
        //     {id : 2, name : "을지문덕", desc : "살수대첩"},
        //     {id : 3, name : "세종대왕", desc : "한글창제"}
        // ]))
        //promise기반 컴포넌트라서 리턴값 못받음
        axios.get("http://localhost:9090/hero/list")
        .then((res) => {
            console.log(res);
            setHeroList(res.data)//화면에 뿌려줌.
            setLoading(true);
        })
        .catch((res, status, err) => {console.log(status)})
    }, []);

    return(
        <div>
        <table>
            <tbody>
            {
            loading === true ?
            heroList.map( (item, index) => {
                return(
                    <tr key = {index}>
                        <td>{item.id}</td>
                        <td>{item.hero_name}</td>
                        <td>{item.hero_desc}</td>
                    </tr>
                )
            })
        :""
        }
        </tbody>
        </table>
        </div>
    )

}

export default HeroList