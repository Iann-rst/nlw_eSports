import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native';
import { Background } from '../../components/Background';
import { Entypo } from '@expo/vector-icons'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

import { GameParams } from '../../@types/navigation';
import { Heading } from '../../components/Heading';
import { AdsProps, DuoCard } from '../../components/DuoCard'
import { ModalAd } from '../../components/ModalAd';


import logoImg from '../../assets/logo-nlw-esports.png'
import { THEME } from '../../theme';
import { styles } from './styles';
import { useEffect, useState } from 'react';

export function Game() {
  const [duos, setDuos] = useState<AdsProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')

  const route = useRoute();
  const game = route.params as GameParams;

  const navigation = useNavigation();


  function handleGoBack() {
    navigation.goBack()
  }

  //Conectando no banco de dados e recebendo por cada anuncio o id do discord
  async function getDiscordUser(adsId: string) {
    fetch(`http://10.0.0.133:3333/ads/${adsId}/discord`).then(response => response.json())
      .then(data => setDiscordDuoSelected(data.discord))
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
              onConnect={() => { getDiscordUser(item.id) }}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListTextContent]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Ainda n??o h?? an??ncios publicados.
            </Text>
          )}
        />

        <ModalAd
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}