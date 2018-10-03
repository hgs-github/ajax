# 설명
```
jquery의 ajax를 구현해본것이다.
완벽하게 디테일하게 구현해놓지는 않았지만
XMLHttpRequest로 비동기로 요청을 보낼 때처럼
값을 "name=user&value=10" 이런식으로
보내지 않고
객체 리터럴을 사용해서 보낼 수 있고

요청을 보낼시 코드가 응답을 할 때까지
기다렸다가 코드를 작성할 시
promise 코드를 사용했기에
콜백 지옥을 방지한다.
```
# 사용법
  * ## 데이터 작성
    ```js
    var getData = $.ajax({
      type:"get",
      data: {
        name: "this is getData",
        value: 200
      },
      req: "./response.php"
    });


    var postData = $.ajax({
      type:"POST",
      data: {
        name: "user1",
        value: 100
      },
      req: "./response.php"
    });
    ```

  * ## 응답 데이터 사용하기
    * ### ajax 방식
      ```js
      getData
      .then(res => {
        getView.innerHTML = res.responseText;
      })
      .catch(err => {
        console.log(err);
      });

      postData
      .then(res => {
        postView.innerHTML = res.responseText;
      })
      .catch(err => {
        console.log(err);
      });
      ```

    * ### async 방식
      ```js
      async function run () {
        try {
          let getDataA = await getData;
          getView.innerHTML = getDataA.responseText;

          let postDataA = await postData;
          postView.innerHTML = postDataA.responseText;
        }
        catch(e) {
          // console.log(e);
          // 이것을 체크 해제하면 에러 출력이 한번 더 중복 출력 된다.
        }
      }
      run();
      ```
