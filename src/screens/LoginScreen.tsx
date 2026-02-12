import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase/firebase';
import { AuthStackParamList } from '../navigation/types';
import { ScreenContainer } from '../components/ScreenContainer';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  React.useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  const onSubmit = async (values: FormValues) => {
    await signInWithEmailAndPassword(auth, values.email, values.password);
  };

  return (
    <ScreenContainer>
      <Text>로그인</Text>
      <TextInput placeholder="이메일" autoCapitalize="none" onChangeText={(v) => setValue('email', v)} style={{ borderWidth: 1, padding: 8 }} />
      {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
      <TextInput placeholder="비밀번호" secureTextEntry onChangeText={(v) => setValue('password', v)} style={{ borderWidth: 1, padding: 8 }} />
      {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
      <Button title="로그인" onPress={handleSubmit(onSubmit)} />
      <View>
        <Button title="회원가입" onPress={() => navigation.navigate('Signup')} />
      </View>
    </ScreenContainer>
  );
}
