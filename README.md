### 구성
스프링부트와 리액트, mariaDB로 만들어졌습니다.


### 실행방법(권장)
1. 별도의 폴더를 만들어 리액트 앱을 설치합니다.(create-react-app)

2. npm을 이용해 react-router-dom 을 설치해줍니다.

3. 리액트 앱을 설치한 폴더의 기존 src파일을 제거합니다.

4. 다운로드한 파일에 있는 src폴더를 리액트 폴더로 옮기거나 복사합니다.

5. springboot 안에 있는 blogDB.sql을 이용해 연동될 DB를 만들어줍니다.

6. springboot/blog/src/main/resources/application.properties에서
    spring.datasource.username=blog
    spring.datasource.password=8520
    위 두 항목에서 blog 대신 사용하시는 db의 사용자를, 8520 대신 사용하시는 사용자의 비밀번호를 입력하세요.

7. springboot 안에 있는 BlogApplication을 실행합니다.

8. 리액트를 실행합니다