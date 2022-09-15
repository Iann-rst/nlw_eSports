import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native';
import { Background } from '../../components/Background';
import { Entypo } from '@expo/vector-icons'
import { FlatList, Image, TouchableOpacity, View } from 'react-native';

import { GameParams } from '../../@types/navigation';
import { Heading } from '../../components/Heading';
import { AdsProps, DuoCard } from '../../components/DuoCard'


import logoImg from '../../assets/logo-nlw-esports.png'
import { THEME } from '../../theme';
import { styles } from './styles';
import { useEffect, useState } from 'react';

export function Game() {
  const [duos, setDuos] = useState<AdsProps[]>([]);
  const route = useRoute();
  const game = route.params as GameParams;

  const navigation = useNavigation();


  function handleGoBack() {
    navigation.goBack()
  }


  useEffect(() => {
    fetch(`http://10.0.0.133:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => { }}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={styles.contentList}
          showsHorizontalScrollIndicator={false}
        />


      </SafeAreaView>
    </Background>
  );
}