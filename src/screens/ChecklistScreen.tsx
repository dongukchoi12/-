import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { CHECKLIST_DATA, FORM_LINKS } from '../constants/checklists';
import { ScreenContainer } from '../components/ScreenContainer';

export function ChecklistScreen() {
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});

  return (
    <ScreenContainer>
      <Text>전세안전 체크리스트</Text>
      {(Object.keys(CHECKLIST_DATA) as Array<keyof typeof CHECKLIST_DATA>).map((stepKey) => (
        <View key={stepKey} style={{ gap: 6 }}>
          <Text>{stepKey}</Text>
          {CHECKLIST_DATA[stepKey].map((item) => (
            <Pressable
              key={item.key}
              onPress={() => setChecked((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
              style={{ borderWidth: 1, borderRadius: 8, padding: 8 }}
            >
              <Text>{checked[item.key] ? '✅' : '⬜️'} {item.label}</Text>
            </Pressable>
          ))}
        </View>
      ))}
      <Text>서식은 보기/다운로드 링크만 제공합니다(작성/대행 없음).</Text>
      {FORM_LINKS.map((link) => (
        <Text key={link.title}>{link.title}: {link.url}</Text>
      ))}
      <Text>TODO: checklistProgress 저장/복원</Text>
    </ScreenContainer>
  );
}
