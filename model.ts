interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

type CoordinatePoint = [number, number];

interface Field {
  id: string;
  name: string;
  culture: string;
  icon: string;
  color: string;
  areaPolygon: CoordinatePoint[];
}

interface FieldMonitoring {
  id: string;
  fieldId: string;        // Refere-se ao campo monitorado
  metric: string;         // Métrica que está sendo monitorada (umidade, temperatura, etc.)
  operator: string;       // Pode ser '>', '<', '>=', '<=', '==' para maior flexibilidade
  threshold: number;      // O valor que será comparado
  frequency: string;      // Frequência personalizada (ex: '23m', '3d', '1w', '6h')
  isActive: boolean;      // Se o alerta está ativo ou não
  createdAt: string;      // Data de criação do monitoramento
}

interface FieldAlert {
  id: string;
  fieldId: string;
  metric: string; // temperature
  condition: string; // <=20
  createdAt: string;
}


// function evaluateCondition(currentValue: number, monitoring: FieldMonitoring): boolean {
//   switch (monitoring.operator) {
//     case '>':
//       return currentValue > monitoring.threshold;
//     case '<':
//       return currentValue < monitoring.threshold;
//     case '>=':
//       return currentValue >= monitoring.threshold;
//     case '<=':
//       return currentValue <= monitoring.threshold;
//     case '==':
//       return currentValue === monitoring.threshold;
//     default:
//       return false;
//   }
// }

// #########################################

// import ms from 'ms';
// import dayjs from 'dayjs';

// function getNextCheckTime(frequency: string): dayjs.Dayjs {
//   // Converte a string para milissegundos
//   const durationInMs = ms(frequency);
//   if (!durationInMs) {
//     throw new Error('Invalid frequency format');
//   }

//   // Usa o dayjs para calcular a próxima verificação a partir de agora
//   return dayjs().add(durationInMs, 'millisecond');
// }

// // Exemplo de uso:
// const frequency = '23m'; // Pode ser '23m', '6h', '1w', etc.
// try {
//   const nextCheck = getNextCheckTime(frequency);
//   console.log(`Próxima verificação: ${nextCheck.format()}`);
// } catch (error) {
//   console.error(error.message);
// }