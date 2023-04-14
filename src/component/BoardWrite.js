import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVERIP } from '../CommonUtil';
import {Link, useNavigate, useParams} from 'react-router-dom';

function BoardWrite(props){
    let {id} = useParams();//보내는쪽에서 JSON객체로 보냄.
    let history = useNavigate();

    const [title, setTitle] = useState("");
    const [username, setUsername] = useState("");
    const [contents, setContents] = useState("");

    const loadData = async (id) => {
      let results = await axios.get(SERVERIP + "/rest_board/view/" + id);
      console.log(results)
      setTitle(results.data.title);
      setUsername(results.data.username);
      setContents(results.data.contents);
    }

    useEffect(()=>{
      console.log("id", id);
      if(id!=undefined)//write가 아니고 view를 호출할 때
        loadData(id);
    },[]);

    // window.onload
    // BoardWrite컴포넌트가 /board/write 일때는 id에 undefined가 오고
    // /board/view/1 id에는 파라미터 값이 저장된다.
    const titleChange= (e) =>{
      setTitle(e.target.value);
    }
    const usernameChange= (e) =>{
      setUsername(e.target.value);
    }
    const contentsChange= (e) =>{
      setContents(e.target.value);
    }

    //서버로 전송하기
    const postData=() =>{
      let data = {"title" : title, "username" : username, "contents": contents};
      axios.post(SERVERIP + "/rest_board/write", data)
      .then((res) =>{
        console.log(res.data);
        history("/");//redirect에 대응
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
                <td>제목</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="text" className="form-control" id="title" name="title" value = {title}
                        placeholder="제목을 입력하세요"  onChange = {titleChange}/>
                    </div>
                </td>
              </tr>       
              <tr>
                <td>아이디</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="text" className="form-control" id="writer" name="writer" value = {username}
                        placeholder="이름을 입력하세요" onChange = {usernameChange}/>
                    </div>
                </td>
                <td>내용</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="text" className="form-control" id="contents" name="contents" value = {contents}
                        placeholder="이름을 입력하세요" onChange = {contentsChange}/>
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

export default BoardWrite;