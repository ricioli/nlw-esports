import { GameController } from 'phosphor-react-native';
import { TouchableOpacity, View, Text } from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';

export interface DuoCardProps {
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({
  data: { hourEnd, hourStart, name, useVoiceChannel, weekDays, yearsPlaying },
  onConnect,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonText}>Conectar</Text>
      </TouchableOpacity>
      <DuoInfo label="Nome" value={name} />
      <DuoInfo label="Tempo de jogo" value={`${yearsPlaying} anos`} />
      <DuoInfo label="Disponibilidade" value={`${weekDays.length} dias \u2022 ${hourStart} ${hourEnd}`} />
      <DuoInfo
        label="Chamada de áudio"
        value={useVoiceChannel ? 'Sim' : 'Não'}
        colorValue={useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />
    </View>
  );
}
