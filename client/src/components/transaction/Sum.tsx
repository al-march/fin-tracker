import { createMemo, ParentProps } from 'solid-js';

type Props = {
  sum: number;
  profit: boolean;
}

export const Sum = (props: ParentProps<Props>) => {
  const formatSumNumber = createMemo(() => {
    const sum = props.sum.toString();

    if (sum.length <= 4) {
      return sum;
    }

    const output = sum.split('').reverse();
    for (let i = 3; i < output.length; i += 3) {
      output[i] = output[i] + ' ';
    }

    return output.reverse().join('');
  });

  const formatSum = createMemo(() => {
    return `${props.profit ? '+' : '-'}${formatSumNumber()} ₽`;
  });

  return (
    <span classList={{
      'text-success': props.profit,
      'text-error': !props.profit,
    }}>
      {formatSum()}
    </span>
  );
}
