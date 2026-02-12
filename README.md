# 부동산 직거래 앱 MVP (Expo + Firebase)

중개 행위 없이 당사자 간 직접거래를 지원하는 MVP 뼈대입니다.

## 핵심 범위
- 매물 등록/탐색/상세
- 직접 연락(채팅)
- 신고/차단
- 전세안전 체크리스트/서식 링크(정적)

## 금지 기능(코드/화면 미포함)
- 추천/매칭/소개
- 협상 개입/중재
- 계약 대행/자동 계약서 작성
- 결제/에스크로/금전 통제
- 거래 성사 수수료

## 프로젝트 구조
```txt
src/
  components/
  constants/
  models/
  navigation/
  screens/
  services/firebase/
  utils/
```

## 실행 방법
1. 의존성 설치
   - `npm install`
2. 환경변수 설정
   - `.env.example`를 복사해 `.env` 생성
   - Firebase 값 입력
3. Expo 실행
   - iOS: `npm run ios`
   - Android: `npm run android`
   - 공통: `npm run start`

## Firebase 세팅
1. Firebase 프로젝트 생성
2. Authentication > 이메일/비밀번호 활성화
3. Firestore Database 생성
4. Storage 활성화
5. 앱(Web) 등록 후 SDK 키를 `.env`에 반영

## Firestore Rules 적용
1. 루트의 `firestore.rules` 내용 확인
2. Firebase CLI 사용 시:
   - `firebase deploy --only firestore:rules`
3. Firebase 콘솔 Rules 탭에 직접 붙여넣기 가능

## 완료된 핵심 구현
- Auth Stack / Main Tabs / App Stack 네비게이션
- Firebase 초기화(auth/firestore/storage)
- `ListingDetail`에서 채팅방 생성/재사용 로직
- `Chat` 실시간 메시지 리스닝 및 전송
- `Report` 신고 저장
- 고정 법적 고지 배너/문구 반영
- 주소 입력 형식 제한(동/구)

## TODO
- 실제 Firestore 기반 Listing CRUD 및 사진 업로드(Storage)
- Favorites, Checklist progress 영속화
- 차단 목록 UI 고도화 및 서버 규칙 강화
- 메시지 lastMessage 인덱스 및 쿼리 최적화
