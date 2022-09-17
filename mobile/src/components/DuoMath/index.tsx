import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { THEME } from '../../theme';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';
import * as Clipoard from 'expo-clipboard';

import { styles } from './styles';
import { Heading } from '../Heading';
import { useState } from 'react';

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMath({ discord, onClose, ...rest }: Props) {
  const [isCooping, setIsCooping] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCooping(true)
    await Clipoard.setStringAsync(discord);
    setIsCooping(false)

    Alert.alert('Discord copiado!', 'Usuário copiado para encontrar essa pessoa no Discord.')
  }
  return (
    <Modal {...rest} animationType="fade" transparent statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500} />
          </TouchableOpacity>

          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

          <Heading title="Let's play!" subtitle="Agora é só começar a jogar!" style={{ alignItems: 'center' }} />

          <Text style={styles.label}>Adicione seu discord</Text>
          <TouchableOpacity style={styles.discordButton} onPress={handleCopyDiscordToClipboard} disabled={isCooping}>
            <Text style={styles.discord}>{isCooping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
