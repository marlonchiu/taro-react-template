import { Text, View } from '@tarojs/components';

definePageConfig({
  navigationBarTitleText: '登陆',
  navigationBarBackgroundColor: '#000',
  navigationBarTextStyle: 'white'
});

export default function index() {
  return (
    <View>
      <Text>login</Text>
    </View>
  );
}
