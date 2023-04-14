import 'bootstrap/dist/css/bootstrap.min.css' //부트스트랩 라이브러리.
import {Outlet, Link, NavLink} from 'react-router-dom';

function Layout(){
    return(
        // a앵커태그 말고 Navlink 태그를 쓰자. to="/" 앵커태그 쓰면 새로고침 돼서 안씀.
        // 이동하는 링크는 라우터(App.js)에 등록되어 있어야한다.
        <div>
            <nav className="navbar navbar-expand-sm bg-success navbar-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link active" to="/Home">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/board/list">게시판</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/score/list">점수보기</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/hero/list">영웅리스트</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/hero/write">영웅라이트</NavLink>
                    </li>
                    </ul>
                </div>
            </nav>
            <div style = {{marginTop : "20px"}}></div>
            <Outlet/>
            {/* 컴포넌트가 출력되는 위치임! 안쓰면 출력 안돼 */}
        </div>
    )
}

export default Layout;