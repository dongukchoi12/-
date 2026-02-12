import React from 'react';
import { Button, Text, TextInput } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScreenContainer } from '../components/ScreenContainer';
import { ADDRESS_INPUT_NOTICE } from '../constants/legalNotices';

const schema = z.object({
  title: z.string().min(2),
  type: z.enum(['rent', 'sale']),
  addressArea: z
    .string()
    .min(2)
    .max(20)
    .regex(/^[가-힣\s]+(동|구)$/, '동/구까지만 입력 가능합니다.'),
  description: z.string().min(5),
  priceDeposit: z.coerce.number().optional(),
  priceMonthly: z.coerce.number().optional(),
  priceSale: z.coerce.number().optional(),
});

type FormValues = z.infer<typeof schema>;

export function ListingFormScreen() {
  const { register, setValue, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      type: 'rent',
      addressArea: '',
      description: '',
    },
  });

  React.useEffect(() => {
    register('title');
    register('type');
    register('addressArea');
    register('description');
  }, [register]);

  const onSubmit = async (values: FormValues) => {
    console.log('listing form submit', values);
    // TODO: listings create/update
    // TODO: Storage 사진 업로드(최대 N장)
  };

  return (
    <ScreenContainer>
      <Text>매물 등록/수정</Text>
      <Text>{ADDRESS_INPUT_NOTICE}</Text>
      <TextInput placeholder="제목" onChangeText={(v) => setValue('title', v)} style={{ borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="유형 rent/sale" onChangeText={(v) => setValue('type', v as FormValues['type'])} style={{ borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="주소(예: 마포구, 서교동)" onChangeText={(v) => setValue('addressArea', v)} style={{ borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="설명" onChangeText={(v) => setValue('description', v)} style={{ borderWidth: 1, padding: 8 }} multiline />
      <Button title="저장" onPress={handleSubmit(onSubmit)} />
    </ScreenContainer>
  );
}
