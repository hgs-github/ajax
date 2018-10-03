var $ = {
	/**
	 * object를 요청할 데이터의 형식에 맞게 바꾼다.
	 * @param {*} data: 요청할 정보
	 */
	objectDataToSendData: function(data = {}) {
		let sendData = [];

		for(let value in data) {
			sendData.push(`${value}=${data[value]}`);
		}
		return sendData.join("&");
	},

	/**
	 * 0 (uninitialized) - (request가 초기화되지 않음)
	 * 1 (loading) - (서버와의 연결이 성사됨)
	 * 2 (loaded) - (서버가 request를 받음)
	 * 3 (interactive) - (request(요청)을 처리하는 중)
	 * 4 (complete) - (request에 대한 처리가 끝났으며 응답할 준비가 완료됨)
	 */
	xmlHttpRequest: function(props = {}) {
		let {type, req, data} = props;
		return new Promise((res, rej) => {
			let xhr = new XMLHttpRequest();
			try {
				if(type === "GET" || type === "get") {
					if(data !== undefined || data.length !== 0){
						xhr.open(type, `${req}?${data}`);
					}
					else {
						xhr.open(type, req);
					}
					xhr.send(null);
				}
				else if(type === "POST" || type === "post") {
					xhr.open(type, req);
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send(data);
				}
				else {
					xhr.open(type);
					xhr.send();
				}
		
				xhr.onreadystatechange = function(){
					if(xhr.readyState === 4 && xhr.status === 200){
						res(xhr);
					}
				}
			}catch(e) {
				rej(e);
			}
		});
	},

	ajax: function(props = {}) {
		if(props.data !== undefined) {
			props.data = this.objectDataToSendData(props.data);
		}
		return this.xmlHttpRequest(props);
	}
}