import React from 'react';
import { Button, Text, TextInput } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase/firebase';
import { ScreenContainer } from '../components/ScreenContainer';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export function SignupScreen() {
  const { register, setValue, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  React.useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  const onSubmit = async (values: FormValues) => {
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    // TODO: users/{uid} profile document 생성
  };

  return (
    <ScreenContainer>
      <Text>회원가입</Text>
      <TextInput placeholder="이메일" autoCapitalize="none" onChangeText={(v) => setValue('email', v)} style={{ borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="비밀번호" secureTextEntry onChangeText={(v) => setValue('password', v)} style={{ borderWidth: 1, padding: 8 }} />
      <Button title="가입하기" onPress={handleSubmit(onSubmit)} />
    </ScreenContainer>
  );
}
