# hconsole be

### 할 일
- redis에 있는 정보를 실시간으로 fe와 커뮤니케이션하기 (websocket)
    - 수집 : agent -> redis -> be --ws--> fe
    - 제어 : fe --ws--> be -> redis -> operator
- 필요 정보 기록하기
    - mariadb
