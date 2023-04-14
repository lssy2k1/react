import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVERIP } from '../../CommonUtil';
import {Link, useNavigate, useParams} from 'react-router-dom';

function HeroWrite(props){
    let {id} = useParams();//보내는쪽에서 JSON객체로 보냄.
    let history = useNavigate();

    const [heroName, setHeroName] = useState("");
    const [heroDesc, setHeroDesc] = useState("");

    useEffect(()=>{
      console.log("id", id);
      async function loadData(id){
        let results = await axios.get(SERVERIP + "/hero/view/" + id);
        console.log(results)
        console.log(results.data.hero.hero_name)
        console.log(results.data.hero.hero_desc)
        setHeroName(results.data.hero.hero_name);
        setHeroDesc(results.data.hero.hero_desc);
      }
      if(id!=undefined)//write가 아니고 view를 호출할 때
        loadData(id);
    },[]);
    // window.onload
    // BoardWrite컴포넌트가 /board/write 일때는 id에 undefined가 오고
    // /board/view/1 id에는 파라미터 값이 저장된다.
    const nameChange= (e) =>{
      setHeroName(e.target.value);
    }
    const descChange= (e) =>{
      setHeroDesc(e.target.value);
    }

    //서버로 전송하기
    const postData=() =>{
      let data = {"hero_name" : heroName, "hero_desc" : heroDesc};
      axios.post(SERVERIP + "/hero/write", data)
      .then((res) =>{
        console.log(res.data);
        history("/hero/list");//redirect에 대응
      })
      .catch((error) => {
        console.log(error)
      })
    }
    return(
        <div className = "container">
            <h1>게시판글쓰기</h1>
            <table className="table table-hover " style={{marginTop : "30px"}}>
            <colgroup>
                <col width="25%"/>
                <col width="*"/>
            </colgroup> 
            <tbody>
              <tr>
                <td>이름</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="text" className="form-control" id="title" name="title" value = {heroName}
                        placeholder="제목을 입력하세요"  onChange = {nameChange}/>
                    </div>
                </td>
              </tr>       
              <tr>
                <td>상세</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="text" className="form-control" id="writer" name="writer" value = {heroDesc}
                        placeholder="이름을 입력하세요" onChange = {descChange}/>
                    </div>
                </td>
              </tr>      
            </tbody>
          </table>
          <div className="container mt-3" style={{textAlign:"right"}}>
             <Link className="btn btn-secondary" onClick={postData}>등록</Link>&nbsp;&nbsp;
             <Link className="btn btn-secondary">취소</Link>
          </div>
        </div>
    )
}

export default HeroWrite;