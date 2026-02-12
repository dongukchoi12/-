export type ChecklistStep = 'pre' | 'contract' | 'post';

export const CHECKLIST_DATA: Record<ChecklistStep, { key: string; label: string }[]> = {
  pre: [
    { key: 'check_registry', label: '등기부등본 확인' },
    { key: 'check_tax_arrears', label: '체납 여부 확인' },
    { key: 'verify_landlord_identity', label: '임대인 신분 확인' },
  ],
  contract: [
    { key: 'match_contract_parties', label: '계약 당사자 일치 확인' },
    { key: 'special_terms_review', label: '특약 수동 검토(자동생성 없음)' },
  ],
  post: [
    { key: 'move_in_report', label: '전입신고 진행' },
    { key: 'confirm_deposit_return_plan', label: '보증금 반환 계획 확인' },
  ],
};

export const FORM_LINKS = [
  {
    title: '임대차 표준계약서(외부 링크)',
    url: 'https://www.law.go.kr/',
  },
];
